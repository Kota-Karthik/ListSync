import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const navigateTo = (address) => {
       navigate(address);
   };
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        }),
      })
      const data=await response.json();
      if(data.status==='success'){
      
        Cookies.set("jwt",data.token);
       
        Cookies.set("encryptedData",data.data.encryptedData);
        navigateTo('/');
        window.location.reload();
        setEmail("");
        setPassword("");
    
      }
      if (!response.ok) {
        toast.error("Login Failed");

        console.log("The status code :", response.status)
        console.log("login failed");
        if (response.status === 401) {
          console.log("Invalid Credentials")
          toast.error("Wrong Email or Password");

        }
        const errorData = await response.json();
        throw new Error(errorData.error);


      }
     
    } catch (err) {
      console.error(`Error logging the user`, err.message);
    }

  }

  
  
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
          Name
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          onClick={handleLogIn}
        >
          Log in
        </button>
        {/* <div className="mx-[auto]  font-medium text-gray-900 ">
          <Link to="" className="hover:underline ">
            Forget password?
          </Link>{" "}
        </div> */}
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
