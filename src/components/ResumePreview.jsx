export default function ResumePreview({ formData }) {
  return (
    <div className="card shadow border-0 p-4">

      <h2>{formData.fullName || "Your Name"}</h2>

      <p>
        {formData.email || "email@example.com"} |
        {" "}
        {formData.phone || "+91 XXXXX XXXXX"}
      </p>

      <hr />

      <h4>Education</h4>
      <p>{formData.education || "Education will appear here..."}</p>

      <h4>Skills</h4>
      <p>{formData.skills || "Skills will appear here..."}</p>

      <h4>Projects</h4>
      <p>{formData.projects || "Projects will appear here..."}</p>

      <h4>Experience</h4>
      <p>{formData.experience || "Experience will appear here..."}</p>

    </div>
  );
}