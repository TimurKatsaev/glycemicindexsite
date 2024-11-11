"""
URL configuration for diabetes_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf import settings
from django.conf.urls.static import static
from glycemic_index_app.views import *
from django.urls import path, include

app_name = 'glycemic_index_app'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('gi-webapp/', include(('glycemic_index_app.urls', 'glycemic_index_app'), namespace="glycemic_index_app")),
    path('api/notemodel/<int:pk>/', NoteModelDetailView.as_view(), name='note-detail'),
    path('api/get-table-data/', NoteModelListView.as_view(), name='note-list'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
