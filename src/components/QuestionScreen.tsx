import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion } from '../slice/quizSlices';
import type { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

const QuestionScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector((state: RootState) => state.quiz);
  const current = quiz.questions[quiz.currentIndex];

  useEffect(() => {
    if (quiz.quizEnded) {
      navigate('/result');
    }
  }, [quiz.quizEnded, navigate]);

  const handleAnswer = (option: string) => {
    dispatch(answerQuestion(option));
  };

  if (!current) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg">
        ⚠️ No current question found. Please start the quiz or add questions first.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Question {quiz.currentIndex + 1} of {quiz.questions.length}
      </h2>

      <p className="text-lg mb-6">{current.question}</p>

      <div className="grid gap-3">
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded text-left"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen;
