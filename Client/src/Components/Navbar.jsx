
import {  Link } from "react-router-dom";
const Navbar = () => {
 
    return (
      <div className="p-[10px] max-w-[900px] my-[0] mx-auto fixed top-[0] left-[50%] translate-x-[-50%] bg-white z-[100]  ">
        <div className="flex justify-between mb-[50px] ">
         <Link  to="/" className="text-3xl font-bold inline-block relative left-[0] mt-[15px]">ListSync</Link>
        <nav className="flex gap-[15px] ">
          <ul className="flex justify-evenly ">
           
            <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link  to="/" className="Navbar-a">Home</Link>
            </li>
            <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link to="/add-to-do" className="Navbar-a">Add To-Do</Link>
            
            </li>
            <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link to="/your-to-do's" className="Navbar-a">Your To-Dos</Link>
             
            </li>
            {/* <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link to="/about" className="Navbar-a">About</Link>
            
            </li>
            <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link to="/contact-us" className="Navbar-a">Contact us</Link>
              
            </li> */}
            <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link to="/log-in" className="Navbar-a ">Log in</Link>
              
            </li>
            <li className="inline-block ml-[5px] text-[15px] list-none px-[0px] py-[20px]  ">
            <Link to="/register" className="Navbar-a ">Sign up</Link>
              
            </li>
          </ul>
        </nav>
      </div>
      </div>
    );
  };
  
  export default Navbar;
  