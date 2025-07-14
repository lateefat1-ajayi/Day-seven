import { useEffect, useState } from "react";
import MovieModal from "../components/MovieModal";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { fetchGenreMap } from "../utils/genreMap";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState(() =>
        JSON.parse(localStorage.getItem("favorites")) || []
    );
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [genreMap, setGenreMap] = useState({});
    const [recentSearches, setRecentSearches] = useState(() =>
        JSON.parse(localStorage.getItem("recentSearches")) || []
    );

    useEffect(() => {
        const loadGenres = async () => {
            const map = await fetchGenreMap();
            setGenreMap(map);
        };
        loadGenres();
    }, []);

    const fetchMovies = async (term = searchTerm) => {
        const trimmed = term.trim();
        if (!trimmed) return;

        setLoading(true);
        setHasSearched(true);

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY
                }&query=${encodeURIComponent(trimmed)}`
            );
            const data = await res.json();
            setMovies(data.results || []);

            setRecentSearches((prev) => {
                const updated = [trimmed, ...prev.filter((t) => t !== trimmed)].slice(0, 5);
                localStorage.setItem("recentSearches", JSON.stringify(updated)); // 🧠 Save to storage
                return updated;
            });

        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (movie) => {
        const exists = favorites.find((fav) => fav.id === movie.id);
        const updated = exists
            ? favorites.filter((fav) => fav.id !== movie.id)
            : [...favorites, movie];

        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id);

    return (
        <div className="px-4">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={() => fetchMovies()}
            />

            {/* 🧹 Clear + Recent */}
            {hasSearched && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setMovies([]);
                            setHasSearched(false);
                        }}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full transition"
                    >
                        Clear Search
                    </button>

                    {recentSearches.length > 0 && (
                        <div className="text-sm text-gray-300">
                            <span className="font-semibold text-yellow-400 mr-1">Recent:</span>
                            {recentSearches.map((term, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setSearchTerm(term);
                                        fetchMovies(term);
                                    }}
                                    className="ml-2 underline hover:text-yellow-300 transition"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 🔄 Loading or 🎬 Results */}
            {loading ? (
                <div className="flex justify-center mt-12">
                    <div className="text-yellow-400 text-lg animate-pulse">Searching...</div>
                </div>
            ) : hasSearched ? (
                movies.length > 0 ? (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onFavorite={toggleFavorite}
                                isFavorite={isFavorite(movie)}
                                onOpenModal={setSelectedMovieId}
                                genreMap={genreMap}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 mt-12">
                        No movies found. Try a different title.
                    </p>
                )
            ) : (
                <div className="text-center mt-16 text-gray-300">
                    <h1 className="text-3xl font-bold mb-4">🎬 Welcome to MovieSearch</h1>
                    <p className="text-lg">Search for any movie, check ratings, and save your favorites.</p>
                    <p className="text-sm mt-2 text-gray-500 italic">Powered by TMDb</p>
                </div>
            )}

            {/* 🎥 Movie Detail Modal */}
            {selectedMovieId && (
                <MovieModal
                    movieId={selectedMovieId}
                    onClose={() => setSelectedMovieId(null)}
                />
            )}
        </div>
    );
}
