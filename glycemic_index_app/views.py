from pyexpat.errors import messages
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render

from .models import CustomUser, Note
from .forms import SignUpForm, EditingForm, UserEditingForm

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import NoteSerializer
from django.contrib.auth.decorators import login_required
from django.db.models import Avg

from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.shortcuts import render, redirect
from django.urls import reverse

from .forms import NoteForm

class NoteModelDetailView(APIView):
    def get(self, request, pk):
        try:
            item = Note.objects.get(pk=pk)
            serializer = NoteSerializer(item)
            return Response(serializer.data)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class NoteModelListView(APIView):
    def get(self, request):
        try:
            user = request.user  # Получаем текущего пользователя
            data = list(Note.objects.filter(user=user).values())  # Получить все данные как словарь
            return JsonResponse(data, safe=False)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

@login_required(login_url='glycemic_index_app:login')
def index(request):
    # Получаем поисковый запрос из GET параметров
    query = request.GET.get('q')

    # Фильтруем записи по пользователю и, если есть запрос, по заголовку
    if query:
        notes = Note.objects.filter(user=request.user, title__icontains=query)
    else:
        notes = Note.objects.filter(user=request.user)

    # Подготовка контекста для шаблона
    context = {
        'notes': notes,
        'title': 'Список записей',
        'name': 'main'
    }

    # Рендеринг шаблона с контекстом
    return render(request, 'glycemic_index_app/components/main.html', context=context)

@login_required(login_url='glycemic_index_app:login')
def detail(request, pk):
    notes = get_object_or_404(Note, pk=pk)
    if request.method == 'POST':
        form = EditingForm(request.POST, instance=notes)
        if form.is_valid():
            form.save()
            return redirect('glycemic_index_app:main')  # перенаправление на страницу с записью после сохранения
    else:
        form = EditingForm(instance=notes)
    context = {'notes': notes, 'list': notes.glycemic_index.split(","), 'title': 'Запись', 'name': 'detail', 'form': form}
    return render(request, 'glycemic_index_app/components/detail.html', context=context)

def delete_record(request, pk):
    record = get_object_or_404(Note, pk=pk)
    record.delete()
    return redirect(reverse('glycemic_index_app:main'))

@login_required(login_url='glycemic_index_app:login')
def add(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            note = form.save(commit=False)  # Сначала не сохраняем в базу данных
            note.user = request.user  # Назначаем текущего пользователя
            note.save()  # Сохраняем объект в базу данных
            return redirect('glycemic_index_app:main')  # замените на ваш путь
    else:
        form = NoteForm()
    context = {'title': 'Добавить запись', 'name': 'add', 'form': form}
    return render(request, 'glycemic_index_app/components/add.html', context=context)

@login_required(login_url='glycemic_index_app:login')
def stat(request):
    user = request.user
    glycemia_average = Note.objects.filter(user=user).aggregate(Avg('glycemia'))['glycemia__avg']
    bu__average = Note.objects.filter(user=user).aggregate(Avg('bread_units'))['bread_units__avg']
    gi_average = Note.objects.filter(user=user).aggregate(Avg('general_gi'))['general_gi__avg']
    rcg_average = Note.objects.filter(user=user).aggregate(Avg('general_rcg'))['general_rcg__avg']
    context = {'title': 'Статистика', 
               'name': 'stat', 
               'glycemia__avg': glycemia_average, 
               'bread_units__avg': bu__average, 
               'general_gi__avg': gi_average, 
               'general_rcg__avg': rcg_average,}
    return render(request, 'glycemic_index_app/components/stat.html', context=context)

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(request, username=request.POST["username"],
                            password=request.POST["password"])
            if user is not None:
                login(request, user)
                return redirect('glycemic_index_app:main')
    else:
        form = AuthenticationForm()
    context = {'title': 'Вход', 'name': 'login', 'form': form}
    return render(request, 'glycemic_index_app/components/login.html', context=context)

def logout_view(request):
    logout(request)
    return redirect('glycemic_index_app:main')

@login_required(login_url='glycemic_index_app:login')
def personal_data(request):
    user = request.user
    rcg = user.rcg.split("|")
    abcTime = user.absorption_time.split("|")
    combined_array = list(zip(rcg, abcTime))

    if request.method == 'POST':
        user_form = UserEditingForm(request.POST, instance=user)
        if user_form.is_valid():
            user_form.save()
            return redirect('glycemic_index_app:main')
    else:
        user_form = UserEditingForm(instance=user)
    context = {'title': 'Личные данные', 'name': 'personal_data', 'form': user_form, 'rcgTimeIn': combined_array}
    return render(request, 'glycemic_index_app/components/personal_data.html', context=context)

@login_required(login_url='glycemic_index_app:login')
def setts(request):
    context = {'title': 'Настройки', 'name': 'settings'}
    return render(request, 'glycemic_index_app/components/settings.html', context=context)

def signup(request):
    print(request.method)
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # Обновляем экземпляр пользователя с помощью данных из формы
            user.save()
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('glycemic_index_app:main')
        else:
            for field in form:
                print("Field Error:", field.name,  field.errors)
    else:
        form = SignUpForm()
    context = {'title': 'Регистрация', 'name': 'signup', 'form': form}
    return render(request, 'glycemic_index_app/components/signup.html', context=context)