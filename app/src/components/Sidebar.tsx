import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Assuming you have a logo image in the assets folder
import { setSidebarCollapsed, toggleSidebar } from "../redux/configSlice";
import useMediaQuery from "../hooks/useMediaQuery";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setLogggedIn] = useState(false);
  const isCollapsed = useSelector(
    (state: { config: { isSidebarCollapsed: boolean } }) =>
      state.config.isSidebarCollapsed
  );
  const user = useSelector((state: { user: { user: any } }) => state.user.user);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarCollapsed(true));
    }
  }, [isMobile, dispatch]);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      if (!user) {
        navigate("/login");
      }
      setLogggedIn(true);
    };
    checkUserLoggedIn();
  }, [user, navigate]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/login");
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={handleToggleSidebar}>
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
            {user.role === "admin" ? (
              <div
                className="sidebar-action"
                onClick={() => handleLinkClick("/admin-dashboard")}
              >
                <i className="bi bi-columns-gap"></i>
                <span>Dashboard</span>
              </div>
            ) : (
              <div
                className="sidebar-action"
                onClick={() => handleLinkClick("/associate-dashboard")}
              >
                <i className="bi bi-columns-gap"></i>
                <span>Dashboard</span>
              </div>
            )}
          </li>
          {user.role === "admin" && (
            <li>
              <div
                className="sidebar-action"
                onClick={() => handleLinkClick("/add-user")}
              >
                <i className="bi bi-person-fill-add"></i>
                <span>Add User</span>
              </div>
            </li>
          )}

          <li>
            <div
              className="sidebar-action"
              onClick={() => handleLinkClick("/create-report")}
            >
              <i className="bi bi-clipboard-plus-fill"></i>
              <span>Create Report</span>
            </div>
          </li>
          <li>
            <div
              className="sidebar-action"
              onClick={() => handleLinkClick("/view-reports")}
            >
              <i className="bi bi-clipboard-plus-fill"></i>
              <span>View Reports</span>
            </div>
          </li>
          <li>
            <div
              className="sidebar-action"
              onClick={() => handleLinkClick("/customers")}
            >
              <i className="bi bi-people-fill"></i>
              <span>Customers</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <div className="profile-section">
          <i className="bi bi-person-circle"></i>
          {loggedIn ? <span>{user.userName}</span> : <span>Guest</span>}
        </div>
        <div className="logout-section" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
