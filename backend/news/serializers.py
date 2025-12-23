from rest_framework import serializers

from .models import News


class NewsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = [
            "id",
            "title",
            "summary",
            "content",
            "published_at",
            "image",
            "video",
            "image_url",
            "video_url",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if not obj.image:
            return None
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url

    def get_video_url(self, obj):
        request = self.context.get("request")
        if not obj.video:
            return None
        url = obj.video.url
        return request.build_absolute_uri(url) if request else url

