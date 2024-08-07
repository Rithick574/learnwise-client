import { useSelector, useDispatch } from "react-redux";
import React, { FC, useEffect } from "react";

// Redux
import { getUserDataFirst } from "./redux/actions/user/userActions";

import Courses from "./pages/user/Courses";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";

//general
import IndexPage from "./pages/public/IndexPage";
import Error404 from "./pages/public/Error404";
import ApplyasInstructor from "./components/home/ApplyasInstructor";
import { ApplyToTeach } from "./pages/public/ApplyToTeach";
import { Instructors } from "./pages/public/Instructors";
import { About } from "./pages/public/About";
import {InstructorDetails} from "./pages/public/InstructorDetails"

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
import { StudentLayout } from "./components/layout/StudentLayout";

//admin
import { AdminLayout } from "./components/layout/AdminLayout";
import { AdminCategories } from "./pages/admin/AdminCategories";
import { AdminRequests } from "./pages/admin/AdminRequests";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminInstructorList } from "./pages/admin/AdminInstructorList";

//instructor
import { InstructorLayout } from "./components/layout/InstructorLayout";
import { AdminHome } from "./pages/admin/AdminHome";
import { Profile } from "./pages/instructor/Profile";
import { InstructorSettings } from "./pages/instructor/InstructorSettings";
import { InstructorDashboard } from "./pages/instructor/InstructorDashboard";
import { AdminCourses } from "./pages/admin/AdminCourses";
import { InstructorMyCourses } from "./pages/instructor/course/InstructorMyCourses";
import { InstructorAddCourse } from "./pages/instructor/course/InstructorAddCourse";
import { InstructorAddTrailer } from "./pages/instructor/course/InstructorAddTrailer";
import InstructorAddLesson from "./pages/instructor/course/InstructorAddLesson";
import { CourseDetail } from "./pages/admin/CourseDetail";
import { DetailedCourse } from "./pages/public/DetailedCourse";
import UserPaymentSuccess from "./pages/user/UserPaymentSuccess";
import UserPaymentFailed from "./pages/user/UserPaymentFailed";
import InstructorChat from "./pages/instructor/chat/InstructorChat";
import InstructorMyStuddents from "./pages/instructor/InstructorMyStudents";
import InstructorAssessments from "./pages/instructor/InstructorAssessments";
import AdminPayments from "./pages/admin/AdminPayments";
import { Enrollments } from "./pages/user/Enrollments";
import { StudentChat } from "./pages/user/chat/StudentChat";
import Editcourse from "./pages/instructor/course/Editcourse";
import EditCourseTrailer from "./pages/instructor/course/EditCourseTrailer";
import EditCourseContent from "./pages/instructor/course/EditCourseContent";
import CreateExam from "./pages/instructor/exam/createExam";
import { PaymentSuccess } from "./pages/user/subscription/PaymentSuccess";
import PaymentFailed from "./pages/user/subscription/PaymentFailed";
import VideoCallPage from './components/instructor/chat/VideoCall';
import { Exams } from "./pages/user/Exams";
import { Notifications } from "./components/admin/notification/Notifications";
import StudentSubscriptions from "./pages/user/subscription/StudentSubscriptions";

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

  const ProtectedRoute: FC<ProtectedRouteProps> = ({
    element,
    allowedRoles,
  }) => {
    const { user } = useSelector((state: RootState) => state.user);
    const location = useLocation();
    if (!user) {
      return <Navigate to="/" state={{ from: location }}  />;
    }
    if (allowedRoles.includes(user.role)) {
      return element;
    } else {
      return <Navigate to="/not-authorized" />;
    }
  };

  const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ roles }) => {
    const { user } = useSelector((state: RootState) => state.user);

    if (user && roles[user.role]) {
      return <Navigate to={roles[user.role]} replace />;
    }

    return <IndexPage/>;
  };

  return (
    <Router>
      {(!user ||
        (user.role !== "admin" &&
          user.role !== "instructor" &&
          user.role !== "student")) && <Header />}
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
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<DetailedCourse />} />
        <Route path="course/paymentsuccess" element={<UserPaymentSuccess />} />
        <Route path="course/paymentfailed" element={<UserPaymentFailed />} />
        <Route path="instructors/subscription/success" element={<PaymentSuccess />} />
        <Route path="instructors/subscription/failed" element={<PaymentFailed />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="teach" element={<ApplyasInstructor />} />
        <Route path="apply-to-teach" element={<ApplyToTeach />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="instructors/:instructorId" element={<InstructorDetails/>}/>
        <Route path="about" element={<About />} />

        <Route path='/call' element={<VideoCallPage />} />

        {/* Auth Pages */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
        <Route path="/auth/change-password" element={<ResetPassword />} />

        {/* admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
              element={<AdminRoutes />}
            />
          }
        ></Route>

        {/* instructor Routes */}
        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute
              allowedRoles={["instructor"]}
              element={<InstructorRoutes />}
            />
          }
        ></Route>

        {/* student Layout */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute
              allowedRoles={["student"]}
              element={<StudentRoutes />}
            />
          }
        ></Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
      {(!user ||
        (user.role !== "admin" &&
          user.role !== "instructor" &&
          user.role !== "student")) && <Footer />}
    </Router>
  );
}

export default App;

const AdminRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/instructors" element={<AdminInstructorList />} />
        <Route path="/requests" element={<AdminRequests />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/courses" element={<AdminCourses />} />
        <Route
          path="courses/course-detail/:courseId"
          element={<CourseDetail />}
        />
      </Route>
    </Routes>
  );
};

const InstructorRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InstructorLayout />}>
        <Route index element={<InstructorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses">
          <Route index element={<InstructorMyCourses />} />
          <Route path="addcourse" element={<InstructorAddCourse />} />
          <Route path="uploadtrailer" element={<InstructorAddTrailer />} />
          <Route path="addlesson" element={<InstructorAddLesson />} />
          <Route path="edit/:courseId" element={<Editcourse />} />
          <Route path="editcourse/:courseId" element={<EditCourseTrailer />} />
          <Route path="editcontent/:courseId" element={<EditCourseContent />} />
        </Route>
        <Route path="assessments" element={<InstructorAssessments />} />
        <Route path="assessments/:courseId" element={<CreateExam />} />
        <Route path="messages" element={<InstructorChat />} />
        <Route path="notification" element={<Notifications />} />
        <Route path="mystudents" element={<InstructorMyStuddents />} />
        <Route path="/settings" element={<InstructorSettings />} />
      </Route>
    </Routes>
  );
};

const StudentRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<DashboardNav />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path=":courseId" element={<DetailedCourse />} />
        </Route>
        <Route path="instructors" element={<Instructors />} />
        <Route path="instructors/:instructorId" element={<InstructorDetails />} />
        <Route path="overview" element={<DashboardNav />} />
        <Route path="/exam/:courseId" element={<Exams />} />
        <Route path="enrollments" element={<Enrollments />} />
        <Route path="subscriptions" element={<StudentSubscriptions />} />
        <Route path="messages" element={<StudentChat />} />
        <Route path="settings" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
