import Navbar from "../Components/Navbar";
import ToDoCounter from "../Components/To-Do-Counter";
const Home = (props) => {
    return ( 
        <div>
<Navbar/>
<ToDoCounter count={props.count}/>
        </div>
     );
}
 
export default Home;