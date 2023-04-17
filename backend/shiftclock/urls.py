from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views



router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'employees', views.EmployeeViewSet)
router.register(r'timesheets', views.TimeSheetViewSet)
router.register(r'manager_approvals', views.ManagerApprovalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
