import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";
import { matchJobDescription } from "../services/gemini";
import toast from "react-hot-toast";

export default function JobMatcher() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    const response = await api.get("/resumes");
    setResumes(response.data);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    if (!selectedResume) {
      toast.error("Please select a resume");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please paste job description");
      return;
    }

    const resume = resumes.find((r) => r.id === Number(selectedResume));

    try {
      setLoading(true);
      const aiResult = await matchJobDescription(resume, jobDescription);
      setResult(aiResult);
      toast.success("Job match completed");
    } catch (error) {
      console.error(error);
      toast.error("Job match failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2 className="fw-bold">🎯 AI Job Matcher</h2>
          <p className="text-muted">
            Compare your resume with a job description.
          </p>

          <div className="card border-0 shadow p-4 mt-4 matcher-card">
            <h4>Select Resume</h4>

            <select
              className="form-select mt-3"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              <option value="">Choose Resume</option>

              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </select>
          </div>

          <div className="card border-0 shadow p-4 mt-4">
            <h4>Paste Job Description</h4>

            <textarea
              className="form-control mt-3"
              rows="8"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="btn btn-primary mt-3"
              onClick={handleMatch}
              disabled={loading}
            >
              {loading ? "Matching..." : "🎯 Check Match"}
            </button>
          </div>

          {result && (
            <div className="card border-0 shadow p-4 mt-4">
              <h4>📊 Match Result</h4>
              <hr />
              <div className="matcher-result">{result}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}