from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    image = serializers.ImageField(required=False, allow_null=True)
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'role', 'first_name', 'middle_name', 'last_name', 'name',
            'dob', 'age', 'gender', 'email', 'phone', 'image',
            'email_verified', 'status', 'created', 'updated', 'password',
        ]
        read_only_fields = ('id', 'email_verified', 'created', 'updated')

    def get_name(self, obj):
        return obj.name

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class PublicUserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'name', 'gender', 'image']

    def get_name(self, obj):
        return obj.name