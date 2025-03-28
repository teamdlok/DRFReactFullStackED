from rest_framework import serializers

from noteapp.models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "body", "slug", "category", "created", "updated"]