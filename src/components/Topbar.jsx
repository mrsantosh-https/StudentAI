import "../styles/dashboardLayout.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div>
        <h4>Dashboard</h4>
        <p>Welcome back, Santosh 👋</p>
      </div>

      <button className="btn btn-primary">Upgrade Pro</button>
    </div>
  );
}