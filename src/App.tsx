import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './slice/quizSlices';
import type { RootState } from './app/store';
import Welcome from './pages/welcome';      
import HomePage from './pages/homepage'

import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import AddQuestionForm from './components/AddQuestionForm';
import Layout from './pages/layout';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.quiz.questions);

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions.length]);

  

  return (
    
    <Router>
      <Layout>
        <Routes>
          
          <Route path="/" element={<Welcome />} /> 
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuestionScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/add" element={<AddQuestionForm onClose={() => {}} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
