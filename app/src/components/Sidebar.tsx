import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Assuming you have a logo image in the assets folder

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={toggleSidebar}>
          <i
            className={` ${isCollapsed ? "bi bi-list" : "bi bi-x-circle"}`}
          ></i>
        </button>
        <img src={logo} alt="Logo" className="logo" />
        <h3>Report PRO</h3>
      </div>
      <div className="sidebar-content">
        <ul>
          <li>
            <div
              className="sidebar-action"
              onClick={() => navigate("/admin-dashboard")}
            >
              <i className="bi bi-columns-gap"></i>
              <span>Dashboard</span>
            </div>
          </li>
          <li>
            <div
              className="sidebar-action"
              onClick={() => navigate("/add-user")}
            >
              <i className="bi bi-person-fill-add"></i>
              <span>Add User</span>
            </div>
          </li>
          <li>
            <div
              className="sidebar-action"
              onClick={() => navigate("/create-report")}
            >
              <i className="bi bi-journal-plus"></i>
              <span>Report</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
