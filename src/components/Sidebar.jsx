import { Link } from "react-router-dom";
import "../styles/dashboardLayout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-logo">
        Student<span>AI</span>
      </h3>

      <nav className="sidebar-menu">
        <Link to="/dashboard">🏠 Dashboard</Link>
        <Link to="/resume-builder">📄 Resume Builder</Link>
        <Link to="/cover-letter">📝 Cover Letter</Link>
        <Link to="/interview">🎤 AI Interview</Link>
        <Link to="/notes">🧠 Notes</Link>
        <Link to="/roadmap">🗺 Roadmap</Link>
        <Link to="/profile">👤 Profile</Link>
      </nav>
    </aside>
  );
}