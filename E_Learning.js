// Header sticky class
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Toggle the menu
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

// Remove menu items when scrolling
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('open');
};

// Python Quiz Data
const pythonQuiz = [
  {
    question: "What is the output of print(10 // 3)?",
    options: ["3", "3.33", "3.0", "2"],
    correctIndex: 0 // Correct answer is "3"
  },
  {
    question: "Which of the following is used to create a string in Python?",
    options: ["'", '"', '`', "All of the above"],
    correctIndex: 3 // Correct answer is "All of the above"
  },
  {
    question: "What is the keyword used to create a class in Python?",
    options: ["def", "class", "function", "object"],
    correctIndex: 1 // Correct answer is "class"
  },
  {
    question: "What will be the result of print(len('hello'))?",
    options: ["4", "5", "6", "None of the above"],
    correctIndex: 1 // Correct answer is "5"
  }
];

// Java Quiz Data
const javaQuiz = [
  {
    question: "Which of the following is the default value of a boolean in Java?",
    options: ["true", "false", "null", "0"],
    correctIndex: 1 // Correct answer is "false"
  },
  {
    question: "Which method is used to start a thread in Java?",
    options: ["start()", "run()", "execute()", "begin()"],
    correctIndex: 0 // Correct answer is "start()"
  },
  {
    question: "What is the size of a long in Java?",
    options: ["4 bytes", "8 bytes", "16 bytes", "32 bytes"],
    correctIndex: 1 // Correct answer is "8 bytes"
  },
  {
    question: "Which of these is used to handle exceptions in Java?",
    options: ["try-catch", "catch-finally", "throw", "All of the above"],
    correctIndex: 3 // Correct answer is "All of the above"
  }
];
const aiQuiz = [
  {
    question: "What is the primary function of an algorithm in Machine Learning?",
    options: ["To clean data", "To create a model", "To visualize data", "To analyze algorithms"],
    correctIndex: 1 // Correct answer is "To create a model"
  },
  {
    question: "Which of the following is a common machine learning algorithm used for classification?",
    options: ["Linear Regression", "Decision Trees", "K-means Clustering", "PCA"],
    correctIndex: 1 // Correct answer is "Decision Trees"
  },
  {
    question: "In AI, what does the term 'training data' refer to?",
    options: ["Data used to test models", "Data used to validate models", "Data used to teach the algorithm", "Data used to clean the models"],
    correctIndex: 2 // Correct answer is "Data used to teach the algorithm"
  },
  {
    question: "Which of the following is an example of supervised learning?",
    options: ["K-means clustering", "Linear regression", "PCA", "Reinforcement learning"],
    correctIndex: 1 // Correct answer is "Linear regression"
  },
  {
    question: "What is a key difference between deep learning and traditional machine learning?",
    options: ["Deep learning requires more data", "Deep learning is not as efficient", "Traditional ML does not use neural networks", "Deep learning does not require labeled data"],
    correctIndex: 2 // Correct answer is "Traditional ML does not use neural networks"
  }
];
const dataScienceQuiz = [
  {
    question: "What is the primary purpose of data preprocessing in a Data Science project?",
    options: ["To train the machine learning model", "To clean and transform raw data into a usable format", "To test the model's accuracy", "To visualize the data"],
    correctIndex: 1 // Correct answer is "To clean and transform raw data into a usable format"
  },
  {
    question: "Which of the following is not a type of machine learning?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Evolutionary Learning"],
    correctIndex: 3 // Correct answer is "Evolutionary Learning"
  },
  {
    question: "Which of the following is a common algorithm used for classification tasks in Data Science?",
    options: ["K-Means Clustering", "Decision Trees", "Principal Component Analysis (PCA)", "Linear Regression"],
    correctIndex: 1 // Correct answer is "Decision Trees"
  },
  {
    question: "What is the purpose of cross-validation in Data Science?",
    options: ["To evaluate the model's performance by dividing the dataset into multiple subsets", "To visualize the model's predictions", "To clean the dataset", "To scale the features of the dataset"],
    correctIndex: 0 // Correct answer is "To evaluate the model's performance by dividing the dataset into multiple subsets"
  },
  {
    question: "What is the main goal of feature engineering in Data Science?",
    options: ["To remove noisy data", "To select the most relevant features for the model", "To perform model evaluation", "To create new features from the existing data"],
    correctIndex: 3 // Correct answer is "To create new features from the existing data"
  }
];


  



let currentQuiz = pythonQuiz; // Default to Python quiz
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let userAnswers = []; // To store user-selected answers

// Function to load quiz based on the selected category
function loadQuiz(category) {
  if (category === "python") {
    currentQuiz = pythonQuiz;
  } else if (category === "java") {
    currentQuiz = javaQuiz;
  }
  else if (category === "ai")
  { currentQuiz = aiQuiz}
  else{
    currentQuiz = dataScienceQuiz; // Load Data Science quiz data
  }

  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  userAnswers = [];
  displayQuestion();
}

// Display the current question and options
function displayQuestion() {
  const questionElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const progressElement = document.getElementById("quiz-progress");

  // Load the current question
  const currentQuestion = currentQuiz[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Dynamically create the buttons for the options
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option-button";
    button.onclick = function () {
      selectOption(index); // Call selectOption on button click
    };
    optionsContainer.appendChild(button);
  });

  // Update progress display
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.length} | Correct: ${correctAnswers} | Incorrect: ${incorrectAnswers} | Score: ${Math.round((correctAnswers / (currentQuestionIndex + 1)) * 100)}%`;
}

// Handle the user's option selection
function selectOption(selectedIndex) {
  const correctIndex = currentQuiz[currentQuestionIndex].correctIndex;
  userAnswers.push(selectedIndex);

  if (selectedIndex === correctIndex) {
    correctAnswers++;
    alert("Correct!");
  } else {
    incorrectAnswers++;
    alert(`Incorrect! The correct answer is: ${currentQuiz[currentQuestionIndex].options[correctIndex]}`);
  }

  nextQuestion();
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.length) {
    displayQuestion();
  } else {
    displayResults();
  }
}

// Display results after the quiz is completed
function displayResults() {
  const questionElement = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const progressElement = document.getElementById("quiz-progress");

  const totalQuestions = currentQuiz.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  let results = `Quiz Complete!\n`;
  results += `Correct Answers: ${correctAnswers}\n`;
  results += `Incorrect Answers: ${incorrectAnswers}\n`;
  results += `Score Percentage: ${scorePercentage}%\n\n`;

  // Display the correct answers with user answers
  currentQuiz.forEach((question, index) => {
    results += `Q${index + 1}: ${question.question}\n`;
    results += `Your Answer: ${question.options[userAnswers[index]] || "Not Answered"}\n`;
    results += `Correct Answer: ${question.options[question.correctIndex]}\n\n`;
  });

  questionElement.textContent = "Quiz Results";
  optionsContainer.innerHTML = `<pre>${results}</pre><button onclick="restartQuiz()">Restart Quiz</button>`;
  progressElement.textContent = ""; // Hide progress after quiz completion
}

// Restart the quiz (defaults to Python quiz)
function restartQuiz() {
  loadQuiz("python");
}

// Automatically load the quiz when the page is ready
window.onload = function () {
  loadQuiz("python"); // You can set this to "java" for Java quiz.
};