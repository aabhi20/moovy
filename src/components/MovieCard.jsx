import React from "react";

export default function MovieCard({
  movie: { title, vote_average, poster_path, release_date, original_name },
}) {
  return (
    <div className="w-full h-full p-2">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform"
        alt={title || original_name}
      />

      <div className="mt-2">
        <p className="text-white font-semibold text-sm truncate">
          {title || original_name}
        </p>

        <div className="flex items-center gap-10 md:gap-20 lg:gap-30 mt-1 text-sm text-gray-300">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fbbf24"
              viewBox="0 0 24 24"
              strokeWidth={0.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>

            <p>{Math.floor(vote_average * 10) / 10}</p>
          </div>
          <div>
            <p className="text-xs">{release_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
