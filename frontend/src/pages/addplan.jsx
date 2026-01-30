function AddPlanPage({ onAdd, plans, loading, title, reason, setTitle, setReason, onAnalyze, analyzingId }) {
    const recentPlans = plans.slice(0, 4);
  
    return (
      <div>
        <h2>Add a Plan</h2>
  
        <form onSubmit={onAdd}>
          <input
            placeholder="What is your plan, jigar?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
  
          <textarea
            placeholder="Give time like 8pm to 12pm, Give reason for implementing plan"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
  
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Plan"}
          </button>
        </form>
  
        <h3 style={{ marginTop: "2rem" }}>Recent Plans</h3>
  
        <ul>
        {recentPlans.map((plan) => (
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
  
  export default AddPlanPage;
  