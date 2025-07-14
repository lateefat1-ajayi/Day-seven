const imageBase = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onFavorite, isFavorite, onOpenModal, genreMap = {} }) {
  const genres = movie.genre_ids?.map((id) => genreMap[id]).filter(Boolean) || [];

  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden max-w-[250px] mx-auto flex flex-col">
      <div
        className="relative h-[375px] w-full cursor-pointer"
        onClick={() => onOpenModal(movie.id)}
      >
        <img
          src={movie.poster_path ? `${imageBase}${movie.poster_path}` : "/no-image.png"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* ⭐ Rating Badge */}
        {movie.vote_average > 0 && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded shadow">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
          <p className="text-sm text-gray-400">
            {movie.release_date?.split("-")[0] || "N/A"}
          </p>

          {/* 🏷️ Genre Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="bg-gray-700 text-gray-200 text-xs px-2 py-0.5 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onFavorite(movie)}
          className={`mt-3 px-3 py-1 text-sm font-medium rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-yellow-500 text-black"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
