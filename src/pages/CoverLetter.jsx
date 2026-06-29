import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/coverLetter.css";
import { generateCoverLetter } from "../services/gemini";

export default function CoverLetter() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    details: "",
  });

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    setLoading(true);

    const result = await generateCoverLetter(formData);

    setCoverLetter(result);
    setLoading(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2>🤖 AI Cover Letter Generator</h2>
          <p className="text-muted">
            Generate a professional cover letter for any job.
          </p>

          <div className="row mt-4">
            <div className="col-lg-5 mb-4">
              <div className="card border-0 shadow-sm p-4">
                <input
                  type="text"
                  name="company"
                  className="form-control mb-3"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="role"
                  className="form-control mb-3"
                  placeholder="Job Role"
                  value={formData.role}
                  onChange={handleChange}
                />

                <textarea
                  name="details"
                  className="form-control mb-3"
                  rows="5"
                  placeholder="Your skills and experience"
                  value={formData.details}
                  onChange={handleChange}
                ></textarea>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "✨ Generate Cover Letter"}
                </button>
              </div>
            </div>

            <div className="col-lg-7 mb-4">
              <div className="card border-0 shadow p-4 cover-output">
                <h4>Generated Cover Letter</h4>
                <hr />

                <div className="cover-text">
                  {coverLetter || "Your cover letter will appear here..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
