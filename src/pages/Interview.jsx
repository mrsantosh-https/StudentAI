import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Interview() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">

          <h2>🎤 AI Interview Assistant</h2>

          <p className="text-muted">
            Practice technical interviews with AI.
          </p>

        </div>
      </main>
    </div>
  );
}