import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LayoutPage from "./pages/LayoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserFromTokenThunk } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  axios.defaults.baseURL = "http://localhost:7878/";
  axios.defaults.withCredentials = true;

  const fetchUserFromToken = async () => {
    console.log("- - - - - - - - - - - -");
    console.log("Fetching user details from token");
    try {
      const resultAction = await dispatch(fetchUserFromTokenThunk()).unwrap();
    } catch (error) {
      console.log("Error in fetchUserFromToken() in App.jsx");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserFromToken();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
