from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api import views

urlpatterns = [
    path('categories/', views.CategoryList.as_view(), name='category_list'),  # GET, POST
    path('categories/<int:id>/', views.CategoryDetail.as_view(), name='category_detail'),  # GET, PUT, DELETE
    path('categories/<int:id>/products/', views.category_products, name='category_products'),  # GET
    path('categories/<int:category_id>/products/<int:product_id>/', views.category_product_detail,
         name='category_product_detail'),  # GET
    path('brands/', views.BrandList.as_view(), name='brand_list'),  # GET, POST
    path('brands/<int:id>/', views.BrandDetail.as_view(), name='brand_detail'),  # GET, PUT, DELETE
    path('brands/<int:id>/products/', views.brand_products, name='brand_products'),  # GET
    path('brands/<int:brand_id>/products/<int:product_id>/', views.brand_product_detail,
         name='brand_product_detail'),  # GET
    path('products/', views.product_list, name='product_list'),  # GET, POST
    path('products/<int:id>/', views.product_detail, name='product_detail'),  # GET, PUT, DELETE
    path('users/<int:id>/', views.user_detail, name='user_detail'),  # GET, PUT

    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Tokens
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
