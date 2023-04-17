import json
import csv
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.contrib.auth import authenticate, login as django_login
from .models import Employee, TimeSheet, ManagerApproval
from .serializers import EmployeeSerializer, TimeSheetSerializer, ManagerApprovalSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class TimeSheetViewSet(viewsets.ModelViewSet):
    queryset = TimeSheet.objects.all()
    serializer_class = TimeSheetSerializer


class ManagerApprovalViewSet(viewsets.ModelViewSet):
    queryset = ManagerApproval.objects.all()
    serializer_class = ManagerApprovalSerializer


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            employee = Employee(user=user)
            employee.save()
            return JsonResponse({'message': 'User and Employee created successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            django_login(request, user)
            try:
                employee = Employee.objects.get(user=user)
                return JsonResponse({'employee_id': employee.id}, status=200)
            except Employee.DoesNotExist:
                return JsonResponse({'error': 'Employee not found for the given user'}, status=404)
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_employee(request, employee_id):
    try:
        employee = Employee.objects.get(pk=employee_id)
        serializer = EmployeeSerializer(employee)
        return JsonResponse(serializer.data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Employee not found'}, status=404)

@csrf_exempt
def update_timestamps(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        employee_id = data.get('employee_id')
        login = data.get('login')
        logout = data.get('logout')

        try:
            employee = Employee.objects.get(id=employee_id)  # Change this line
            employee.login_timestamp = login
            employee.logout_timestamp = logout
            employee.save()
            return JsonResponse({'message': 'Timestamps updated successfully'}, status=200)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Employee not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def create_timesheet_entry(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print("Data received:", data)  # Add this line
        employee_id = int(data.get('employee_id'))
        date = data.get('date')
        hours = float(data.get('hours'))

        try:
            employee = Employee.objects.get(id=employee_id)
            timesheet_entry = TimeSheet(employee=employee, date=date, hours=hours)
            timesheet_entry.save()
            return JsonResponse({'timesheet_entry_id': timesheet_entry.id}, status=201)
        except Employee.DoesNotExist:
            return JsonResponse({'error': 'Employee not found'}, status=404)
        except Exception as e:  # Add this block
            print("Unexpected error:", e)
            return JsonResponse({'error': 'Unexpected error'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
def create_manager_approval(request):
    data = json.loads(request.body.decode("utf-8"))
    print("Data received:", data)

    username = data.get('username')
    date = data.get('date')
    status = data.get('status')

    try:
        employee = Employee.objects.get(user__username=username)
        print("Employee found:", employee, "ID:", employee.id)
    except Employee.DoesNotExist:
        return JsonResponse({"error": "Employee not found"}, status=404)

    try:
        timesheet = TimeSheet.objects.get(employee=employee, date=date)
    except TimeSheet.DoesNotExist:
        return JsonResponse({"error": "Timesheet not found"}, status=404)

    manager_approval = ManagerApproval(timesheet=timesheet, employee=employee, status=status)
    manager_approval.save()

    # Update timesheet status
    timesheet.status = status
    timesheet.save()

    return JsonResponse({"message": "Manager approval added"})


 

     


@csrf_exempt
def get_timesheets(request, employee_id):
    if request.method == 'GET':
        try:
            employee = Employee.objects.get(pk=employee_id)
            timesheets = TimeSheet.objects.filter(employee=employee)
            serializer = TimeSheetSerializer(timesheets, many=True)
            print("Serialized timesheets:", serializer.data)  # Add this line
            return JsonResponse(serializer.data, safe=False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Employee not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def downloadTimesheetExcel(request, employee_id):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="timesheet-{employee_id}.csv"'

    writer = csv.writer(response)
    writer.writerow(['Date', 'Hours', 'Status'])

    try:
        timesheets = TimeSheet.objects.filter(employee__id=employee_id)
        for t in timesheets:
            writer.writerow([t.date, t.hours, t.status])
    except Exception as e:
        print(f"Error generating timesheet CSV for employee {employee_id}: {e}")
        response = HttpResponse(status=500)

    return response
