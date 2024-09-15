// server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoute")

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

console.log("key", process.env.GEMINI_API_KEY)

// MongoDB connection string from your question
async function run() {
  console.log("connecting")
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("connected")
  } catch (err) {
    console.log("not connected")
  }
}

// Use environment variable for API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.get("/", (req, res) => {
  res.send("hello")
})

// Endpoint to handle quiz generation
app.post('/generate-quiz', async (req, res) => {
  const { topic } = req.body;
  console.log("topic1", topic)

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {    
    // Generate quiz questions based on the topic
    const prompt = `
    Generate 5 multiple-choice quiz questions on the topic "${topic}". 
    Each question should have 4 options and indicate the correct answer. 
    The format should be:
    Question: <question>
    Options:
    A) <option 1>
    B) <option 2>
    C) <option 3>
    D) <option 4>
    Correct Answer: <correct option>
    `;
    
    // Call the model's generateContent method
    const result = await model.generateContent(prompt);
    
    // Assuming the response has the text in result.response.text
    const quizQuestions = result.response.text().trim().split('\n');

    res.json({ quizQuestions });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

// Endpoint to handle MCQ generation
app.post('/generate-quiz', async (req, res) => {
  const { topic } = req.body;
  console.log("topic", topic)

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    // Prompt for generating multiple-choice questions
    const prompt = `
    Generate 5 multiple-choice quiz questions on the topic "${topic}". 
    Each question should have 4 options and indicate the correct answer. 
    The format should be:
    Question: <question>
    Options:
    A) <option 1>
    B) <option 2>
    C) <option 3>
    D) <option 4>
    Correct Answer: <correct option>
    `;

    // Call the model's generateContent method
    const result = await model.generateContent(prompt);
    
    // Assuming the response text contains the questions in the desired format
    const quizQuestions = result.response.text().trim().split('\n\n');  // Splitting questions by double newlines

    res.json({ quizQuestions });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});


const PORT = 5001;

run().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
