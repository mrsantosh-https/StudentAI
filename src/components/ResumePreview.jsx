export default function ResumePreview({ formData }) {
  return (
    <div id="resume-preview" className="resume-preview">

  <h1>{formData.fullName || "YOUR NAME"}</h1>

  <p>
    {formData.email} | {formData.phone}
  </p>

  <p>
    {formData.linkedin}
  </p>

  <p>
    {formData.github}
  </p>

  <p>
    {formData.portfolio}
  </p>

  <hr />

  <h3>Professional Summary</h3>
  <p>{formData.summary}</p>

  <hr />

  <h3>Education</h3>

<div className="education-list">
  {(formData.education || "")
    .split("\n")
    .filter((edu) => edu.trim() !== "")
    .map((edu, index) => (
      <div className="resume-education" key={index}>
        🎓 {edu.trim()}
      </div>
    ))}
</div>

  <hr />

  <h3>Skills</h3>

<div className="skills-container">
  {(formData.skills || "")
    .split(",")
    .filter((skill) => skill.trim() !== "")
    .map((skill, index) => (
      <span className="skill-tag" key={index}>
        {skill.trim()}
      </span>
    ))}
</div>

  <hr />

  <h3>Projects</h3>

<div className="project-list">
  {(formData.projects || "")
    .split("\n")
    .filter((project) => project.trim() !== "")
    .map((project, index) => (
      <div className="resume-project" key={index}>
        <strong>📌 {project.trim()}</strong>
      </div>
    ))}
</div>

  <hr />

  <h3>Experience</h3>
  <p>{formData.experience}</p>

</div>
  );
}
