# views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, PropertySerializer, TenantSerializer
from .models import Property, Tenant
from rest_framework_simplejwt.views import TokenObtainPairView

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    # Override if you want to customize response or validation
    pass

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    @action(detail=True, methods=['post'])
    def add_or_update(self, request, pk=None):
        is_update = pk is not None
        if is_update:
            property_obj = self.get_object()
            serializer = self.get_serializer(property_obj, data=request.data)
        else:
            serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

    @action(detail=True, methods=['post'])
    def add_or_update(self, request, pk=None):
        is_update = pk is not None

        if is_update:
            tenant_obj = self.get_object()
            serializer = self.get_serializer(tenant_obj, data=request.data)
        else:
            serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            # Allocate a flat if it's a new tenant
            if not is_update:
                property_obj = serializer.validated_data.get('property')
                unit_type = serializer.validated_data.get('unit_type')
                if property_obj and unit_type:
                    if property_obj.allocate_flat(unit_type):
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    else:
                        # Allocation failed
                        return Response(
                            {'non_field_errors': ['Flat allocation failed. No flats of the specified type available.']},
                            status=status.HTTP_400_BAD_REQUEST
                        )

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)