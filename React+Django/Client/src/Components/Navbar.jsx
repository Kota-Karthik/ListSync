
import { Link } from "react-router-dom";
const Navbar = () => {
  const toggleMenu = () => {
    const navbar = document.getElementById('navbar-default');
    if (navbar) {
      navbar.classList.toggle('hidden');
    }
  };
  return (
    <div>
      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
           
            <div className="font-bold text-xl">ListSync</div>
          </a>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              <li className="py-2 px-3 "><Link to="/" >Home</Link></li>
              <li className="py-2 px-3 "><Link to="/add-to-do" >Add To-Do</Link></li>
              <li className="py-2 px-3 "><Link to="/your-to-do's" >Your To-Dos</Link></li>
              <li className="py-2 px-3 "><Link to="/log-in">Login</Link></li>
              <li className="py-2 px-3 "><Link to="/register">Sign Up</Link></li>
              <button className="py-2 px-3  shadow-lg rounded-lg translate-y-[-5px]  bg-[#18A0A9] text-[#FFFFFF] font-medium p-[5px]" ><a href="/login">Logout</a></button>
              {/* {(!jwt) && <li className="py-2 px-3 "><Link to="/login">Login</Link></li>}
                            {(!jwt) && <li className="py-2 px-3 "><Link to="/signup">Sign Up</Link></li>}
                            {(jwt) && <li className="py-2 px-3 "><Link to="/changePass">Change Password</Link></li>}

                            {(jwt) && <button className="py-2 px-3  shadow-lg rounded-lg translate-y-[-5px]  bg-[#18A0A9] text-[#FFFFFF] font-medium p-[5px]" onClick={handleLogout}><a href="/login">Logout</a></button>} */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
