import { NavLink } from "react-router-dom";
import "../styles/dashboardLayout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-logo">
        Student<span>AI</span>
      </h3>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard">🏠 Dashboard</NavLink>
        <NavLink to="/resume-builder">📄 Resume Builder</NavLink>
        <NavLink to="/cover-letter">🤖 Cover Letter</NavLink>
        <NavLink to="/interview">🎤 AI Interview</NavLink>
        <NavLink to="/notes">🧠 Notes AI</NavLink>
        <NavLink to="/roadmap">🗺 Roadmap</NavLink>
        <NavLink to="/profile">👤 Profile</NavLink>
      </nav>

      <button className="logout-btn">🚪 Logout</button>
    </aside>
  );
}