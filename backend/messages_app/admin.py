from django.contrib import admin

from .models import Message


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ["subject", "name", "email", "phone", "created_at", "user"]
    search_fields = ["subject", "name", "email", "phone", "content"]
    list_filter = ["created_at"]

