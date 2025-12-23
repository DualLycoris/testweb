from django.db import models


class News(models.Model):
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=300, blank=True)
    content = models.TextField()
    published_at = models.DateTimeField(db_index=True)
    image = models.ImageField(upload_to="news/images/", blank=True, null=True)
    video = models.FileField(upload_to="news/videos/", blank=True, null=True)

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

