import { Routes, Route, Navigate, Link } from "react-router-dom";
import AddPlanPage from "./pages/addplan";
import AllPlansPage from "./pages/allplan";
import AboutPage from "./pages/about";
import { useEffect, useState } from "react";
import { fetchPlans, createPlan, analyzePlan} from "./api";


function App() {
  const [analyzingId, setAnalyzingId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);


  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans()
      .then((data) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/63c97b15-c42e-4fba-bf13-52ec5883f3b0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:fetchPlans.then',message:'plans loaded',data:{plansLength:Array.isArray(data)?data.length:0,firstPlanId:Array.isArray(data)&&data[0]?data[0].id:null},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2,H4'})}).catch(()=>{});
        // #endregion
        setPlans(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newPlan = await createPlan({ title, reason });
      setPlans([newPlan, ...plans]);
      setTitle("");
      setReason("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyze(planId) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/63c97b15-c42e-4fba-bf13-52ec5883f3b0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:handleAnalyze',message:'analyze called',data:{planId,typeOfPlanId:typeof planId},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    setAnalyzingId(planId);
    setError(null);

    try {
      const updatedPlan = await analyzePlan(planId);
  
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === planId ? updatedPlan : plan
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzingId(null);
    }
  }
  

  return (
    <div style={{ padding: "2rem", maxWidth: "700px" }} className="container">
      <h1>Decision Journal</h1>
  
      <nav className="nav">
        <a href="/add">Add</a>
        <a href="/plans">Plans</a>
        <a href="/about">About</a>
      </nav>

  
      {error && <p style={{ color: "red" }}>{error}</p>}
  
      <Routes>
        <Route
          path="/add"
          element={
            <AddPlanPage
              onAdd={handleSubmit}
              plans={plans}
              loading={loading}
              title={title}
              reason={reason}
              setTitle={setTitle}
              setReason={setReason}
              onAnalyze={handleAnalyze}
              analyzingId={analyzingId}
            />
          }
        />
  
        <Route
          path="/plans"
          element={
            <AllPlansPage
              plans={plans}
              onAnalyze={handleAnalyze}
              analyzingId={analyzingId}
            />
          }
        />
  
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );  
}

export default App;

