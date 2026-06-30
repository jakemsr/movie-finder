import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const doSearch = () => {
    const trimmedText = searchText.trim();
    if (trimmedText.length === 0) {
      // error, do not search
    } else {
      navigate(`/movies/${trimmedText}/1`)
    }
  }

  return (
    <>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5 px-2 text-center">
        Explore Your Passion for Cinema With
        <div className="font-extrabold font-bebas italic text-6xl sm:text-7xl lg:text-8xl mt-7">
          <span className="text-purple-800"><span className="text-7xl sm:text-8xl lg:text-9xl">M</span>ovie</span>
          &nbsp;
          <span className="text-orange-500"><span className="text-7xl sm:text-8xl lg:text-9xl">F</span>inder</span>
        </div>
      </div>
      <div id="search" className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-7">
        <input
          type="text"
          name="searchText"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={e => {e.key === 'Enter' && doSearch()}}
          placeholder="Enter words to find in movie titles"
          className="w-2xs text-center px-4 py-2 border-2 border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
        />
        <button
          className="px-6 py-2 rounded-full bg-purple-800 text-white hover:cursor-pointer hover:scale-105 active:scale-95 transition duration-250"
          onClick={doSearch}
        >
          Search
        </button>
      </div>
      <img
        src="https://res.cloudinary.com/dfh81vhxi/image/upload/f_webp/q_auto:best/cs_tinysrgb/dpr_auto/film-strips_ou4kft.png"
        alt="Film strips in the background"
        className="z-[-1] max-w-4/5 justify-self-center mt-4" />
    </>
  )
}

export default Home
