function AllPlansPage({ plans, onAnalyze, analyzingId }) {
    return (
      <div>
        <h2>All Plans</h2>
        <ul>
        {plans.map((plan) => (
            <li key={plan.id}>
            <div className="plan">
                <div className="plan-title">{plan.title}</div>
                <div className="plan-reason">{plan.reason}</div>

                <div style={{ marginTop: "0.75rem" }}>
                {plan.ai_analysis ? (
                    <div className="plan-ai">🤖 {plan.ai_analysis}</div>
                ) : analyzingId === plan.id ? (
                    <p>⏳ Analyzing...</p>
                ) : (
                    <button onClick={() => onAnalyze(plan.id)}>
                    Analyze with AI
                    </button>
                )}
                </div>
            </div>
            </li>
        ))}
        </ul>
      </div>
    );
  }
  
  export default AllPlansPage;
  