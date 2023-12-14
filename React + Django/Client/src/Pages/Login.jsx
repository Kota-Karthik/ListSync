import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { Navigate } from "react-router-dom";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [redirect,setRedirect]=useState(false);


  
  
  return (
    <div>
      <Navbar />
      <form
        className="flex flex-col w-[400px] mx-auto mt-[150px] shadow-gray-800"
        // onSubmit={loginF}
      >
        <div className="mx-auto mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Login
        </div>
        <label
          for="first_name"
          className="block mb-2 text-[20px] font-medium text-gray-900 mt-[20px] "
        >
          UserName
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="username"
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="password"
          required
        />

        <button
          type="submit"
          className="text-white bg-[#555] hover:bg-[black] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-[20px] "
        >
          Log in
        </button>
        <div className="mx-[auto]  font-medium text-gray-900 ">
          <Link to="" className="hover:underline ">
            Forget password?
          </Link>{" "}
        </div>
        <div className="mx-[auto]  font-medium text-gray-900 ">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline ">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
