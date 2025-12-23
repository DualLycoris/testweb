from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="News",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("summary", models.CharField(blank=True, max_length=300)),
                ("content", models.TextField()),
                ("published_at", models.DateTimeField(db_index=True)),
                ("image", models.ImageField(blank=True, null=True, upload_to="news/images/")),
                ("video", models.FileField(blank=True, null=True, upload_to="news/videos/")),
            ],
            options={"ordering": ["-published_at"]},
        )
    ]

