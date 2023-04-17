from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee, TimeSheet, ManagerApproval
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class TimeSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSheet
        fields = ['id', 'employee', 'date', 'hours', 'status']  # Add 'status' here

class ManagerApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagerApproval
        fields = '__all__'
