import { useState, useEffect, useContext, createContext } from "react";
import { db } from "../firebase.js";
import {
  set,
  ref,
  onValue,
  onChildAdded,
  onChildRemoved,
  
} from "firebase/database";
import { useAuth } from "./AuthProvider";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [watchlist, setWatchlist] = useState();
  const [favorite, setFavorite] = useState();
  const addToWatchList = data => {
    if (currentUser) {
      const reference = ref(
        db,
        `users/${currentUser.uid}/watchlist/${data.media_type}_${data.id}`
      );
      return set(reference, {
        id: data.id,
        poster_path: data.poster_path,
        media_type: data.media_type
      });
    }
  };
  const addToFavorite = data => {
    if (currentUser) {
      const reference = ref(
        db,
        `users/${currentUser.uid}/favorite/${data.media_type}_${data.id}`
      );
      return set(reference, {
        id: data.id,
        poster_path: data.poster_path,
        media_type: data.media_type
      });
    }
  };
  useEffect(() => {
    const reference = ref(db, `users/${currentUser?.uid || ""}/watchlist`);
    return onValue(reference, snapshot => {
      try {
        setWatchlist(snapshot.val() && Object.values(snapshot.val()));
      } catch (err) {
        console.log(err);
      }
    });
  }, [currentUser]);

  useEffect(() => {
    const reference = ref(db, `users/${currentUser?.uid || ""}/favorite/`);
    return onValue(reference, snapshot => {
      try {
        setFavorite(snapshot.val() && Object.values(snapshot.val()));
      } catch (err) {
        console.log(err);
      }
    });
  }, [currentUser]);

  return (
    <AccountContext.Provider
      value={{
        addToFavorite,
        addToWatchList,
        watchlist,
        favorite
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
export const useAccount = () => {
  return useContext(AccountContext);
};
