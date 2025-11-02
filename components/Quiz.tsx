
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
}

export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (showResults) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const goToNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
  }

  const goToPrev = () => {
      if(currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
  }

  const handleSubmit = () => {
    setShowResults(true);
  };
  
  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowResults(false);
  }

  const score = selectedAnswers.reduce((total, answer, index) => {
    return answer === questions[index].correctAnswerIndex ? total + 1 : total;
  }, 0);

  if (showResults) {
    return (
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
          {score} / {questions.length}
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          You answered {score} questions correctly.
        </p>
        <button
          onClick={handleRetake}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="text-xl sm:text-2xl font-semibold mt-1">{question.question}</h2>
      </div>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestionIndex] === index;
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 ring-2 ring-blue-500' 
                  : 'bg-slate-50 dark:bg-slate-700 border-transparent hover:bg-slate-100 dark:hover:bg-slate-600'
                }`}
            >
              <span className={`font-medium ${isSelected ? 'text-blue-800 dark:text-blue-200' : ''}`}>{option}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button 
          onClick={goToPrev} 
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers[currentQuestionIndex] === null}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <button 
            onClick={goToNext}
            disabled={selectedAnswers[currentQuestionIndex] === null}
            className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
