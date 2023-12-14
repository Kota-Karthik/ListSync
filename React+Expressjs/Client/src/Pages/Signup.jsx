import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  const navigateTo = (address) => {
      navigate(address);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/signup`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "passwordConfirm": passwordConfirm
            }),
        })
        const data = await response.json();
        if (data.status === 'success') {
            console.log("signed in");
            Cookies.set("jwt", data.token);
            Cookies.set("encryptedData", data.data.encryptedData);
            navigateTo('/');
            window.location.reload();
        }
        if (!response.ok) {
            console.log("The status code :", response.status)
            console.log("signup failed");

            toast.error("passwords doesn't match");


            const errorData = await response.json();
            throw new Error(errorData.error);


        }

       
    } catch (err) {
        console.error(`Error signing in the user`, err.message);

    }
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
}
 
  
  return (
    <div>
      <Navbar />
      <form
        className="flex flex-col w-[400px] mx-auto mt-[100px] shadow-gray-800"
        // onSubmit={registerForm}
      >
        <div className="mx-auto mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Register
        </div>

        <label
          for="first_name"
          className="block mb-2 text-[20px] font-medium text-gray-900 mt-[20px] "
        >
          Name
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
         <label
          for="first_name"
          className="block mb-2 text-[20px] font-medium text-gray-900 mt-[20px] "
        >
          Email
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          value={passwordConfirm}
          required
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <button
          type="submit"
          className="text-white bg-[#555] hover:bg-[black] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-[20px] "
          onClick={handleSignUp}
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
