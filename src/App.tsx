import Header from "./components/Header";
import IndexPage from "./pages/user/IndexPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<IndexPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
