import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCard from "../components/DashboardCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/dashboardLayout.css";
import "../styles/dashboard.css";
import "../styles/dashboardCard.css";

const tools = [
  {
    icon: "📄",
    title: "Resume Builder",
    description: "Build ATS-friendly resumes with AI.",
    link: "/resume-builder",
    color: "#2563eb",
  },
  {
    icon: "✉️",
    title: "Cover Letter",
    description: "Generate professional cover letters.",
    link: "/cover-letter",
    color: "#16a34a",
  },
  {
    icon: "🎤",
    title: "Interview AI",
    description: "Practice interviews with AI feedback.",
    link: "/interview",
    color: "#9333ea",
  },
  {
    icon: "🗺️",
    title: "Career Roadmap",
    description: "Get a personalized learning roadmap.",
    link: "/roadmap",
    color: "#f97316",
  },
];

const usageData = [
  { day: "Mon", ai: 4 },
  { day: "Tue", ai: 7 },
  { day: "Wed", ai: 5 },
  { day: "Thu", ai: 10 },
  { day: "Fri", ai: 8 },
  { day: "Sat", ai: 12 },
  { day: "Sun", ai: 9 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2 className="fw-bold">Welcome, Santosh 👋</h2>
          <p className="text-muted">
            Build resumes, prepare interviews, and grow your career with AI.
          </p>

          <div className="card border-0 shadow-sm p-4 my-4 dashboard-hero">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3 className="fw-bold">Your AI Career Growth Hub 🚀</h3>
                <p className="mb-0">
                  Generate resumes, cover letters, interview feedback, and
                  career roadmaps using AI.
                </p>
              </div>

              <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                <a href="/resume-builder" className="btn btn-light">
                  Build Resume →
                </a>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-card">
                <div className="stats-icon" style={{ background: "#dbeafe" }}>
                  📄
                </div>
                <p className="text-muted mb-1">Total Resumes</p>
                <h2>5</h2>
                <span className="stats-trend">+20% this month ↗</span>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-card">
                <div className="stats-icon" style={{ background: "#dcfce7" }}>
                  ✉️
                </div>
                <p className="text-muted mb-1">Cover Letters</p>
                <h2>3</h2>
                <span className="stats-trend">+8% this week ↗</span>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-card">
                <div className="stats-icon" style={{ background: "#f3e8ff" }}>
                  🎤
                </div>
                <p className="text-muted mb-1">Interviews</p>
                <h2>12</h2>
                <span className="stats-trend">+12% practice ↗</span>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="stats-card">
                <div className="stats-icon" style={{ background: "#ffedd5" }}>
                  ⭐
                </div>
                <p className="text-muted mb-1">AI Generations</p>
                <h2>20</h2>
                <span className="stats-trend">+30% usage ↗</span>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm p-4 analytics-card">
                <h4 className="fw-bold mb-3">📈 AI Usage Analytics</h4>

                <div style={{ width: "100%", height: 250 }}>
                  <ResponsiveContainer>
                    <LineChart data={usageData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="ai"
                        stroke="#2563eb"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm p-4 analytics-card">
                <h4 className="fw-bold mb-3">🔥 Daily Goal</h4>

                <h2>70%</h2>

                <div className="progress mt-3">
                  <div className="progress-bar" style={{ width: "70%" }}></div>
                </div>

                <p className="mt-3 text-muted">Complete one interview today.</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {tools.map((tool, index) => (
              <DashboardCard key={index} {...tool} />
            ))}
          </div>

          <div className="card border-0 shadow-sm p-4 mt-4 activity-card">
            <h4 className="fw-bold mb-4">Recent Activity</h4>

            <div className="activity-item">
              <span>📄</span>
              <div>
                <h6>Resume Generated</h6>
                <p>AI resume created successfully</p>
              </div>
            </div>

            <div className="activity-item">
              <span>✉️</span>
              <div>
                <h6>Cover Letter Created</h6>
                <p>Generated for Frontend Developer role</p>
              </div>
            </div>

            <div className="activity-item">
              <span>🎤</span>
              <div>
                <h6>Interview Practice Completed</h6>
                <p>React interview feedback received</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
