import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegisterUser } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleUser {
  email: string;
  userName: string;
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !userName || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    const response = await handleRegisterUser({
      email,
      userName,
      password,
      role: "associate", // Default role
      phoneNumber,
      address,
    });
    if (response.success) {
      setSuccess("User registered successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(response.message);
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    const decoded = jwtDecode(response.credential);
    const { email, name } = decoded as { email: string; name: string };

    setGoogleUser({ email, userName: name });
  };

  const handleGoogleFailure = () => {
    console.error("Google Sign-In failed:", error);
    setError("Google Sign-In failed. Please try again.");
  };

  const onGoogleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phoneNumber || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!googleUser) {
      setError("Google user information is missing.");
      return;
    }

    const response = await handleRegisterUser({
      email: googleUser.email,
      userName: googleUser.userName,
      password: "", // No password needed for Google registration
      role: "associate", // Default role
      phoneNumber,
      address,
    });

    if (response.success) {
      setSuccess("User registered successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="container">
        <div className="login-container">
          <h1>Register</h1>
          <div className="login-form">
            {!googleUser ? (
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
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
                          showPassword
                            ? "bi bi-eye-slash-fill"
                            : "bi bi-eye-fill"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-telephone-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Contact Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-house-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <div className="mb-3 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={onGoogleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-telephone-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Contact Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-house-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <div className="mb-3 d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Complete Registration
                  </button>
                </div>
              </form>
            )}
            <div className="mb-3 d-flex justify-content-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                useOneTap
                cancel_on_tap_outside
                size="medium"
                theme="filled_black"
                text="signup_with"
              />
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Already a user? Login <i className="bi bi-arrow-bar-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
