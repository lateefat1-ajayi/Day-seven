import { useEffect, useState } from "react";

const imageBase = "https://image.tmdb.org/t/p/w500";

export default function MovieModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 text-white max-w-2xl w-full rounded-xl shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={
              movie.poster_path
                ? `${imageBase}${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-3">{movie.release_date}</p>
            <p className="mb-3">{movie.overview}</p>
            <p><span className="font-semibold">Rating:</span> ⭐ {movie.vote_average}/10</p>
            <p>
              <span className="font-semibold">Genres:</span>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
