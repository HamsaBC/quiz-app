import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../slice/quizSlices';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';

const ResultScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, userAnswers, score } = useSelector((state: RootState) => state.quiz);

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate('/quiz');
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">🎉 Quiz Completed!</h2>
      <p className="text-lg mb-6">
        You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
      </p>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[idx];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div key={idx} className="p-4 border rounded bg-gray-50">
              <p className="font-semibold mb-2">
                Q{idx + 1}: {q.question}
              </p>
              <p>
                <span className="font-medium">Your Answer:</span>{' '}
                <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                  {userAnswer || 'No Answer'}
                </span>{' '}
                {isCorrect ? '✅' : '❌'}
              </p>
              {!isCorrect && (
                <p>
                  <span className="font-medium">Correct Answer:</span>{' '}
                  <span className="text-blue-600">{q.correctAnswer}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleRestart}
          className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-2 rounded"
        >
          🔄 Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
