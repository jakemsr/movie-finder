import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import Reel from "../components/Reel";

interface omdbSearchTitle {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface omdbSearch {
  Response: string;
  Search: omdbSearchTitle[];
  totalResults: string;
}

const Movies = () => {

  const { searchText, page } = useParams();

  // useParam parameters are type string | undefined, get a number
  let pageNum: number;
  if (page === undefined) {
    pageNum = 1;
  } else {
    pageNum = parseInt(page);
  }

  if (searchText === undefined) {
    // this should never happen, already checked for empty params before submission
    return;
  }

  // remove extra spaces, could break search
  const searchWords = searchText.trim().split(" ").filter((word) => word !== "");
  const cleanSearchText = searchWords.join(" ");

  // pretty print the array of words to search for
  const wordList = (): string => {
    let ret = searchWords.length === 1 ? "word " : "words ";
    for (let i = 0; i < searchWords.length; i++) {
      ret += `"${searchWords[i]}"`
      if (searchWords.length > 1) {
        if (i < searchWords.length - 1 && searchWords.length > 2) {
          ret += ", "
        }
        if (i === searchWords.length - 2) {
          ret += " and "
        }
      }
    }
    return ret;
  }

  const [loadingMovies, setLoadingMovies] = useState<boolean>(true);
  const [movies, setMovies] = useState<omdbSearchTitle[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const navigate = useNavigate();

  async function getMovies(searchPage: number): Promise<void> {
    setLoadingMovies(true);
    const requestURL = `https://www.omdbapi.com/?apikey=76dbaf2b&type=movie&r=json&page=${searchPage}&s=${cleanSearchText}`;
    const response: AxiosResponse<omdbSearch> = await axios.get<omdbSearch>(requestURL);
    setMovies(response.data.Search);
    setLoadingMovies(false);
    setTotalResults(parseInt(response.data.totalResults));
  }

  const nextPage = () => {
    navigate(`/movies/${cleanSearchText}/${pageNum + 1}`)
  }

  const prevPage = () => {
    navigate(`/movies/${cleanSearchText}/${pageNum - 1}`)
  }

  useEffect(() => {
    getMovies(pageNum);
  }, [pageNum]);

  return (
    <div>
      <div className="text-center text-2xl md:text-4xl font-semibold mb-2 px-4">
        Movies with the {wordList()} in the title.
      </div>
      {loadingMovies ? (
        <div className="flex w-full justify-center mt-20">
          <Reel />
        </div>
      ) : (
        <>
          <div className="text-center px-5 py-2">
            Found {totalResults} movies. Showing 10 movies per page.
          </div>
          <div className="flex justify-between justify-self-center items-center w-full max-w-4/5">
            <div>
              {pageNum > 1 ? (
                <button
                  onClick={prevPage}
                  className="text-nowrap bg-purple-800 rounded-full px-6 py-1 text-sm text-white hover:cursor-pointer hover:scale-105 active:scale-95 transition duration-300">
                  &lt;- prev page
                </button>
              ) : (
                <button className="text-nowrap text-white">hidden for spacing</button>
              )}
            </div>
            <div className="text-center">
              Page {pageNum}
            </div>
            <div>
              {pageNum * 10 < totalResults ? (
                <button
                  onClick={nextPage}
                  className="text-nowrap bg-purple-800 rounded-full px-6 py-1 text-sm text-white hover:cursor-pointer hover:scale-105 active:scale-95 transition duration-300">
                  next page -&gt;
                </button>
              ) : (
                <button className="text-nowrap text-white">hidden for spacing</button>
              )}
            </div>
          </div>
          <div className="flex justify-center w-full mt-6">
            <div className="flex flex-wrap justify-around max-w-4/5">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-40 md:w-52 p-2 m-2 bg-gray-200 border-2 border-purple-800 rounded-2xl shadow-2xl shadow-orange-500 hover:cursor-pointer"
                  onClick={() => navigate(`/title/${movie.imdbID}`)}
                >
                  <img
                    src={movie.Poster}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = '/no_img.svg';
                      e.currentTarget.onerror = null;
                    }}
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    {movie.Title}
                    <br />
                    {movie.Year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Movies
