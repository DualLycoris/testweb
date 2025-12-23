from rest_framework import permissions, viewsets

from .models import News
from .serializers import NewsSerializer


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        return {**super().get_serializer_context(), "request": self.request}

