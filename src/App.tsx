import { useSelector, useDispatch } from "react-redux";
import React, { FC,useEffect } from "react";

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
import { AdminLayout } from "./components/layout/AdminLayout";
import { StudentLayout } from "./components/layout/StudentLayout";
import { InstructorLayout } from "./components/layout/InstructorLayout";

type ProtectedRouteProps = {
  element: React.ReactElement;
  allowedRoles: string[];
};

type RoleRoutes = {
  [key: string]: string; 
};

interface RoleBasedRedirectProps {
  roles: RoleRoutes;
}

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user]);

  const ProtectedRoute:FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useSelector((state: RootState) => state.user);
    return user ? element : <Navigate to="/learnwise" />;
  };


  const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ roles }) => {
    const { user } = useSelector((state: RootState) => state.user);
    console.log("🚀 ~ file: App.tsx:72 ~ App ~ user:", user)

    if (user && roles[user.role]) {
      return <Navigate to={roles[user.role]} replace />;
    }

    return <Navigate to="/learnwise" replace />;
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RoleBasedRedirect
              roles={{
                admin: "/admin",
                instructor: "/instructor",
                student: "/student",
              }}
            />
          }
        />
        {/* general pages */}
        <Route path="/learnwise" element={<IndexPage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="teach" element={<ApplyasInstructor />} />
        <Route path="apply-to-teach" element={<ApplyToTeach />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="about" element={<About />} />

        {/* Auth Pages */}
        <Route 
          path="login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
        <Route path="/auth/change-password" element={<ResetPassword />} />

        {/* admin Routes */}
        <Route path="/admin/*" element={<ProtectedRoute allowedRoles={["admin"]} element={<AdminRoutes/>} />}>
        </Route>

        {/* instructor Routes */}
        <Route path="/instructor/*" element={<ProtectedRoute allowedRoles={["instructor"]} element={<InstructorRoutes/>} />}>
        </Route>

        {/* student Layout */}
        <Route path="/student/*" element={<ProtectedRoute allowedRoles={["student"]} element={<StudentRoutes />} />}>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

const AdminRoutes:FC = () => {
  return (
  <Routes>
    <Route path="/" element={<AdminLayout/>}>

    </Route>
  </Routes>
  )
}

const InstructorRoutes:FC=()=>{  
 return(
  <Routes>
  <Route path="/" element={<InstructorLayout/>}>
  </Route>
</Routes>
 )
}

const StudentRoutes:FC=()=>{
  return(
    <Routes>
      <Route path="/" element={<StudentLayout/>}>
      <Route path="dashboard" element={<DashboardNav />} />
      <Route path="profile" element={<ProfilePage />} />

      </Route>
    </Routes>
  )
}