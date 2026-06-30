import api from "../services/api";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import "../styles/dashboardLayout.css";
import "../styles/resume.css";
import { useEffect, useState } from "react";
import { generateSummary } from "../services/gemini";
import { useParams, useNavigate } from "react-router-dom";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  education: "",
  skills: "",
  projects: "",
  experience: "",
});

const { id } = useParams();
const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateAI = async () => {
  const summary = await generateSummary(formData);

  setFormData((prev) => ({
    ...prev,
    summary,
  }));
};

const handleSaveResume = async () => {
  try {
    let response;

    if (id) {
      response = await api.put(`/resumes/${id}`, {
        ...formData,
        title: formData.fullName || "Untitled Resume",
      });
    } else {
      response = await api.post("/resumes", {
        ...formData,
        title: formData.fullName || "Untitled Resume",
      });
    }

   toast.success(response.data.message);
    navigate("/my-resumes");
  } catch (error) {
    console.error(error);
    toast.error("Resume save/update failed");
  }
};

const fetchResume = async () => {
  if (!id) return;

  try {
    const response = await api.get("/resumes");

    const resume = response.data.find((r) => r.id === Number(id));

    if (resume) {
      setFormData({
        fullName: resume.full_name,
        email: resume.email,
        phone: resume.phone,
        linkedin: resume.linkedin,
        github: resume.github,
        portfolio: resume.portfolio,
        summary: resume.summary,
        education: resume.education,
        skills: resume.skills,
        projects: resume.projects,
        experience: resume.experience,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchResume();
}, []);
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content"> 
          <h2 className="mb-2">
            {id ? "✏️ Edit Resume" : "📄 AI Resume Builder"}
          </h2>
          <p className="text-muted mb-4">
            Fill your details and see live resume preview.
          </p>

          <div className="row">
            <div className="col-lg-5 mb-4">
              <ResumeForm
                formData={formData}
                handleChange={handleChange}
                handleGenerateAI={handleGenerateAI}
                handleSaveResume={handleSaveResume}
              />
            </div>

            <div className="col-lg-7 mb-4">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}