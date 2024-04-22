import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import Courses from "./pages/user/Courses";
import IndexPage from "./pages/public/IndexPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./pages/user/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/policy" element={<PrivacyPolicy/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}


export default App;
