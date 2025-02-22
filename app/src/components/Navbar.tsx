import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg sticky-top px-3 navbar-dark bg-transparent">
      <a className="navbar-brand" href="#">
        Report Pro
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse d-flex justify-content-between"
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Pricing
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" onClick={() => navigate("/login")}>
            <a className="nav-link text-white d-flex gap-3" href="">
              <i className="bi bi-person-fill"></i>Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
