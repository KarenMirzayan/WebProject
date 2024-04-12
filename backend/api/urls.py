from django.urls import path

from api import views

urlpatterns = [
    path('categories/', views.category_list, name='category_list'),  # GET, POST
    path('categories/<int:id>/', views.category_detail, name='category_detail'),  # GET, PUT, DELETE
    path('categories/<int:id>/products/', views.category_products, name='category_products'),  # GET
    path('categories/<int:category_id>/products/<int:product_id>/', views.category_product_detail,
         name='category_product_detail'),  # GET
    path('brands/', views.brand_list, name='brand_list'),  # GET, POST
    path('brands/<int:id>/', views.brand_detail, name='brand_detail'),  # GET, PUT, DELETE
    path('brands/<int:id>/products/', views.brand_products, name='brand_products'),  # GET
    path('brands/<int:brand_id>/products/<int:product_id>/', views.brand_product_detail,
         name='brand_product_detail'),  # GET
    path('products/', views.product_list, name='product_list'),  # GET, POST
    path('products/<int:id>/', views.product_detail, name='product_detail')  # GET, PUT, DELETE

]
