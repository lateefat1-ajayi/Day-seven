import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";




export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const removeFavorite = (movie) => {
    const updated = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">⭐ My Favorite Movies</h2>
      {favorites.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={removeFavorite}
              isFavorite={true}
              onOpenModal={setSelectedMovieId}
              genreMap={genreMap}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-12">No favorites added yet.</p>
      )}

      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}
