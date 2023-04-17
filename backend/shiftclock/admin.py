from django.contrib import admin
from .models import  Employee,  TimeSheet, ManagerApproval


admin.site.register(Employee)
admin.site.register( TimeSheet)
admin.site.register(ManagerApproval)
