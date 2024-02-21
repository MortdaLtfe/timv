import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const PersonInfo = () => {
  // https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [images, setImages] = useState();
  const [works, setWorks] = useState();
  useEffect(() => {
    setLoading(true);
    const detailOptions = {
      method: "get",
      url: `https://api.themoviedb.org/3/person/${id}`,
      params: { external_source: "imdb_id" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };

    const workOptions = {
      method: "get",
      //
      url: `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
      params: { external_source: "imdb_id" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const promise = [
      axios.request(detailOptions).then(res => setDetails(res.data)),
      axios.request(workOptions).then(res => setWorks(res.data.cast))
    ];

    Promise.all(promise)
      .then(() => setLoading(false))
      .then(() => console.log("works", JSON.stringify(works, null, 2)))
      .catch(err => console.log(err));
  }, []);

  return !loading ? (
    <div className="container mx-auto overflow-x-auto">
      <div>
        <div className="flex flex-col md:flex-row md:h-[100vh] items-center justify-between w-full justify-center px-[20px] md:px-[0] ">
          <div className="flex items-center justify-center flex-col md:flex-row md:items-center md:justify-center w-full  md:space-x-[20px]">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-[15px] md:items-start md:justify-start">
              <div className="flex justify-center items-center md:flex-[0.5]">
                <img
                  src={
                    details.profile_path
                      ? `https://image.tmdb.org/t/p/original${details.profile_path}`
                      : "/images/unknown-profile.jpg"
                  }
                  className="h-[400px] rounded-[12px]"
                />
              </div>
              <div className="max-w-[600px] md:flex-[1] flex flex-col w-full md:w-auto items-start justify-start bg-primary_grey my-[15px] md:my-0 p-[20px] rounded-[10px] space-y-[10px]">
                <div className="space-y-[5px]">
                  <p className="font-semibold text-grey space-x-[3px] flex items-center">
                    <FaUser size="18px" /> <span>Name</span>
                  </p>
                  <p className="font-bold text-[20px]">{details.name}</p>
                </div>
                <div className="space-y-[5px]">
                  <p className="font-semibold text-grey flex items-center space-x-[3px] ">
                    <MdDateRange size="20px" /> <span>Birthday</span>
                  </p>
                  <p className="font-bold text-[20px]">
                    {details.birthday ? details.birthday : "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-grey font-semibold">Other Names</p>
                  <div className="flex flex-wrap gap-[12px] my-[5px] w-full">
                    {details.also_known_as
                      ? details.also_known_as.map(name => (
                          <p className="px-[8px] py-[5px] bg-primary_black border-[1.5px] border-grey rounded-[6px]">
                            {name}
                          </p>
                        ))
                      : "Empty"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-nowrap overflow-x-scroll bg-primary_grey rounded-[10px] p-[20px] mx-[20px] my-[5px] space-x-[20px]">
          {works &&
            works.map(work => (
              <NavLink
                to={`/search/${work.media_type}/${work.id}`}
                className="h-[250px] min-w-[150px]"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${work.poster_path}`}
                  className="w-full h-full rounded-[6px]"
                />
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  ) : (
    "wait"
  );
};

export default PersonInfo;
