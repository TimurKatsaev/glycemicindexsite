from django.urls import path

from . import views
from .views import *

urlpatterns = [
    path('', index, name='main'),
    path('note/<int:pk>/', detail, name='note_detail'),
    path('add/', add, name='add'),
    path('stat/', stat, name='stat'),
    path('login/', login_view, name='login'),
    path('personal_data/', personal_data, name='personal_data'),
    path('settings/', setts, name='setts'),
    path('signup/', signup, name='signup'),
    path('logout/', logout_view, name='logout'),
    path('delete/<int:pk>/', delete_record, name='delete_record'),
]