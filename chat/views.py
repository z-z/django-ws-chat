from django.shortcuts import render
import json
from . import models

def index(request):
    return render(request, 'index.html')

def saver(data):
    return json.dumps({'a': 'b'})