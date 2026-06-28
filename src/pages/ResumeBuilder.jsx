import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

import "../styles/dashboardLayout.css";
import "../styles/resume.css";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2 className="mb-2">📄 AI Resume Builder</h2>
          <p className="text-muted mb-4">
            Fill your details and see live resume preview.
          </p>

          <div className="row">
            <div className="col-lg-5 mb-4">
              <ResumeForm
                formData={formData}
                handleChange={handleChange}
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