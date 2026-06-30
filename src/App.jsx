import "./App.css";
import Home from "./pages/Home";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Interview from "./pages/Interview";
import MyResumes from "./pages/MyResumes";
import JobTracker from "./pages/JobTracker";
import ViewResume from "./pages/ViewResume";
import CoverLetter from "./pages/CoverLetter";
import CareerRoadmap from "./pages/CareerRoadmap";
import ResumeBuilder from "./pages/ResumeBuilder";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resume-builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-resumes"
            element={
              <ProtectedRoute>
                <MyResumes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cover-letter"
            element={
              <ProtectedRoute>
                <CoverLetter />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview"
            element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/career-roadmap"
            element={
              <ProtectedRoute>
                <CareerRoadmap />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job-tracker"
            element={
              <ProtectedRoute>
                <JobTracker />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
