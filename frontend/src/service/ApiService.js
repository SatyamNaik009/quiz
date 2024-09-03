import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8081";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  static async loginUser(loginDetails) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  static async addQuiz(quizRegister, userId) {
    const response = await axios.post(
      `${this.BASE_URL}/api/quiz/admin/add/${userId}`,
      quizRegister,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getQuizzes(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/quiz/user/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllQuizzes() {
    const response = await axios.get(`${this.BASE_URL}/auth/getAll`, {});
    return response.data;
  }

  static async getQuiz(quizId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/quiz/user/get/${quizId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateQuiz(quizId, { title, description }) {
    const response = await axios.put(
      `${this.BASE_URL}/api/quiz/admin/update/${quizId}`,
      { title, description },
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteQuiz(quizId) {
    const response = await axios.delete(
      `${this.BASE_URL}/api/quiz/admin/delete/${quizId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async addQuestion(questionRegister, quizId) {
    const response = await axios.post(
      `${this.BASE_URL}/api/question/admin/add/${quizId}`,
      questionRegister,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getQuestions(quizId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/question/user/${quizId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getQuestion(questionId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/question/user/question/${questionId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateQuestion(questionId, { questionText, difficultyLevel }) {
    const response = await axios.put(
      `${this.BASE_URL}/api/question/admin/update/${questionId}`,
      { questionText, difficultyLevel },
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteQuestion(questionId) {
    const response = await axios.delete(
      `${this.BASE_URL}/api/question/admin/delete/${questionId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async addOption(optionRegister, questionId) {
    const response = await axios.post(
      `${this.BASE_URL}/api/option/admin/add/${questionId}`,
      optionRegister,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getOptions(questionId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/option/user/${questionId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getOption(optionId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/option/user/option/${optionId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateOption(optionId, { optionText, correct }) {
    const response = await axios.put(
      `${this.BASE_URL}/api/option/admin/update/${optionId}`,
      { optionText, correct },
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteOption(optionId) {
    const response = await axios.delete(
      `${this.BASE_URL}/api/option/admin/delete/${optionId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async isOptionCorrect(userId, quizId, questionId, optionId) {
    const response = await axios.post(
      `${this.BASE_URL}/api/user/${userId}/quiz/${quizId}/question/${questionId}/submit/${optionId}`,
      {},
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllAttemptedQuizList(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/user/${userId}/getAllAttemptedQuizzes`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAttemptedQuizList(userId, quizId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/user/${userId}/getAttemptedQuiz/${quizId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAttemptedQuizByUser(userId, quizId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/user/${userId}/getAttemptedQuizByUser/${quizId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllQuestionResponsesOfQuizByUser(userId, quizId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/user/${userId}/getAttemptedQuizQuestionResponses/${quizId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getUserScores(quizId) {
    const response = await axios.get(
      `${this.BASE_URL}/api/user/quiz/${quizId}/scores`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
}
