from rest_framework import serializers
from .models import Plan


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = [
            'id',
            'title',
            'reason',
            'ai_analysis',
            'created_at',
            'updated_at',
        ]
