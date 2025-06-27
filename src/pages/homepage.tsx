
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <div className="text-center space-y-6">
     
      <p className="text-gray-600 text-lg">Test your knowledge with our quick quiz!</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          ▶️ Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
