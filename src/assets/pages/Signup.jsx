import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://contact-app-server-nxgi.onrender.com/api/v1/contactapp";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); 
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {}; 

    if (!username.trim()) {
      errors.username = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      errors.username = "Please enter a valid email address.";
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors); 
    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    setIsSubmitting(true);

    const signUpData = {
      email: username,
      password,
      confirmPassword,
      fullName,
    };

    try {
      const response = await axios.post(`${API}/auth/signup`, signUpData);
      console.log("Signup Success:", response.data);
      setErrorMessage("You Have Successfully Registered!!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setFormErrors({
        username: "",
        password: "",
        confirmPassword: "",

      }); 
    } catch (err) {
      console.error("Signup Error:", err.message);
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {errorMessage ? (
        <div className="flex flex-col items-center pt-10 gap-3 text-2xl">
          <span className="text-[yellow] font-semibold ">
            You Have Successfully Registered!!
          </span>
          <span>
            Click on the button below to Continue to the Sign In page to Log in
          </span>
          <button className="py-3 px-9 bg-sky-900 text-black font-bold rounded-2xl">
            <Link to="/signin">Sign in</Link>
          </button>
        </div>
      ) : (
        <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-[rgb(0,255,132)]">
          <h1 className="mb-8 font-bold text-3xl">REGISTER HERE</h1>
          <div className="flex flex-col items-center justify-center py-5 w-[70%] h-[80%] lg:w-[40%] lg:h-[80%] bg-[#ebe8ec] rounded-3xl">
            <h1 className="text-2xl font-medium mb-7">SIGN UP</h1>
            <form
              className="flex flex-col gap-6 w-full px-6 lg:px-10"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="py-3 px-3 rounded-lg hover:shadow-md bg-[#fdfdfd] hover:bg-[#393639] hover:text-[white] transition-all duration-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
             
              <input
                type="text"
                placeholder="Email"
                className={`py-3 px-3 rounded-lg hover:shadow-md bg-[#fdfdfd] hover:bg-[#393639] hover:text-[white] transition-all duration-500 ${
                  formErrors.username ? "border border-red-500" : ""
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {formErrors.username && (
                <span className="text-red-500 text-sm">
                  {formErrors.username}
                </span>
              )}{" "}
        
              <input
                type="password"
                placeholder="Password"
                className="py-3 px-3 rounded-lg hover:shadow-md bg-[#fdfdfd] hover:bg-[#393639] hover:text-[white] transition-all duration-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && (
                <span className="text-red-500 text-sm">
                  {formErrors.password}
                </span>
              )}{" "}
              
              <input
                type="password"
                placeholder="Confirm Password"
                className="py-3 px-3 rounded-lg hover:shadow-md bg-[#fdfdfd] hover:bg-[#393639] hover:text-[white] transition-all duration-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {formErrors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {formErrors.confirmPassword}
                </span>
              )}
            </form>
            <button
              className={`py-2 text-xl text-[#333442] font-bold rounded-lg mt-5 bg-indigo-600 hover:bg-indigo-700 hover:text-[black] w-[40%] lg:w-[40%] transition-all duration-500`}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
            <p className="flex pt-3 gap-2">
              Already registered?
              <span className="text-[#ea3547] font-semibold">
                <Link to="/signin">Sign In</Link>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
