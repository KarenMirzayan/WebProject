from django.contrib import admin

from api.models import Category, Product, Brand


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name', 'id')


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name', 'id')


@admin.register(Product)
class Product(admin.ModelAdmin):
    list_display = ('name', 'price', 'image', 'discount', 'is_active', 'category', 'brand')
    search_fields = ('name', 'id')
