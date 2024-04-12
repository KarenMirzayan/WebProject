from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer
from .models import Category, Brand, Product


@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, id):
    try:
        category = Category.objects.get(pk=id)
    except Category.DoesNotExist as e:
        return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        try:
            category.delete()
            return Response({'deleted': True})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def category_products(request, id):
    if request.method == 'GET':
        products = Product.objects.filter(category__id=id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def category_product_detail(request, category_id, product_id):
    try:
        product = Product.objects.get(category__id=category_id, pk=product_id)
    except Product.DoesNotExist as e:
        return Response({"error": str(e)}, status=404)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def brand_list(request):
    if request.method == 'GET':
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def brand_detail(request, id):
    try:
        brand = Brand.objects.get(pk=id)
    except Brand.DoesNotExist as e:
        return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = BrandSerializer(brand)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BrandSerializer(brand, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        try:
            brand.delete()
            return Response({'deleted': True})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def brand_products(request, id):
    products = Product.objects.filter(brand__id=id)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def brand_product_detail(request, brand_id, product_id):
    product = Product.objects.get(brand__id=brand_id, pk=product_id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['GET, POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, id):
    try:
        product = Product.objects.get(pk=id)
    except Product.DoesNotExist as e:
        return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        try:
            product.delete()
            return Response({"deleted": True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
