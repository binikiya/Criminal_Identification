from rest_framework import routers
from django.urls import path
from .views import UserViewSet, RegisterViewSet, LoginViewSet, RefreshTokenViewSet

router = routers.SimpleRouter()

# Register, Login, and Refresh all viewsets
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'refresh', RefreshTokenViewSet, basename='refresh')

router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('me/', UserViewSet.as_view({'get': 'manage_profile'}), name='user-profile'),
    path('me/change-password/', UserViewSet.as_view({'post': 'change_password'}), name='user-change-password'),
    path('me/deactivate/', UserViewSet.as_view({'post': 'deactivate_account'}), name='user-deactivate-account'),
    *router.urls,
]
