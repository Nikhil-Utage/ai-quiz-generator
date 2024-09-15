import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import QuizGenerator from './components/quizgenerator';


const App = () => {
  return (
    <Router>
      

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<QuizGenerator />} />
        </Routes>
    </Router>
  );
};

export default App;
