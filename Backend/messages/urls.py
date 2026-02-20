from rest_framework import routers
from django.urls import path
from .views import MessageViewSet

router = routers.SimpleRouter()

router.register(r'', MessageViewSet, basename='message')

urlpatterns = [
    *router.urls,
]
