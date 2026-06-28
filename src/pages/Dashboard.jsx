import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";
import "../styles/dashboardLayout.css";

const tools = [
  { icon: "📄", title: "Resume Builder", text: "Create ATS-friendly resume" },
  { icon: "📝", title: "Cover Letter", text: "Generate job cover letter" },
  { icon: "🎤", title: "AI Interview", text: "Practice with AI feedback" },
  { icon: "🧠", title: "Notes Summarizer", text: "Summarize long notes" },
  { icon: "🗺️", title: "Career Roadmap", text: "Get learning roadmap" },
  { icon: "👤", title: "Profile", text: "Manage your account" },
];

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <div className="row">
            {tools.map((tool, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="dashboard-card">
                  <div className="dashboard-icon">{tool.icon}</div>
                  <h4>{tool.title}</h4>
                  <p>{tool.text}</p>
                  <button className="btn btn-primary">Open Tool</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}