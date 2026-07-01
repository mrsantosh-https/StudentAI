import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  checkATSScore,
  improveResume,
  matchJobDescription,
} from "../services/gemini";

export default function ViewResume() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [atsResult, setAtsResult] = useState("");
  const [atsLoading, setAtsLoading] = useState(false);
  const [improveResult, setImproveResult] = useState("");
  const [improveLoading, setImproveLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      const response = await api.get(`/resumes/${id}`);
      setResume(response.data);
    };

    fetchResume();
  }, [id]);

  const downloadResumePDF = async () => {
    const input = document.getElementById("resume-view-pdf");

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.full_name}_Resume.pdf`);
  };
  const extractATSScore = (text) => {
  const match = text.match(/ATS Score:\s*(\d+)/i);
  return match ? Number(match[1]) : null;
};
  const handleATSCheck = async () => {
  setAtsLoading(true);

  try {
    const result = await checkATSScore(resume);

    setAtsResult(result);

    const score = extractATSScore(result);

    if (score !== null) {
      await api.put(`/resumes/${id}/ats-score`, {
        ats_score: score,
      });
    }

    toast.success("ATS score checked and saved");
  } catch (error) {
    console.error(error);
    toast.error("ATS check failed");
  } finally {
    setAtsLoading(false);
  }
};

  const handleImproveResume = async () => {
    setImproveLoading(true);

    const result = await improveResume(resume);

    setImproveResult(result);

    setImproveLoading(false);
  };
  const handleJobMatch = async () => {
    setMatchLoading(true);

    const result = await matchJobDescription(resume, jobDescription);

    setMatchResult(result);
    setMatchLoading(false);
  };

  if (!resume) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <button className="btn btn-danger mb-3" onClick={downloadResumePDF}>
            📄 Download PDF
          </button>

          <button
            className="btn btn-primary mb-3 ms-2"
            onClick={handleATSCheck}
            disabled={atsLoading}
          >
            {atsLoading ? "Checking..." : "🤖 Check ATS Score"}
          </button>
          <button
            className="btn btn-success mb-3 ms-2"
            onClick={handleImproveResume}
            disabled={improveLoading}
          >
            {improveLoading ? "Improving..." : "✨ Improve Resume"}
          </button>
          <div id="resume-view-pdf" className="card border-0 shadow p-5">
            <div className="resume-header text-center">
              <h1>{resume.full_name}</h1>

              <p>
                {resume.email} | {resume.phone}
              </p>

              <p>
                {resume.linkedin} | {resume.github} | {resume.portfolio}
              </p>
            </div>

            <hr />

            <section className="resume-section">
              <h4>Professional Summary</h4>
              <p>{resume.summary}</p>
            </section>

            <section className="resume-section">
              <h4>Education</h4>
              <p>{resume.education}</p>
            </section>

            <section className="resume-section">
              <h4>Skills</h4>
              <p>{resume.skills}</p>
            </section>

            <section className="resume-section">
              <h4>Projects</h4>
              <p>{resume.projects}</p>
            </section>

            <section className="resume-section">
              <h4>Experience</h4>
              <p>{resume.experience}</p>
            </section>
          </div>

          {atsResult && (
            <div className="card border-0 shadow p-4 mt-4 ats-card">
              <h4>🤖 ATS Analysis Result</h4>
              <hr />
              <div className="ats-result">{atsResult}</div>
            </div>
          )}
          {improveResult && (
            <div className="card border-0 shadow p-4 mt-4">
              <h4>✨ AI Resume Improvement</h4>
              <hr />
              <div style={{ whiteSpace: "pre-line" }}>{improveResult}</div>
            </div>
          )}

          <div className="card border-0 shadow p-4 mt-4">
            <h4>💼 Job Description Matcher</h4>

            <textarea
              className="form-control mb-3"
              rows="6"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="btn btn-dark"
              onClick={handleJobMatch}
              disabled={matchLoading}
            >
              {matchLoading ? "Matching..." : "Check Match"}
            </button>
          </div>

          {matchResult && (
  <div className="card border-0 shadow p-4 mt-4 job-match-card">
    <h4>📊 Job Match Result</h4>
    <hr />
    <div className="job-match-result">
      {matchResult}
    </div>
  </div>
)}
        </div>
      </main>
    </div>
  );
}
