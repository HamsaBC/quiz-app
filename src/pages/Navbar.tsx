import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-amber-400 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
     
        <Link to="/" className="text-2xl font-bold">
          Quiz App
        </Link>

        
        <div className="flex gap-6">
          <Link to="/home" className="	hover:scale-105 transition duration-200">Home</Link>
          <Link to="/quiz" className="hover:scale-105 transition duration-200">Quiz</Link>
          <Link to="/add" className="hover:scale-105 transition duration-200">Add Question</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
