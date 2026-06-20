import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="notfound-wrapper">

      <div className="notfound-card">

        <div className="notfound-icon">
          <i className="fas fa-circle-exclamation"></i>
        </div>

        <h1>404</h1>

        <h3>Page Not Found</h3>

        <p>
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="notfound-btn">
          Back to Home
        </Link>

      </div>

    </div>
  );
}