import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  
  return (
    <div>
      <Navbar />
      <form
        className="flex flex-col w-[400px] mx-auto mt-[150px] shadow-gray-800"
        // onSubmit={registerForm}
      >
        <div className="mx-auto mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Register
        </div>

        <label
          for="first_name"
          className="block mb-2 text-[20px] font-medium text-gray-900 mt-[20px] "
        >
          UserName
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label
          for="password"
          className="block mb-2 text-[20px] font-medium text-gray-900 mt-[20px]"
        >
          Password
        </label>

        <input
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label
          for="password"
          className="block mb-2 text-[20px] font-medium text-gray-900 mt-[20px]"
        >
          Confirm Password
        </label>
        <input
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="confirm password"
          value={confirmPassword}
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="text-white bg-[#555] hover:bg-[black] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-[20px] "
        >
          Sign up
        </button>
        <div className="mx-[auto] font-medium text-gray-900 ">
          Already have an account?{" "}
          <Link to="/Log-in" className="text-blue-600 hover:underline ">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
