import { useState, useEffect, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logOut,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../firebase";
import { set, ref, onValue } from "firebase/database";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    const displayName = "";
    return createUserWithEmailAndPassword(auth, email, password).then(data => {
      const reference = ref(db, `users/${data.user.uid}/`);
      return set(reference, {
        email,
        uid: data.user.uid,
        displayName: data.user?.displayName || displayName,
        photoURL: data.user?.photoURL || ""
      });
    });
  };
  const signOut = () => {
    return logOut(auth);
  };
  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };
  const editName = displayName => {
    return updateProfile(auth.currentUser, { displayName }).then(() => {
      const reference = ref(db, `users/${currentUser.uid}/displayName`);
      return set(reference, displayName);
    });
  };
  const editEmail = email => {
    return updateEmail(auth.currentUser, email)
      .then(() => {
        const reference = ref(db, `users/${currentUser.uid}/email`);
        return set(reference, email);
      })
      .catch(err => {
        console.log("err", JSON.stringify(err, null, 2));
      });
  };
  const editPassword = password => {
    return updatePassword(auth.currentUser, password).catch(err =>
      console.log("err", JSON.stringify(err, null, 2))
    );
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const reference = ref(db, `users/${user.uid}/`);
        const data = onValue(reference, snapshot => {
          console.log("user", JSON.stringify(user, null, 2));
          setCurrentUser(user);

          console.log("currentUser", JSON.stringify(currentUser, null, 2));
          return setLoading(false);
        });
      }
      setCurrentUser(user);
      return setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn,
        signUp,
        signOut,
        resetPassword,
        editName,
        editEmail,
        editPassword
      }}
    >
      {!loading ? children : "loading"}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
