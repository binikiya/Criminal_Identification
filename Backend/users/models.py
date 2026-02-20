from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def get_object_by_public_id(self, public_id):
        try:
            return self.get(id=public_id)
        except (ObjectDoesNotExist, ValueError, TypeError):
            raise Http404("User does not exist")

    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('The Email field must be set')

        user = self.create_user(email, password, **kwargs)

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'admin'),
        ('officer', 'officer'),
        ('guest', 'guest'),
    )

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('banned', 'Banned'),
    )

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=150, choices=ROLE_CHOICES)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    dob = models.DateField()
    age = models.DateField(null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    image = models.ImageField(upload_to='profile_images/')

    email_verified = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
