import Search from "./Search";
import movieLogo from "../assets/movie2.png";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center mb-2">
        <img
          src={movieLogo}
          className="w-50 mt-6 mb-5 border-[0rem] border-[#4a5568] p-3 rounded-4xl"
        />
      </div>
      <div className=" flex justify-center text-3xl sm:text-3xl md:text-4xl text-white text-center px-2 ">
        Find&nbsp;<strong>Movies</strong>&nbsp;with Ease
      </div>
    </div>
  );
}
