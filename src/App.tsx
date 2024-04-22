import Courses from "./pages/user/Courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";

//general
import IndexPage from "./pages/public/IndexPage";

//components
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";

//auth
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";


function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/policy" element={<PrivacyPolicy/>} />

         {/* Auth Pages */}
         <Route path="login" element={<Login />} />
         <Route path="signup" element={<Signup />} />

      </Routes>
      <Footer/>
    </Router>
  );
}


export default App;
