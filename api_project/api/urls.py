# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, CustomTokenObtainPairView,PropertyViewSet, TenantViewSet



router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'tenants', TenantViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
