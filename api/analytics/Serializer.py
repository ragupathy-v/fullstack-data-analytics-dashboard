from rest_framework import serializers

class AnalyticsSerializer(serializers.Serializer):
    files=serializers.FileField()