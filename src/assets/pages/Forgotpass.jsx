import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://contact-app-server-nxgi.onrender.com/api/v1/contactapp";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    

    try {
      const response = await axios.post(`${API}/auth/forgetpwd`, email);

      if (response.data.success) {
        setSuccessMessage(response.data.message || "Reset instructions sent!");
      } else {
        if (response.data.message === "Email not found") {
          setErrorMessage("Email not found. Please try again.");
        } else {
          setErrorMessage(
            response.data.message ||
              "Could not send reset instructions. Please try again later."
          );
        }
      }
    } catch (err) {
      console.error("Forgot Password Error:", err.message);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-[#a29494] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm hover:bg-[#393639] hover:text-[white] transition-all duration-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
