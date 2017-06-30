from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

def index(request):
    return render(request, 'index.html')

def saver(data):
    return JsonResponse(data)

def auth(request):
    username = request.POST.get('username', False)
    password = request.POST.get('password', False)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'login': True})
    else:
        return JsonResponse({'login': False})

def auth_out(request):
    logout(request)
    return JsonResponse({'logout': True})