import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { onValue, ref, remove } from "firebase/database";

import { db } from "../firebase.js";
import "./movie-info.css";
import { FaPlay, FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import {
  MdAddToPhotos,
  MdOutlineCircle,
  MdDateRange,
  MdAccessTimeFilled,
  MdLibraryAddCheck
} from "react-icons/md";

import Header from "./Header.js";
import axios from "axios";
import { useAccount } from "../context/AccountProvider.js";
import { useAuth } from "../context/AuthProvider.js";
import Alert from "../components/Alert";
const MoveInfo = () => {
  const { type, id } = useParams();
  const { currentUser } = useAuth();
  const [isInWatch, setIsInWatch] = useState(false);
  const [isInFavorite, setIsInFavorite] = useState(false);
  const { addToWatchList, addToFavorite } = useAccount();
  const navigate = useNavigate();

  const [details, setDetails] = useState();
  const [casts, setCasts] = useState();
  const [recommend, setRecommend] = useState();
  const [loading, setLoading] = useState(true);

  const checkWatchList = async () => {
    if (!currentUser) {
      return navigate("/sign-in");
    }
    if (isInWatch) {
      const reference = ref(
        db,
        `users/${
          currentUser ? currentUser.uid : "undefiend"
        }/watchlist/${type}_${id}`
      );
      try {
        return remove(reference);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await addToWatchList({
        id: details.id,
        poster_path: details.poster_path,
        media_type: type
      });
      setIsInWatch(true);
      console.log("Sucsess Add");
    } catch (err) {
      console.log(`Error ${err}}`);
      console.log("details", JSON.stringify(details, null, 2));
    }
  };
  const checkFavorite = async () => {
    if (!currentUser) {
      return navigate("/sign-in");
    }
    if (isInFavorite) {
      const reference = ref(
        db,
        `users/${
          currentUser ? currentUser.uid : "undefiend"
        }/favorite/${type}_${id}`
      );
      try {
        remove(reference);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await addToFavorite({
        id: details.id,
        poster_path: details.poster_path,
        media_type: type
      });
      setIsInFavorite(true);
      console.log("Sucsess Add");
    } catch (err) {
      console.log(`Error ${err}}`);
      console.log("details", JSON.stringify(details, null, 2));
    }
  };
  const getYear = date => {
    if (date) {
      var Year = date.split("").slice(0, 4);
      return Year.join("");
    }
  };
  const getRate = vote => {
    var str = vote.toString();
    if (vote) {
      var arr = str.split("").slice(0, 3);
      return arr.join("");
    }
  };
  const getRuntime = time => {
    if (time) {
      return (time / 60).toString().split("").slice(0, 4).join("");
    }
  };
  useEffect(() => {
    setLoading(true);
    const detailsOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos,images`,
      params: { external_source: "imdb_id" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const castOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${type}/${id}/credits`,
      params: { external_source: "imdb_id" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const recommendOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`,
      params: { external_source: "imdb_id" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    /*if (lists.watchlist) {
      setIsInWatch(true);
    }*/
    const promise = [
      axios.request(detailsOptions).then(response => {
        setDetails(response.data);
      }),
      axios.request(castOptions).then(response => {
        setCasts(response.data.cast);
      })
    ];
    if (type === "tv" || type === "movie") {
      promise.push(
        axios
          .request(recommendOptions)
          .then(response => setRecommend(response.data.results))
      );
    }
    if (currentUser !== null) {
      promise.push(
        () => {
          const reference = ref(
            db,
            `users/${
              currentUser ? currentUser.uid : "undefiend"
            }/watchlist/${type}_${id}`
          );
          onValue(reference, snapshot => {
            return snapshot.exists() ? setIsInWatch(true) : setIsInWatch(false);
          });
        },
        () => {
          const reference = ref(
            db,
            `users/${
              currentUser ? currentUser.uid : "undefiend"
            }/favorite/${type}_${id}`
          );
          const data = onValue(reference, snapshot => {
            return snapshot.val()
              ? setIsInFavorite(true)
              : setIsInFavorite(false);
          });
        }
      );
    }
    Promise.all(promise)
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, [id, type]);
  useEffect(() => {
    if (currentUser !== null) {
      const reference = ref(
        db,
        `users/${
          currentUser ? currentUser.uid : "undefiend"
        }/watchlist/${type}_${id}`
      );
      const data = onValue(reference, snapshot => {
        console.log("snapshot.val(", JSON.stringify(snapshot.val(), null, 2));
        return snapshot.val() ? setIsInWatch(true) : setIsInWatch(false);
      });
    }
  }, [checkWatchList]);
  useEffect(() => {
    if (currentUser !== null) {
      const reference = ref(
        db,
        `users/${
          currentUser ? currentUser.uid : "undefiend"
        }/favorite/${type}_${id}`
      );
      const data = onValue(reference, snapshot => {
        return snapshot.val() ? setIsInFavorite(true) : setIsInFavorite(false);
      });
    }
  }, [checkFavorite]);

  return !loading ? (
    <>
      <div className="container mx-auto md:px-0">
        <div className="land relative px-[5px] md:px-0 h-[auto]">
          <img
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            className="w-full p-[24px 24px 16px 24px] h-[508px] md:h-[120vh] rounded-[9px]"
            alt="backdrop"
          />
          <div className="items w-[100%] absolute bottom-[30px] left-[50%] translate-x-[-50%] ">
            <div className="w-full flex flex-col items-center justify-center text-center my-[15px]">
              <p className="text-[32px] font-bold">
                {details.name ? details.name : details.title}
              </p>
              <p className="overview hidden md:block text-[14px] opacity-60 font-medium max-w-[800px] px-[20px] overflow-x-auto overflow-y-hidden max-h-[70px]">
                {details.overview}
              </p>
            </div>
            <div className="w-full flex flex-col md:flex-row md:justify-center items-center space-y-[20px] md:space-y-[0] md:space-x-[20px]">
              <button className="flex space-x-[6px] font-medium items-center justify-center bg-primaryRed w-[80%] md:w-auto py-[13px] text-[18px] rounded-[6px] md:px-[70px]">
                <FaPlay />
                <span>Watch</span>
              </button>
              <div className="flex space-x-[15px] items-center justify-center">
                {isInWatch ? (
                  <MdLibraryAddCheck
                    size="50px"
                    className={`bg-black  border-2
                    } ${
                      isInWatch ? `border-primaryRed ` : `border-grey `
                    } transition-[0.3s] rounded-[6px] p-[8px]`}
                    onClick={checkWatchList}
                    color="#E50000"
                  />
                ) : (
                  <MdAddToPhotos
                    size="50px"
                    className={`bg-black  border-2
                     ${
                       isInWatch ? `border-primaryRed ` : `border-grey `
                     } transition-[0.3s] rounded-[6px] p-[8px]`}
                    onClick={checkWatchList}
                  />
                )}
                <FaHeart
                  size="50px"
                  className={`bg-black border-2
                    ${
                      isInFavorite ? `border-primaryRed` : `border-grey`
                    } rounded-[6px] p-[8px] transition-[0.5s]`}
                  onClick={checkFavorite}
                  color={isInFavorite ? "#E50000" : "white"}
                />
                <div className="relative">
                  <MdOutlineCircle size="65px" width="300px" color="#E50000" />
                  <span className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-bold text-[16px]">
                    {getRate(details.vote_average)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse w-full px-[20px] my-[20px] md:px-0 gap-y-[20px] md:flex-row justify-between md:space-y-[0] md:space-x-[20px] items-start">
          {
            // Left Side
          }
          <div className=" md:flex-[1.7] space-y-[20px] rounded-[10px]  overflow-x-auto w-full">
            <div className="bg-primary_grey rounded-[10px] p-[30px]">
              <p className="text-grey ">Description</p>
              <p className="text-[15px] my-[10px]">{details.overview}</p>
            </div>
            <div className="bg-primary_grey rounded-[10px] p-[30px]">
              <p className="text-grey ">Casts</p>
              <div className="flex flex-auto gap-x-[40px] overflow-x-scroll mt-[10px]">
                {casts.map(actor => {
                  return (
                    <NavLink
                      to={`/search/person/${actor.id}`}
                      className="relative flex flex-col"
                      key={actor.name}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                        className="min-w-[150px] max-h-[150px] min-h-[150px] max-h-[150px] rounded-[100%]"
                        alt="backdrop"
                      />
                      <div className="text-center my-[10px]">
                        <p className="font-bold">{actor.name}</p>
                        <p className="text-[14px] font-medium text-grey">
                          {actor.character}
                        </p>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className="bg-primary_grey p-[20px] rounded-[10px]">
              {details.videos.results.map(data => {
                if (data.type === "Trailer") {
                  return (
                    <div
                      className="space-y-[10px] p-[10px] bg-primary_grey rounded-[10px]"
                      key={data.name}
                    >
                      <p className="font-bold">{data.name}</p>
                      <iframe
                        src={`https://www.youtube.com/embed/${data.key}`}
                        frameborder="0"
                        className="w-full h-[300px] rounded-[10px]"
                        title={data.key}
                      >
                        your browser dosen't suppprt this video
                      </iframe>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {
            // Right Side
          }
          <div className="flex flex-col space-y-[20px] bg-primary_grey rounded-[10px] p-[30px] md:flex-1 w-full">
            <div className="space-y-[5px]">
              <p className=" font-semibold text-grey">Relessed Year</p>
              <p className="font-bold flex space-x-[5px] items-center">
                <MdDateRange size="20px" />
                <span className="text-[24px]">
                  {getYear(details.release_date || details.first_air_date)}
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-grey">Director</p>
              {details.created_by && (
                <p className="font-bold my-[2px]">
                  {details.created_by[0] ? details.created_by[0].name : "-"}
                </p>
              )}
            </div>
            <div>
              <p className="text-grey font-semibold">Genres</p>
              <div className="flex flex-wrap my-[8px] gap-[12px]">
                {details.genres.map(c => {
                  return (
                    <div
                      className="px-[8px] py-[5px] bg-primary_black border-[1.5px] border-grey rounded-[6px]"
                      key={c}
                    >
                      {c.name && c.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="font-semibold text-grey">Rating</p>
              <p className=" flex gap-x-[5px] my-[5px] items-center">
                <FaStar size="20px" color="rgb(255,215,22)" />
                <span className="font-bold text-[24px]">
                  {getRate(details.vote_average)}
                </span>
              </p>
            </div>
            {type === "movie" && (
              <div>
                <p className="text-grey my-[5px] font-semibold">Runtime</p>

                <p className="font-bold text-[22px] flex space-x-[5px] items-center">
                  <MdAccessTimeFilled />
                  <span>{getRuntime(details.runtime)} h</span>
                </p>
              </div>
            )}
            <div>
              <p className="text-grey my-[5px] font-semibold">Content Type</p>
              <p className="font-bold text-[22px] capitalize">{type}</p>
            </div>
            <div>
              <p className="text-grey my-[5px] font-semibold">Status</p>
              <p className="font-bold text-[22px] capitalize">
                {details.status}
              </p>
            </div>
          </div>
          {
            // Bottom
          }
        </div>
        {recommend[0] && (
          <div className="mx-[20px] md:mx-[0] bg-primary_grey p-[30px]  rounded-[10px]">
            <p className="my-[10px] font-semibold text-grey">Recommend</p>
            <div class="space-x-[20px] flex overflow-scroll ">
              {recommend.map(data => {
                return (
                  <NavLink
                    to={`/search/${data.media_type}/${data.id}`}
                    className="h-[250px] min-w-[150px] relative"
                    key={data.id}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                      className="w-full h-full rounded-[6px]"
                      alt="poster"
                    />
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    "wait ..."
  );
};

export default MoveInfo;
