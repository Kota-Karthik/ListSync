import { useState } from "react";
import {Route,Routes} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';



import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import AddToDo from "./Pages/AddToDo";
import YourToDo from "./Pages/YourToDo";
import Contactus from "./Pages/Contactus";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  
  const AddToDoButton=document.getElementById("AddToDo-button");

        const [allLists,setallLists]=useState([]);
        // const [allDates,setallDates]=useState([]);
        const [formData,setFormData]=useState({
          title:"",
          targetDate:""

        });
        const[list,setList]=useState("");
        const count=allLists.length;
        const [deadline, setDeadline] = useState('December 25, 2023')
        const [newDeadline, setNewDeadline] = useState('')
      
        const changeDeadline = (newDeadline) => {
          setDeadline(newDeadline);
        };
      

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home count={count}/>}/>
      <Route path="/home" element={ <Home count={count}/>}/>
      <Route path="/add-to-do" element={ <AddToDo formData={formData} setFormData={setFormData} count={count} AddToDoButton={AddToDoButton} list={list} setList={setList} allLists={allLists} setallLists={setallLists} deadline={deadline} setDeadline={setDeadline} newDeadline={newDeadline} setNewDeadline={setNewDeadline} changeDeadline={changeDeadline}  />}/>
      <Route path="/your-to-do's" element={ <YourToDo allLists={allLists} setallLists={setallLists}   deadline={deadline} />}/>
      <Route path="/about" element={ <About/>}/>
      <Route path="/contact-us" element={ <Contactus/>}/>
      <Route path="/log-in" element={ <Login/>}/>
      <Route path="/register" element={ <Signup/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}

export default App
