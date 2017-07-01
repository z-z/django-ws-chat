from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
import json, time, math



def index(request):
    return render(request, 'index.html')

def saver(msg):
    msg = json.loads(msg)
    data = msg['data']
    user = User.objects.get(pk=msg['uid'])
    return json.dumps({
        'body': data,
        'user': user.username,
        'time': '{}000'.format(round(time.time()))#datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

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