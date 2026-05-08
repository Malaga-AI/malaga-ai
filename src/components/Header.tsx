import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Malaga-AI</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/sponsors" className="hover:underline">Sponsors</Link>
          <Link to="/friends" className="hover:underline">Friends Communities</Link>
        </nav>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Join Collective</button>
      </div>
    </header>
  );
};

export default Header;