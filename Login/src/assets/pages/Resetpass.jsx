import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "https://contact-app-server-nxgi.onrender.com/api/v1/contactapp";

const Resetpass = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${API}/auth/reset-password`, {
        token,
        password,
      });
      console.log("Reset Password Success:", response.data);
      setSuccessMessage("Password successfully reset.");
    } catch (err) {
      console.error("Reset Password Error:", err.message);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-[gray] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm hover:bg-[#393639] hover:text-[white]  transition-all duration-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className=" block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm hover:bg-[#393639] hover:text-[white]  transition-all duration-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-[#232121] bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpass;
