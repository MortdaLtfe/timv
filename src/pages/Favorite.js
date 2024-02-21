import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, remove } from "firebase/database";
import { useAccount } from "../context/AccountProvider";
import { useAuth } from "../context/AuthProvider";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineBookmarkRemove } from "react-icons/md";
const Favorite = () => {
  const { currentUser } = useAuth();
  const { favorite } = useAccount();
  const Navigate = useNavigate();
  const handelDelete = async (id, type) => {
    const reference = ref(
      db,
      `users/${currentUser.uid}/favorite/${type}_${id}`
    );
    try {
      await remove(reference);
    } catch (err) {
      console.log(err);
    }
  };
  return favorite ? (
    <div className="container mx-auto">
      <div className="grid justify-center grid-cols-none md:grid-cols-3 gap-y-[20px] md:gap-x-[15px] gap-y-[15px]">
        {favorite &&
          favorite.map(data => (
            <div className="w-[300px] h-[400px] md:w-[270px]  md:h-[370px] relative lists overflow-hidden  rounded-[6px]">
              <div className="overlay w-full h-full absolute"></div>
              <img
                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                className="h-full w-full"
              />

              <div className="flex absolute bottom-[10px] left-[50%] translate-x-[-50%] options space-x-[10px]">
                <MdOutlineBookmarkRemove
                  size="40px"
                  onClick={() => handelDelete(data.id, data.media_type)}
                />
                <IoLogOutOutline
                  size="40px"
                  onClick={() =>
                    Navigate(`/search/${data.media_type}/${data.id}`)
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div className="h-[100vh] w-full relative flex items-center justify-center">
      <img
        src="/images/empty.png"
        className="h-[460px] rouned-[60px] opacity-40 mx-auto"
      />
    </div>
  );
};

export default Favorite;
