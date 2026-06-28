export default function ResumeForm({ formData, handleChange }) {
  return (
    <div className="card shadow-sm border-0 p-4">

      <h3 className="mb-4">Resume Details</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="form-control mb-3"
        value={formData.fullName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-control mb-3"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="form-control mb-3"
        value={formData.phone}
        onChange={handleChange}
      />

      <textarea
        name="education"
        placeholder="Education"
        className="form-control mb-3"
        rows="3"
        value={formData.education}
        onChange={handleChange}
      ></textarea>

      <textarea
        name="skills"
        placeholder="Skills"
        className="form-control mb-3"
        rows="3"
        value={formData.skills}
        onChange={handleChange}
      ></textarea>

      <textarea
        name="projects"
        placeholder="Projects"
        className="form-control mb-3"
        rows="3"
        value={formData.projects}
        onChange={handleChange}
      ></textarea>

      <textarea
        name="experience"
        placeholder="Experience"
        className="form-control mb-3"
        rows="3"
        value={formData.experience}
        onChange={handleChange}
      ></textarea>

    </div>
  );
}