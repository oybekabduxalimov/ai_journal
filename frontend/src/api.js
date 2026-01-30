const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchPlans() {
  const response = await fetch(`${API_BASE_URL}/plans/`);

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return response.json();
}

export async function createPlan(data) {
  const response = await fetch(`${API_BASE_URL}/plans/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create plan");
  }

  return response.json();
}

export async function analyzePlan(planId) {
    const response = await fetch(
      `http://127.0.0.1:8000/api/plans/${planId}/analyze/`,
      {
        method: "POST",
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to analyze plan");
    }
  
    return response.json();
  }
  