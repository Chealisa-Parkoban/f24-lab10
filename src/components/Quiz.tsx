import React, { useState, useRef } from 'react';
import QuizCore from '../core/QuizCore';
import './Quiz.css';

const Quiz: React.FC = () => {
  const quizCore = useRef(new QuizCore()).current;
  

  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(quizCore.getScore());

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());
      setSelectedAnswer(null); 
    }

    const nextQuestion = quizCore.nextQuestion();
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setCurrentQuestion(null);
    }
  };

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>
          Final Score: {score} out of {quizCore.getTotalQuestions()}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;
