import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black font-sans text-white font-sans">
        <nav className="flex justify-between items-center px-6 py-4 shadow-lg bg-black bg-opacity-30 backdrop-blur-md sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-white">🎬 MovieSearch</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-black bg-yellow-400 p-1 rounded-md">Home</Link>
            <Link to="/favorites" className="hover:text-black bg-yellow-400 p-1 rounded-md">Favorites</Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
