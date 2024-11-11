from django import template

register = template.Library()

@register.simple_tag
def is_active(name, current_name):
    return 'active' if name == current_name else ''