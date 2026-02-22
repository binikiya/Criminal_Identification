from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.hashers import check_password
from rest_framework import status
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'post', 'put', 'delete']
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)

    def get_object(self):
        obj = User.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj
    
    @action(detail=False, methods=['get', 'patch'], url_path='me')
    def manage_profile(self, request):
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='change-password')
    def change_password(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not check_password(old_password, user.password):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"status": "password changed"})

    @action(detail=False, methods=['post'], url_path='deactivate')
    def deactivate_account(self, request):
        user = request.user
        user.is_active = False
        user.save()
        return Response({"status": "account deactivated"})