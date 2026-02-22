from rest_framework import serializers
from .models import Criminal, Case


class CriminalSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Criminal
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'name', 'dob', 'age', 'gender', 
                'nationality', 'education_level', 'phone', 'crime_type', 'relegion', 'image', 
                'status', 'created', 'updated']

    def get_name(self, obj):
        return obj.name


class CaseSerializer(serializers.ModelSerializer):
    attached_to = CriminalSerializer(read_only=True)
    attached_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Case
        fields = ['id', 'case_number', 'description', 'status', 'attached_to', 'attached_by', 
                'created', 'updated']