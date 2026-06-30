import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    location: "",
    job_link: "",
    applied_date: "",
    notes: "",
  });

  const fetchJobs = async () => {
    const response = await api.get("/jobs");
    setJobs(response.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = async (e) => {
  e.preventDefault();

  if (editId) {
    await api.put(`/jobs/${editId}`, formData);
  } else {
    await api.post("/jobs", formData);
  }

  setFormData({
    company: "",
    role: "",
    status: "Applied",
    location: "",
    job_link: "",
    applied_date: "",
    notes: "",
  });

  setEditId(null);
  fetchJobs();
};
const handleDelete = async (id) => {
  if (!window.confirm("Delete this job application?")) return;

  await api.delete(`/jobs/${id}`);

  fetchJobs();
};
const handleEdit = (job) => {
  setEditId(job.id);

  setFormData({
    company: job.company || "",
    role: job.role || "",
    status: job.status || "Applied",
    location: job.location || "",
    job_link: job.job_link || "",
    applied_date: job.applied_date || "",
    notes: job.notes || "",
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};
const getStatusClass = (status) => {
  switch (status) {
    case "Applied":
      return "bg-primary";
    case "Interview":
      return "bg-warning text-dark";
    case "Offer":
      return "bg-success";
    case "Rejected":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2 className="fw-bold">💼 Job Tracker</h2>
          <p className="text-muted">Track your job applications.</p>

          <div className="card border-0 shadow p-4 mt-4">
            <h4>{editId ? "Edit Job Application" : "Add Job Application"}</h4>

            <form onSubmit={handleAddJob} className="row g-3 mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  placeholder="Role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  type="date"
                  name="applied_date"
                  className="form-control"
                  value={formData.applied_date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <input
                  type="text"
                  name="job_link"
                  className="form-control"
                  placeholder="Job Link"
                  value={formData.job_link}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <textarea
                  name="notes"
                  className="form-control"
                  rows="3"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <button className="btn btn-primary">
                {editId ? "Update Job" : "➕ Add Job"}
                </button>
              </div>
            </form>
          </div>

          <div className="card border-0 shadow p-4 mt-4">
            <h4>My Applications</h4>

            <div className="table-responsive mt-3">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.company}</td>
                      <td>{job.role}</td>
                      <td>
                        <span className={`badge ${getStatusClass(job.status)}`}>
                        {job.status}
                        </span>
                      </td>
                      <td>{job.location}</td>
                      <td>{job.applied_date}</td>

                      <td>
  <button
  className="btn btn-sm btn-warning me-2"
  onClick={() => handleEdit(job)}
>
  ✏️
</button>

  <button
  className="btn btn-sm btn-danger"
  onClick={() => handleDelete(job.id)}
>
  🗑️
</button>
</td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}