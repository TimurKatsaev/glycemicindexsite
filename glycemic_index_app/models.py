from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class CustomUser(AbstractUser):
    rcg = models.TextField(blank=True, default='0.01|0.02|0.03|0.04|0.05|0.06|0.07|0.08|0.09|0.1')
    absorption_time = models.TextField(blank=True, default='100|90|80|70|60|50|40|30|20|10')
    bu_index = models.TextField(blank=True, default='2.5')

    def __str__(self):
        return self.username

class Note(models.Model):
    title = models.CharField(max_length=300)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    glycemia = models.FloatField()
    bread_units = models.FloatField(blank=True)
    glycemic_index = models.CharField(max_length=500)
    general_gi = models.FloatField()
    general_rcg = models.FloatField()
    graph = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
        ordering = ['-created_at']

# class Statistics(models.Model):
#     average_glycemia = models.FloatField(blank=True)
#     average_bu = models.FloatField(blank=True)
#     average_gi = models.FloatField(blank=True)
#     average_rcg = models.FloatField(blank=True)
#     graph_glycemia = models.TextField(blank=True)
#     graph_bu = models.TextField(blank=True)
#     graph_gi = models.TextField(blank=True)
#     graph_rcg = models.TextField(blank=True)
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  