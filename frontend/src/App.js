import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./component/auth/RegisterPage";
import LoginPage from "./component/auth/LoginPage";
import Navbar from "./component/common/Navbar";
import AdminPage from "./component/admin/AdminPage";
import UserPage from "./component/user/UserPage";
import QuizDetailsPage from "./component/admin/QuizDetailsPage";
import UpdateQuizPage from "./component/admin/UpdateQuizPage";
import QuizPage from "./component/quiz/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/quiz/:quizId" element={<QuizDetailsPage />} />
          <Route
            path="/admin/update-quiz/:quizId"
            element={<UpdateQuizPage />}
          />
          <Route path="/quiz/:quizId/start" element={<QuizPage />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
