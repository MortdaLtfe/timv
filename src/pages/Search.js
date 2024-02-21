import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const searchOption = {
      method: "get",
      url: `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
      }
    };
    const unsubscribe = ()=>axios
      .request(searchOption)
      .then(res => {
        setResults(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
    return ()=>{
      unsubscribe()
    }
  }, [search]);
  return (
    <div className="container mx-auto max-w-[90%]  md:max-w-[600px] ">
      <div className="relative mx-auto  h-[45px] ">
        <input
          className="min-w-full min-h-full rounded-[6px] bg-[rgb(63,63,63)] outline-0 indent-[35px]"
          onChange={e => setSearch(e.target.value)}
        />
        <IoSearch
          className="absolute top-[50%] left-[20px] translate-x-[-50%] translate-y-[-50%]"
          size="20px"
        />
      </div>
      <div className="space-y-[20px]">
        {results &&
          results.map(data => {
            if (data.media_type !== "person") {
              return (
                <NavLink
                  to={`/search/${data.media_type}/${data.id}`}
                  className="flex max-w-[600px] bg-primary_grey space-x-[10px] p-[5px]"
                >
                  <div className="min-w-[120px] max-w-[120px] max-h-[175px] min-h-[175px]">
                    <img
                      src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                      className="w-full h-full rounded-[6px] object-fill"
                    />
                  </div>
                  <div className="space-y-[10px] py-[10px]">
                    <p className="text-[20px] font-bold">
                      {data.name || data.title}
                    </p>
                    <div className="space-y-[3px]">
                      <p className="font-[500] text-grey text-[18px] capitalize">
                        {data.media_type}
                      </p>
                    </div>
                    <div className="font-semibold text-[18px] text-grey">
                      {data.release_date || data.first_air_date}
                    </div>
                  </div>
                </NavLink>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Search;
