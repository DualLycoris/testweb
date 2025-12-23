from rest_framework import serializers

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "user_id",
            "name",
            "email",
            "phone",
            "subject",
            "content",
            "created_at",
        ]

