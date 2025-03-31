from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q
from noteapp.models import Note
from noteapp.serializers import NoteSerializer
from rest_framework.decorators import api_view


@api_view(['GET'])
def search_notes(request):
    query = request.query_params.get("search")
    notes = Note.objects.filter(Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query))
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET", "POST"])
def notes(request):
    if request.method == "GET":
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def note_detail(request, *args, **kwargs):
    try:
        note = Note.objects.get(slug=kwargs.get("slug", None))
    except Note.DoesNotExist:
        return  Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serializer = NoteSerializer(data=request.data, instance=note)
        if serializer.is_valid():
            serializer.save()
            return Response({"post": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        try:
            note.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({"post": f"Note {kwargs.get('slug')} deleted"}, status=status.HTTP_204_NO_CONTENT)


