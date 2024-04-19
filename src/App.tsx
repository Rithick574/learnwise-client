import Footer from "./components/Footer";
import Header from "./components/Header";
import Courses from "./pages/user/Courses";
import IndexPage from "./pages/user/IndexPage";
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
