from rest_framework import routers
from django.urls import path
from .views import CriminalViewSet, CaseViewSet, dashboard_stats

router = routers.SimpleRouter()

router.register(r'criminals', CriminalViewSet, basename='criminal')
router.register(r'cases', CaseViewSet, basename='case')

urlpatterns = [
    *router.urls,
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),
]
