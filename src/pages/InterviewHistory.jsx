import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function InterviewHistory() {
  const [histories, setHistories] = useState([]);

  const fetchHistory = async () => {
    const response = await api.get("/interview-history");
    setHistories(response.data);
  };
  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Interview?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    background: "#ffffff",
    color: "#111827",
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/interview-history/${id}`);
    toast.success("Interview deleted successfully");
    fetchHistory();
  } catch (error) {
    console.error(error);
    toast.error("Delete failed");
  }
};

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2 className="fw-bold">📜 Interview History</h2>
          <p className="text-muted">Your saved interview practice records.</p>

          {histories.map((item) => (
            <div className="card border-0 shadow p-4 mt-4" key={item.id}>
              <h5>{item.role}</h5>
              <button
                className="btn btn-danger btn-sm mb-3"
                onClick={() => handleDelete(item.id)}
                >
                🗑 Delete
              </button>
              <p><strong>Score:</strong> {item.score || "N/A"}</p>
              <p><strong>Question:</strong> {item.question}</p>
              <p><strong>Your Answer:</strong> {item.answer}</p>
              <hr />
              <div style={{ whiteSpace: "pre-line" }}>
                {item.feedback}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}