import axios, { type AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Reel from "../components/Reel";


interface omdbTitle {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

const Title = () => {
  const { imdbId } = useParams();
  const [loadingTitle, setLoadingTitle] = useState<boolean>(true);
  const [title, setTitle] = useState<omdbTitle>();
  const navigate = useNavigate();

  async function getTitle(): Promise<void> {
    setLoadingTitle(true);
    const requestURL = `https://www.omdbapi.com/?apikey=76dbaf2b&type=movie&r=json&plot=long&i=${imdbId}`;
    const response: AxiosResponse<omdbTitle> = await axios.get<omdbTitle>(requestURL);
    setTitle(response.data);
    setLoadingTitle(false);
  }

  useEffect(() => {
    getTitle();
  }, [])

  return (
    <>
      <button
        className="mx-16 md:mx-24 px-6 py-2 rounded-full bg-purple-800 text-white hover:cursor-pointer hover:scale-105 active:scale-95 transition duration-250"
        onClick={() => navigate(-1)}
      >
        &lt;- Back to Movies
      </button>
      <div className="flex justify-center w-full ">
        {loadingTitle ? (
          <div className="mt-20">
            <Reel />
          </div>
        ) : (
          title ? (
            <div className="flex flex-col sm:flex-row gap-4 mt-2 p-2 bg-gray-200 border-2 border-purple-800 rounded-2xl shadow-2xl shadow-orange-500">
              <div className="w-64 md:w-80 lg:w-96">
                <img
                  src={title.Poster}
                  className="w-full"
                  onError={(e) => {
                    e.currentTarget.src = '/no_img.svg';
                    e.currentTarget.onerror = null;
                  }}
                  alt="" />
              </div>
              <div className="flex flex-col w-64 md:w-80 lg:w-96 gap-2">
                <div>
                  <span className="font-bold">
                    Title:<br />
                  </span>
                  {title.Title}
                </div>
                <div>
                  <span className="font-bold">
                    Year:<br />
                  </span>
                  {title.Year}
                </div>
                <div>
                  <span className="font-bold">
                    Genre:<br />
                  </span>
                  {title.Genre}
                </div>
                <div>
                  <span className="font-bold">
                    Starring:<br />
                  </span>
                  {title.Actors}
                </div>
                <div>
                  <span className="font-bold">
                    Ratings:<br />
                  </span>
                  {title.Ratings.length > 0 ? (
                    <ul className="list-none">
                      {title.Ratings.map(((rating, index) => (<li key={index}>{rating.Source}: {rating.Value}</li>)))}
                    </ul>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div>
                  <span className="font-bold">
                    Runtime:<br />
                  </span>
                  {title.Runtime}
                </div>
                <div>
                  <span className="font-bold">
                    Plot:<br />
                  </span>
                  {title.Plot}
                </div>
              </div>
            </div>
          ) : (
            <span>Title not found!</span>
          )
        )}
      </div>
    </>
  )
}

export default Title
