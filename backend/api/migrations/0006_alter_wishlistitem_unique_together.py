# Generated by Django 5.0.3 on 2024-04-24 18:25

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_wishlistitem'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='wishlistitem',
            unique_together={('product', 'user')},
        ),
    ]