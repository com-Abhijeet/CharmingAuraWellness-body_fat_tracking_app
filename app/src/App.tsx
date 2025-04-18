import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AssociateDashboard from "./pages/AssociateDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify/unstyled";
import AddUser from "./pages/AddUser";
import Reports from "./pages/Reports";
import ViewReports from "./pages/ViewReports";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Customers from "./pages/Customers";
import ViewCustomerDetails from "./pages/ViewCustomerDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import SecurityBoundary from "./components/SecurityBoundary";
import Home from "./pages/Home";
import CreateReport from "./pages/CreateReport";
import ReportsDetailsOverlay from "./components/ReportsDetailsOverlay";

const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID;

function App() {
  console.log("App component rendered");
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <ErrorBoundary>
            <div>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected Routes */}
                <Route
                  path="*"
                  element={
                    <SecurityBoundary>
                      <Routes>
                        <Route
                          path="/admin-dashboard"
                          element={<AdminDashboard />}
                        />
                        <Route
                          path="/associate-dashboard"
                          element={<AssociateDashboard />}
                        />
                        <Route path="/add-user" element={<AddUser />} />
                        <Route
                          path="/create-report"
                          element={<CreateReport />}
                        />
                        <Route path="/view-reports" element={<ViewReports />} />
                        <Route
                          path="/view-customer-report/:reportId"
                          element={<ReportsDetailsOverlay />}
                        />
                        <Route path="/customers" element={<Customers />} />
                        <Route
                          path="/view-customer-details/:email"
                          element={<ViewCustomerDetails />}
                        />
                      </Routes>
                    </SecurityBoundary>
                  }
                />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
            </div>
          </ErrorBoundary>
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
