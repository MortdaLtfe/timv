import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Header from "./pages/Header";
import Search from "./pages/Search";
import ShowsInfo from "./pages/ShowsInfo";
import PersonInfo from "./pages/PersonInfo";
import SideBar from "./components/SideBar";
import BottomBar from "./components/BottomBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import WatchList from "./pages/WatchList.js";
import Favorite from "./pages/Favorite";
import ForgotPassword from "./pages/ForgotPassword";
import Edit from "./pages/Edit";
import AuthRequireProvider from "./context/AuthRequireProvider";
import AccountProvider from "./context/AccountProvider";
const App = () => {
  return (
    <>
      <Header />
      <div className="flex items-start justify-start max-w-full overflow-y-scroll overflow-x-auto ">
        <SideBar />

        <Routes className="max-h-[80vh] overflow-y-scroll overflow-x-auto">
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:type/:id" element={<ShowsInfo />} />
          <Route path="/search/person/:id" element={<PersonInfo />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/profile"
            element={
              <AuthRequireProvider>
                <Profile />
              </AuthRequireProvider>
            }
          />
          <Route path="/list">
            <Route
              path="watch-list"
              element={
                <AuthRequireProvider>
                  <WatchList />
                </AuthRequireProvider>
              }
            />
            <Route
              path="favorite"
              element={
                <AuthRequireProvider>
                  <Favorite />
                </AuthRequireProvider>
              }
            />
          </Route>
          <Route path="/profile/edit" element={<Edit />} />
          <Route path="/sign-in" element={<SignIn />} />

          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
      <BottomBar />
    </>
  );
};

export default App;
