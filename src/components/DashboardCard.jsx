import { Link } from "react-router-dom";

export default function DashboardCard({
  icon,
  title,
  description,
  link,
  color,
}) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0 dashboard-card">
        <div className="card-body text-center">
          <div
            className="card-icon mx-auto mb-3"
            style={{ background: color }}
          >
            {icon}
          </div>

          <h5>{title}</h5>

          <p className="text-muted">{description}</p>

          <Link to={link} className="btn btn-primary">
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
}