import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/interview.css";
import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
} from "../services/gemini";

export default function Interview() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const extractScore = (text) => {
    const match = text.match(/(\d+)\s*\/\s*10/);
    return match ? Number(match[1]) * 10 : null;
  };

  const handleGenerate = async () => {
    if (!role.trim()) {
      toast.error("Please enter a role");
      return;
    }

    setLoading(true);

    const result = await generateInterviewQuestions(role);

    const questionArray = result
      .split("\n")
      .filter((q) => q.trim() !== "");

    setQuestions(questionArray);
    setLoading(false);
    toast.success("Questions generated");
  };

  const handleEvaluate = async () => {
    if (!selectedQuestion.trim()) {
      toast.error("Please select or enter a question");
      return;
    }

    if (!answer.trim()) {
      toast.error("Please write your answer");
      return;
    }

    setLoading(true);

    try {
      const result = await evaluateInterviewAnswer(selectedQuestion, answer);

      setFeedback(result);

      const score = extractScore(result);

      await api.post("/interview-history", {
        role,
        question: selectedQuestion,
        answer,
        feedback: result,
        score,
      });

      toast.success("Feedback saved to history");
    } catch (error) {
      console.error(error);
      toast.error("Failed to evaluate/save interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2>🎤 AI Interview Assistant</h2>
          <p className="text-muted">
            Generate interview questions and get AI feedback on your answers.
          </p>

          <div className="row mt-4">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm p-4">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter role e.g. React Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Questions"}
                </button>
              </div>
            </div>

            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow p-4 interview-card">
                <h4>Interview Questions</h4>
                <hr />

                <div className="list-group">
                  {questions.length === 0 ? (
                    <div className="text-muted">
                      Questions will appear here...
                    </div>
                  ) : (
                    questions.map((question, index) => (
                      <button
                        key={index}
                        className="list-group-item list-group-item-action question-item"
                        onClick={() => setSelectedQuestion(question)}
                      >
                        {question}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="card border-0 shadow p-4 mt-4">
                <h4>Answer Practice</h4>

                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Paste one interview question here"
                  value={selectedQuestion}
                  onChange={(e) => setSelectedQuestion(e.target.value)}
                />

                <textarea
                  className="form-control mb-3"
                  rows="5"
                  placeholder="Write your answer here"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

                <button
                  className="btn btn-success"
                  onClick={handleEvaluate}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "🤖 Check Answer"}
                </button>
              </div>

              <div className="card border-0 shadow p-4 mt-4 feedback-card">
                <h4>AI Feedback</h4>
                <hr />
                <div className="feedback-content">
                  {feedback || "AI feedback will appear here..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}