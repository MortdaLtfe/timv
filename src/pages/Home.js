import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(true);

  const [popular, setPopular] = useState();
  const [tvPopular, setTvPopular] = useState();
  const [upcoming, setUpcoming] = useState();
  const [trending, setTrending] = useState();

  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [tvPopularPage, setTvPopularPage] = useState(1);
  useEffect(() => {
    setIsFetch(true);
    const PopularOptions = {
      url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${popularPage}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const UpcomingOptions = {
      url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${upcomingPage}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const TvPopularOptions = {
      url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${tvPopularPage}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const TrendingOptions = {
      url: `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };

    const promies = [
      axios
        .request(PopularOptions)
        .then(res =>
          popular
            ? setPopular([...popular, ...res.data.results])
            : setPopular(res.data.results)
        ),
      axios
        .request(UpcomingOptions)
        .then(res =>
          upcoming
            ? setUpcoming([...upcoming, ...res.data.results])
            : setUpcoming(res.data.results)
        ),
      axios
        .request(TvPopularOptions)
        .then(res =>
          tvPopular
            ? setTvPopular([...tvPopular, ...res.data.results])
            : setTvPopular(res.data.results)
        ),
      axios.request(TrendingOptions).then(res => setTrending(res.data.results))
    ];
    Promise.all(promies)
      .then(() => setLoading(false))
      .then(() => setIsFetch(false))
      .catch(err => console.log(err));
  }, [upcomingPage, tvPopularPage, popularPage]);
  return loading ? (
    "wait ..."
  ) : (
    <div className="overflow-auto w-full">
      {/* Landing / Hero Section */}
      <div className="w-full h-[70vh] md:h-[100vh] relative hero">
        <img src="/images/landing.jpg" className="w-full h-full" />
        <div className="absolute bottom-[20px] left-[50%] translate-x-[-50%] text-center w-full max-w-[900px] px-[10px]">
          <p className="font-black text-[32px] md:text-[44px]">
            <span className="text-primaryRed">Timv</span> is All in One
          </p>
          <p className="text-[14px] md:text-[20px] text-grey">
            Timv is web application that give you an informations about your
            Movie, Tv shows, Persons With Cool Functions to make things easy
          </p>
        </div>
      </div>
      {/* Geners*/}

      <div className="p-[20px] my-[20px] space-y-[20px] m-[10px] bg-primary_grey rounded-[10px]">
        <div className="trending">
          <p className="my-[10px] font-black text-[24px]">Trending ></p>
          <div className="flex flex-nowrap overflow-scroll space-x-[25px] items-center">
            {!isFetch &&
              trending.map(data => (
                <NavLink
                  to={`/search/${data.media_type}/${data.id}`}
                  className="h-[300px] min-w-[200px]"
                >
                  <img
                    className="w-full h-full rounded-[10px]"
                    src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  />
                </NavLink>
              ))}
          </div>
        </div>
        <div className="movie-popular">
          <p className="my-[10px] font-black text-[24px]">Popular Movies ></p>
          <div className="flex flex-nowrap overflow-scroll space-x-[25px] items-center">
            {!isFetch &&
              popular.map(movie => (
                <NavLink
                  to={`/search/movie/${movie.id}`}
                  className="h-[300px] min-w-[200px]"
                >
                  <img
                    className="w-full h-full rounded-[10px]"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </NavLink>
              ))}
            <div
              className="min-w-[100px] min-h-[100px] text-center rounded-[50%] bg-primary_grey flex items-center justify-center"
              onClick={() => setPopularPage(popularPage + 1)}
            >
              <span>More</span>
            </div>
          </div>
        </div>
        <div className="movie-upcoming">
          <p className="my-[10px] font-black text-[24px]">Upcoming Movies ></p>
          <div className="flex flex-nowrap overflow-scroll space-x-[25px] items-center">
            {!isFetch &&
              upcoming.map(movie => (
                <NavLink
                  to={`/search/movie/${movie.id}`}
                  className="h-[300px] min-w-[200px]"
                >
                  <img
                    className="w-full h-full rounded-[10px]"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </NavLink>
              ))}
            <div
              className="min-w-[100px] min-h-[100px] text-center rounded-[50%] bg-primary_grey flex items-center justify-center"
              onClick={() => setUpcomingPage(upcomingPage + 1)}
            >
              <span>More</span>
            </div>
          </div>
        </div>
        <div className="tv-popular">
          <p className="my-[10px] font-black text-[24px]">Popular Tv Shows ></p>
          <div className="flex flex-nowrap overflow-scroll space-x-[25px] items-center">
            {!isFetch &&
              tvPopular.map(movie => (
                <NavLink
                  to={`/search/tv/${movie.id}`}
                  className="h-[300px] min-w-[200px]"
                >
                  <img
                    className="w-full h-full rounded-[10px]"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  />
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
