import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
import Search from "./components/Search";
import Spinner from "./Spinner";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

function App() {
  const [SearchItem, setSearchItem] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchItem(SearchItem), 1000, [SearchItem]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!ACCESS_TOKEN) {
        throw new Error(
          "Access Token missing! Please check environment variables."
        );
      }

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fetch failed: ${errorText}`);
      }

      const data = await response.json();
      console.log(data);

      if (!data.results) {
        setErrorMessage("No movies found.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log("error fetching trending movies");
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchItem);
  }, [debouncedSearchItem]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#52529b] to-black">
      <Header />
      <Search SearchItem={SearchItem} setSearchItem={setSearchItem} />

      {trendingMovies.length > 0 && (
        <section className="w-full max-w-5xl mx-auto px-4 py-8">
          <h1 className="font-extrabold mb-0 text-2xl text-white">
            Trending Movies
          </h1>
          <ul className="flex overflow-x-auto mt-5 space-x-4 scrollbar-hide snap-x snap-mandatory touch-auto">
            {trendingMovies.map((movie, index) => (
              <li
                key={movie.$id}
                className="flex-shrink-0 md:w-48 w-30 snap-center"
              >
                <img
                  src={movie.Poster_url}
                  alt={movie.title}
                  className="rounded-2xl object-cover w-full h-auto hover:scale-105 transition-transform"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <h1 className=" font-extrabold text-2xl text-white mb-4">All Movies</h1>

        {isLoading ? (
          <Spinner />
        ) : ErrorMessage ? (
          <p className="text-red-500">{ErrorMessage}</p>
        ) : (
          <ul
            className="
            grid
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
            gap-4
            rounded-2xl
            
          "
          >
            {MovieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
