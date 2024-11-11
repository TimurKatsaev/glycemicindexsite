from django.contrib import admin
from .models import CustomUser, Note

class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'created_at', 'general_gi', 'general_rcg')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'content')

# class StatisticsAdmin(admin.ModelAdmin):
#     list_display = ('id', 'average_glycemia', 'average_bu', 'average_gi', 'average_rcg')

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_superuser')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Note, NoteAdmin)
# admin.site.register(Statistics, StatisticsAdmin)