from rest_framework import routers
from django.urls import path
from .views import CriminalViewSet, CaseViewSet

router = routers.SimpleRouter()

router.register(r'criminals', CriminalViewSet, basename='criminal')
router.register(r'cases', CaseViewSet, basename='case')

urlpatterns = [
    *router.urls,
]
