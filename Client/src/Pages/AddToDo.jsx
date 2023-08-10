import Navbar from "../Components/Navbar";
import WarningBox from "../Components/WarningBox";
const AddToDo = (props) => {
 
    const showlist=(event)=>{
        props.setList(event.target.value);
        
     
    }
    function displayWarning(display) {
    
          document.getElementById("WarningBox-h3").style.display=display;
          }
 
    const addList=()=>{
      if(props.list.trim() === '')
        {displayWarning("block") ;
          
        }
        else
        {
          props.setallLists([...props.allLists,props.list]);
          props.setList("");
          displayWarning("none") ;
        }
     
         }
    
     
       
      

    return ( 
       <div>
         <Navbar/>
        <div className="m-[0] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      
           <input type="text" onChange={showlist} value={props.list} placeholder="Enter your to-do title..." className="h-[75px] w-[300px] block"/>
           
           <button id="AddToDo-button" className="w-[100px] h-[30px] border-solid border-2 border-[#555] bg-[#555] text-[#fff] hover:bg-[black] hover:text-[white] hover:border-[black] hover:shadow-xl" type="submit" onClick={addList}>Add</button>
           
           
        </div>
            <WarningBox/>
       </div>
     );
}
 
export default AddToDo ;