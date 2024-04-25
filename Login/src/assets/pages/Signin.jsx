import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://contact-app-server-nxgi.onrender.com/api/v1/contactapp";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const signInData = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post(`${API}/auth/signin`, signInData);
      console.log("Signin Success:", response.data);
      setIsLoggedIn(true); 
    } catch (err) {
      console.error("Signin Error:", err.message);
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setErrorMessage("Invalid username or incorrect password");
            break;
          default:
            setErrorMessage(
              "User not found. Please check your username and try again."
            );
        }
      } else {
        setErrorMessage(
          "Network error. Please check your connection and try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center pt-10 gap-3 text-2xl">
        <span className=" font-semibold ">THANK YOU!!</span>
        <span className="text-[blue] font-semibold ">
          YOU HAVE SUCCESSFULLY LOGGED IN.!!
        </span>
        <span className="text-xl">
          Please click the button below to return to the homepage
        </span>
        <button className="py-3 px-9 bg-sky-500 text-black font-bold rounded-2xl hover:bg-[#0b8bb2] transition-all duration-500">
          <Link to="/">GO TO HOME</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center  bg-[#405a54]">
      <h1 className="mb-8 font-bold text-3xl">LOGO HERE</h1>
      <div className=" flex flex-col items-center justify-center py-5 w-[70%] h-[60%] lg:w-[40%] lg:h-[60%] bg-[#613d64] rounded-3xl">
        <h1 className="text-2xl font-medium mb-7">SIGN IN</h1>
        <form className="flex flex-col gap-6 w-full px-6 lg:px-10 ">
          <input
            type="text"
            placeholder="Email"
            className="py-3 px-3 rounded-lg hover:shadow-md bg-[#fdfdfd] hover:bg-[#393639] hover:text-[white]  transition-all duration-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="py-3 px-3 rounded-lg hover:shadow-md bg-[#fdfdfd] hover:bg-[#393639] hover:text-[white]  transition-all duration-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-[#ea3b35]">{errorMessage}</p>
          )}
        </form>
        <button
          className={`w-[40%] mt-5 py-2  text-[#1f1f23] font-bold rounded-lg mb-4 bg-indigo-600 hover:bg-indigo-700 hover:text-[white] transition-all duration-500`}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>
        <Link to="/forget" className="mb-2">
          Forget Password?
        </Link>
        <div className="flex gap-2">
          <p>Don't have an account?</p>
          <Link to="/" className="text-[#ea3547] font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
