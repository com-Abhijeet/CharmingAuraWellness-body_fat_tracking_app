import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await handleLogin(email, password);
    if (response.success) {
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      dispatch(setUser(user));

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "associate") {
        navigate("/associate-dashboard");
      }
    } else {
      // Handle login error (e.g., show error message)
      console.error(response.message);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={
                      showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="mb-3 d-flex justify-content-center align-content-center">
              <span>Need help signing in? </span>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
