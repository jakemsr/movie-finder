import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="justify-self-center h-20 w-full px-5 sm:max-w-4/5 flex justify-between items-center">
      <Link to="/">
        <img src="/movie-finder-light.png" alt="Movie Finder" height="25" width="140" />
      </Link>
      <div className="flex gap-2 sm:gap-4">
        <Link to="/">Home</Link>
        <div className="bg-purple-800 rounded-full px-3 py-1 text-sm text-white hover:scale-105 active:scale-95 transition duration-300">
          <a href="mailto:jakemsr@yahoo.com">Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
