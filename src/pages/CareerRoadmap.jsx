import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { generateCareerRoadmap } from "../services/gemini";

export default function CareerRoadmap() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
   
  const handleGenerate = async () => {
  if (!goal) {
    alert("Please select a career goal");
    return;
  }

  setLoading(true);
  const result = await generateCareerRoadmap(goal);
  setRoadmap(result);
  setLoading(false);
};
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <div className="card border-0 shadow p-4">

            <h2>🗺 AI Career Roadmap</h2>

            <p className="text-muted">
              Select your career goal and let AI generate a roadmap.
            </p>

            <select
              className="form-select mt-3"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="">Choose Career</option>

              <option>Frontend Developer</option>

              <option>Backend Developer</option>

              <option>Full Stack Developer</option>

              <option>AI Engineer</option>

              <option>Data Analyst</option>

              <option>Cyber Security</option>

            </select>
            <button
            className="btn btn-primary mt-3"
            onClick={handleGenerate}
            disabled={loading}
            >
            {loading ? "Generating..." : "Generate Roadmap"}
            </button>
        
          </div>
          {roadmap && (
            <div className="card border-0 shadow p-4 mt-4">
                <h4>Generated Roadmap</h4>
                <hr />
                <div style={{ whiteSpace: "pre-line" }}>{roadmap}</div>
            </div>
            )}
        </div>
      </main>
    </div>
  );
}