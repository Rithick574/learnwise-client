import { useSelector, useDispatch } from "react-redux";
import React,{ useEffect } from "react";

// Redux
import { getUserDataFirst } from "./redux/actions/user/userActions";

import Courses from "./pages/user/Courses";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";

//general
import IndexPage from "./pages/public/IndexPage";
import Error404 from "./pages/public/Error404";

//components
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";

//auth
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import { AppDispatch, RootState } from "./redux/store";
import ForgetPassword from "./pages/user/ForgetPassword";
import ResetPassword from "./pages/user/ResetPassword";

//user
import { ProfilePage } from "./pages/user/ProfilePage";
import { DashboardNav } from "./pages/user/DashboardNav";
import ApplyasInstructor from "./components/home/ApplyasInstructor";
import { ApplyToTeach } from "./pages/public/ApplyToTeach";
import { Instructors } from "./pages/public/Instructors";
import { About } from "./pages/public/About";

type ProtectedRouteProps = {
  element: React.ReactElement;
};

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch,user]);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useSelector((state: RootState) => state.user);
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/" />
              ) : user.role === "instructor" ? (
                <Navigate to="/instructor/" />
              ) : (
                <IndexPage />
              )
            ) : (
              <IndexPage />
            )
          }
        />
        {/* general pages */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="teach" element={<ApplyasInstructor/>}/>
        <Route path="apply-to-teach" element={<ApplyToTeach/>} />
        <Route path="instructors" element={<Instructors/>} />
        <Route path="about" element={<About/>} />


        {/* Auth Pages */}
        <Route path="login" element={user ? <Navigate to={'/'}/> : <Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
        <Route path="/auth/change-password" element={<ResetPassword />} />
        

      <Route
       path="/dashboard"
       element={<ProtectedRoute element={<DashboardNav />} />}
      >
        <Route path="profile" element={<ProfilePage />} /> 
      </Route>

      <Route path="*" element={<Error404 />} />
      </Routes> 
      <Footer />
    </Router>
  );
}

export default App;
