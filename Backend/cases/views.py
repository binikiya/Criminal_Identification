from rest_framework import viewsets
import cv2
import numpy as np
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from recognition.recognition import FaceRecognitionService
from .models import Criminal, Case
from .serializers import CriminalSerializer, CaseSerializer
from .permissions import IsAdminOrOfficer, IsInvestigatorOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    return Response({
        'total_criminals': Criminal.objects.count(),
        'jailed_count': Criminal.objects.filter(status='jailed').count(),
        'open_cases': Case.objects.filter(status='open').count(),
        'closed_cases': Case.objects.filter(status='closed').count(),
    })


class CriminalViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'put', 'post', 'delete']
    serializer_class = CriminalSerializer
    permission_classes = [IsInvestigatorOrReadOnly]

    def get_queryset(self):
        return Criminal.objects.all()

    @api_view(['GET'])
    def get_dashboard_stats(request):
        return Response({
            'total_criminals': Criminal.objects.count(),
            'open_cases': Case.objects.filter(status='open').count(),
            'jailed_count': Criminal.objects.filter(status='jailed').count(),
            'closed_cases': Case.objects.filter(status='closed').count(),
        })

    @action(detail=False, methods=['post'], url_path='recognize')
    def recognize(self, request):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response(
                {'error': 'No image provided. Please upload an image.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        image_bytes = image_file.read()
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return Response(
                {'error': 'Invalid image format.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        service = FaceRecognitionService()
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        faces = service.face_detector.detectMultiScale(
            gray_img, scaleFactor=1.2, minNeighbors=5, minSize=(30, 30)
        )

        if len(faces) == 0:
            return Response(
                {'error': 'No face detected in the image.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        (x, y, w, h) = faces[0]
        cropped_face = gray_img[y:y+h, x:x+w]

        try:
            label_id, confidence = service.recognize_face(cropped_face)
        except Exception as e:
            return Response(
                {'error': f'Recognition error: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if confidence > 85: 
            return Response(
                {'message': 'Face detected, but no matching criminal found in the database.'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            criminal = Criminal.objects.get(id=label_id)
            serializer = self.get_serializer(criminal)
            
            # TODO: Trigger real-time alert to authorized agencies here via WebSockets
            
            return Response({
                'message': 'Criminal identified successfully!',
                'confidence': confidence,
                'criminal': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Criminal.DoesNotExist:
            return Response(
                {'error': 'A match was found by the algorithm, but the ID no longer exists in the database.'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class CaseViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'put', 'post', 'delete']
    serializer_class = CaseSerializer
    permission_classes = [IsInvestigatorOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Case.objects.all()
        return Case.objects.exclude(attached_by__is_superuser=True)