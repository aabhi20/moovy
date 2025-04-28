export default function Search({ SearchItem, setSearchItem }) {
  return (
    <div className="flex justify-center items-center mt-6 px-4 w-full">
      <div className="relative text-[1.4rem] p-4 border rounded-2xl border-[#4a5568] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <input
          type="text"
          placeholder="Search movies"
          className="pl-10 outline-0 text-white w-full"
          value={SearchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
