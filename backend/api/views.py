from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CategorySerializer, BrandSerializer, ProductSerializer, UserSerializer, CartItemSerializer, \
    WishlistItemSerializer
from .models import Category, Brand, Product, CartItem, WishlistItem
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    def get_object(self, id):
        try:
            return Category.objects.get(pk=id)
        except Category.DoesNotExist:
            return None

    def get(self, request, id):
        category = self.get_object(id)
        if category is not None:
            serializer = CategorySerializer(category)
            return Response(serializer.data)
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        category = self.get_object(id)
        if category is not None:
            serializer = CategorySerializer(category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        category = self.get_object(id)
        if category is not None:
            category.delete()
            return Response({'deleted': True})
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)


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


class BrandList(APIView):
    def get(self, request):
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BrandDetail(APIView):
    def get_object(self, id):
        try:
            return Brand.objects.get(pk=id)
        except Brand.DoesNotExist:
            return None

    def get(self, request, id):
        brand = self.get_object(id)
        if brand is not None:
            serializer = BrandSerializer(brand)
            return Response(serializer.data)
        return Response({"error": "Brand not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        brand = self.get_object(id)
        if brand is not None:
            serializer = BrandSerializer(brand, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Brand not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        brand = self.get_object(id)
        if brand is not None:
            brand.delete()
            return Response({'deleted': True})
        return Response({"error": "Brand not found"}, status=status.HTTP_404_NOT_FOUND)


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


@api_view(['GET', 'POST'])
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


@api_view(['GET', 'PUT'])
def user_detail(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        user = UserSerializer(user).update(user, validated_data=request.data)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response()
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_get_by_username(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    cart_item, created = CartItem.objects.get_or_create(user=user, product=product)
    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity
    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, id):
    try:
        cart_item = CartItem.objects.get(pk=id)
    except CartItem.DoesNotExist:
        return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
    quantity = request.data.get('quantity', 1)
    try:
        quantity = int(quantity)
        if quantity <= 0:
            raise ValueError("Quantity must be a positive integer")
    except ValueError:
        raise ValidationError("Quantity must be a positive integer")

    cart_item.quantity = quantity
    cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, cart_item_id):
    try:
        cart_item = CartItem.objects.get(pk=cart_item_id)
    except CartItem.DoesNotExist:
        return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

    cart_item.delete()
    return Response({"message": "Cart item removed successfully"}, status=status.HTTP_204_NO_CONTENT)


class WishlistListView(APIView):
    permission_classes([IsAuthenticated])

    def get(self, request):
        user = request.user
        wishlist_items = WishlistItem.objects.filter(user=user)
        serializer = WishlistItemSerializer(wishlist_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        product_id = request.data.get('product_id')

        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.create(user=user, product=product)
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class WishlistDetailView(APIView):
    permission_classes([IsAuthenticated, ])

    def get(self, request, product_id):
        user = request.user
        wishlist_item = WishlistItem.objects.get(user=user, product_id=product_id)
        serializer = WishlistItemSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, product_id):
        user = request.user
        wishlist_item = WishlistItem.objects.get(user=user, product_id=product_id)
        wishlist_item.delete()
        return JsonResponse({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def change_password(request):
    user = request.user
    data = request.data

    old_password = data.get('old_password')
    if not user.check_password(old_password):
        return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

    new_password = data.get('new_password')
    confirm_new_password = data.get('confirm_password')
    if new_password != confirm_new_password:
        return Response({'error': 'New passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({'message': 'Password successfully changed'}, status=status.HTTP_200_OK)
