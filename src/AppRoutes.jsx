import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./Layout.jsx/MainLayout.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import PrivateRoute from "./routes/PrivateRoute.jsx"
import Logout from "./pages/Logout.jsx"
import { useAuth } from "./context/AuthContext.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import AppraisalFilling from "./pages/AppraisalFilling.jsx";
import ViewAppraisal from "./pages/ViewAppraisal.jsx";

function AppRoutes() {
  const { user, isAuthenticated } = useAuth();
  return (
    <>
      <div className="">
        <ToastContainer />
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>

              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fill-appraisal" element={<AppraisalFilling />} />
                <Route path="/view-appraisal" element={<ViewAppraisal />} />

                {isAuthenticated && (user.userType === 'Admin') &&
                  <>
                    <Route path="/user" element={<UserManagement />} />

                  </>
                }


                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default AppRoutes
