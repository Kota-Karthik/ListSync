import { useState } from "react";
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import AddToDo from "./Pages/AddToDo";
import YourToDo from "./Pages/YourToDo";
import Contactus from "./Pages/Contactus";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {

  const AddToDoButton = document.getElementById("AddToDo-button");
  const jwt = Cookies.get('jwt');
  const [allLists, setallLists] = useState([]);

  // const getAllLists=()=>{
  //   fetch(`http://localhost:3000/todo`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },

  // })
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return res.json();
  //   })
  //   .then((data2) => {
  //     const { results,data,status } = data2;
  //     setallLists(data.lists);
  //     console.log(data.lists);
  //     // console.log(data2)
  //     // console.log(allLists);

  //     if (data.status === "Success") {
  //       console.log("Registered successfully");
  //     } else if (data.status === "Fail") {
  //       console.log(data.message);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     console.log("An error occurred while registering.");
  //   });
  // }
  // useEffect(() =>{
  //   getAllLists()
  // },[])

  // const [allDates,setallDates]=useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetDate: ""

  });
  const [list, setList] = useState("");
  const count = allLists.length;
  const [deadline, setDeadline] = useState('December 25, 2023')
  const [newDeadline, setNewDeadline] = useState('')

  const changeDeadline = (newDeadline) => {
    setDeadline(newDeadline);
  };


  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>


        <Route path="/" element={<Home count={count} />} />
        <Route path="/home" element={<Home count={count} />} />
        <Route path="/add-to-do" element={<AddToDo formData={formData} setFormData={setFormData} count={count} AddToDoButton={AddToDoButton} list={list} setList={setList} allLists={allLists} setallLists={setallLists} deadline={deadline} setDeadline={setDeadline} newDeadline={newDeadline} setNewDeadline={setNewDeadline} changeDeadline={changeDeadline} />} />
        {jwt && <Route path="/your-to-do's" element={<YourToDo allLists={allLists} setallLists={setallLists} deadline={deadline} />} />}
        {!jwt && <Route path="/log-in" element={<Login />} />}
        {!jwt && <Route path="/register" element={<Signup />} />}
      </Routes>
    </BrowserRouter>

  )
}

export default App
