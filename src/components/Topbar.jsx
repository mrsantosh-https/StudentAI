import "../styles/dashboardLayout.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div>
        <h4>Dashboard</h4>
        <p>Welcome back, Santosh 👋</p>
      </div>

      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          className="form-control topbar-search"
          placeholder="Search..."
        />

        <button className="btn btn-light">🔔</button>

        <div className="topbar-avatar">SY</div>

        <button className="btn btn-primary">Upgrade Pro</button>
      </div>
    </div>
  );
}