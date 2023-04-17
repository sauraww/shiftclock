from django.contrib import admin
from django.urls import path, include

from shiftclock import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('shiftclock.urls')),
    path('register/', views.register),
    path('login/', views.login),
    path('update-timestamps/', views.update_timestamps),
    path('timesheet/', views.create_timesheet_entry),
    path('timesheets/<int:employee_id>/', views.get_timesheets), 
    path('manager-approval/', views.create_manager_approval),
    path('timesheets/<int:employee_id>/download', views.downloadTimesheetExcel),
]
