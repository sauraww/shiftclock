from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    login_timestamp = models.DateTimeField(null=True, blank=True)  # Add this line
    logout_timestamp = models.DateTimeField(null=True, blank=True)  # Add this line
    # Add any additional fields for the employee

class TimeSheet(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    hours = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=20, default='Pending')
    class Meta:
        unique_together = ('employee', 'date')  # Add this line

class ManagerApproval(models.Model):
    timesheet = models.OneToOneField(TimeSheet, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, default=None) # Add default=None
    status = models.CharField(max_length=255,default='Pending')





