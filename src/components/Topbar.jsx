import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboardLayout.css";
import Swal from "sweetalert2";

export default function Topbar() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(
      localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
      document.body.classList.toggle("dark-mode", darkMode);
      localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="topbar">
      <div>
        <h4>Dashboard</h4>
        <p>
          Welcome back,  <strong> Mr.{user?.name || "User"}</strong> 👋
        </p>
      </div>

      <div className="topbar-actions">
  <input
    type="text"
    className="form-control topbar-search"
    placeholder="Search..."
  />

  <button
    className={`theme-toggle ${darkMode ? "active" : ""}`}
    onClick={() => setDarkMode(!darkMode)}
  >
    <span>{darkMode ? "🌙" : "☀️"}</span>
  </button>

  <button className="notification-btn">
    🔔
    <span className="notification-badge">3</span>
  </button>

  <div className="profile-circle">
    {user?.profile_photo ? (
      <img
        src={`http://127.0.0.1:8000/storage/${user.profile_photo}`}
        alt="Profile"
      />
    ) : (
      <span>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
    )}
  </div>

  <button className="upgrade-btn">Upgrade Pro</button>

  <button
    className="logout-btn"
  onClick={async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "You will be redirected to login page.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}}
  >
    Logout
  </button>
</div>
    </div>
  );
}