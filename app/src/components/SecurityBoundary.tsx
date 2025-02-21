import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchAuthenticatedUser } from "../services/authService";
import Loading from "./Loading";

interface Props {
  children: React.ReactNode;
}

const SecurityBoundary: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // console.log("SecurityBoundary useEffect called");

    const token = localStorage.getItem("token");
    // console.log("Token:", token);

    if (!token) {
      // console.log("No token found, redirecting to login");
      navigate("/login");
      setLoading(false); // Set loading to false after redirecting to login
      return;
    }

    const fetchUser = async () => {
      // console.log("Fetching user with token:", token);
      const result = await fetchAuthenticatedUser(token);

      if (result.success) {
        // console.log("User fetched successfully:", result.data);
        dispatch(setUser(result.data));
      } else {
        // console.error("Failed to fetch user:", result.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
      setLoading(false); // Set loading to false after fetching user
    };

    fetchUser();
  }, [dispatch, navigate]);

  // Prevent rendering children or Loading component if redirecting to login
  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default SecurityBoundary;
