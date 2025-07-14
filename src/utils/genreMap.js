export const fetchGenreMap = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  );
  const data = await res.json();
  const map = {};
  data.genres.forEach((genre) => {
    map[genre.id] = genre.name;
  });
  return map;
};
