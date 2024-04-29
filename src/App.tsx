import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

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

//components
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";

//auth
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import { AppDispatch, RootState } from "./redux/store";
import ForgetPassword from "./pages/user/ForgetPassword";

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch,user]);


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
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/policy" element={<PrivacyPolicy />} />

        {/* Auth Pages */}
        <Route path="login" element={user ? <Navigate to={'/'}/> : <Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
