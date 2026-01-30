import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

from .models import Plan
from .serializers import PlanSerializer


class PlanViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PlanSerializer
    def get_queryset(self):
        return Plan.objects.filter(owner=self.request.user).order_by('-created_at')

    @action(detail=True, methods=["post"])
    def analyze(self, request, pk=None):
        plan = self.get_object()

        # get recent plans (excluding current)
        MAX_CONTEXT_PLANS = 10

        recent_plans = (
            Plan.objects
            .filter(owner=request.user)
            .exclude(id=plan.id)
            .order_by("-created_at")[:MAX_CONTEXT_PLANS]
        )


        context_lines = []

        for idx, p in enumerate(recent_plans, start=1):
            context_lines.append(
                f"{idx}) Title: {p.title}\n"
                f"   Reason: {p.reason}"
            )

        context_text = "\n\n".join(context_lines) 

        full_context_text = f"""
        RECENT CONTEXT (last {len(recent_plans)} plans):

        {context_text}

        CURRENT PLAN (focus on this one):

        Title: {plan.title}
        Reason: {plan.reason}
        """

        payload = {
            "context_text": full_context_text.strip()
        }

        try:
            response = requests.post(
                "http://localhost:5678/webhook/plan-analyze",
                json=payload,
                timeout=60,
            )
            response.raise_for_status()
        except requests.RequestException as e:
            return Response(
                {"error": "AI service unavailable", "details": str(e)},
                status=503,
            )

        ai_text = response.json().get("analysis", "")

        plan.ai_analysis = ai_text
        plan.save(update_fields=["ai_analysis"])

        serializer = PlanSerializer(plan)
        return Response(serializer.data)
