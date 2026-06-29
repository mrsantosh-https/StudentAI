import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyResumes from "./pages/MyResumes";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import ViewResume from "./pages/ViewResume";
import CoverLetter from "./pages/CoverLetter";
import ResumeBuilder from "./pages/ResumeBuilder";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/my-resumes" element={<MyResumes />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/view-resume/:id" element={<ViewResume />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/edit-resume/:id" element={<ResumeBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;