from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Criminal, Case
from .serializers import CriminalSerializer, CaseSerializer
from .permissions import IsAdminOrOfficer, IsInvestigatorOrReadOnly


class CriminalViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'put', 'post', 'delete']
    serializer_class = CriminalSerializer
    permission_classes = [IsInvestigatorOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Criminal.objects.all()
        return Criminal.objects.exclude(is_superuser=True)


class CaseViewSet(viewsets.ModelViewSet):
    http_method_names = ['patch', 'get', 'put', 'post', 'delete']
    serializer_class = CaseSerializer
    permission_classes = [IsInvestigatorOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Case.objects.all()
        return Case.objects.exclude(attached_by__is_superuser=True)