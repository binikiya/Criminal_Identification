from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Criminal, Case
from .serializers import CriminalSerializer, CaseSerializer


class CriminalViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'put', 'delete']
    serializer_class = CriminalSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Criminal.objects.all()
        return Criminal.objects.exclude(is_superuser=True)

    def get_object(self):
        obj = Criminal.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj


class CaseViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'put', 'delete']
    serializer_class = CriminalSerializer
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Case.objects.all()
        return Case.objects.exclude(attached_by__is_superuser=True)