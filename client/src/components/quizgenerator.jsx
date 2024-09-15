// src/components/QuizGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './quizgenerator.css'; // Import the CSS file for styling

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const generateQuiz = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-quiz`, {
        topic: topic // Sending the topic to the backend
      });
      setQuestions(response.data.quizQuestions);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('Failed to generate quiz. Please try again.');
      setQuestions([]); // Clear questions on error
    }
  };

  return (
    <>
      <Navbar />
      <div className="quiz-generator-container">
        <h1 className="quiz-generator-title">Quiz Generator</h1>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., elephant)"
          className="quiz-input"
        />
        <button onClick={generateQuiz} className="generate-btn">Generate Quiz</button>

        {error && <p className="error-message">{error}</p>}
        
        <ul className="quiz-questions">
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizGenerator;
