import Navbar from "../Components/Navbar";
import Clock from "../Components/Clock";

const YourToDO = (props) => {

  
  const deleteList = async (list_id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/deleteList/${list_id}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

    
      if (!response.ok) {
        console.log("List deletion failed");
        toast.error("Failed to delete your to-do-list");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        console.log("List Deleted");
        toast.success("To-Do-List Deleted successfully");
      } else {
        console.log("List deletion failed");
        toast.error("Failed to delete your to-do-list");
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(`Error creating the list: ${err.message}`);
    }

    window.location.reload();
  };
  return (
    <div className="relative " >
      <Navbar />

      <div className=" text-center flex justify-center items-center flex-col overflow-hidden mt-[100px]  ">
        {props.allLists && props.allLists.map((listVal) => {
          return (
            <div key={listVal._id} className="h-auto min-w-[300px] min-h-[75px] max-w-[300px] m-[20px] inline-block mx-[0px] relative p-[2rem] break-all hover:shadow-xl border-[1px] border-[#555555] hover:border-l-[5px] transition-all  ">
              <h3 className="text-xl font-bold ">{listVal.title} </h3>
              <p className="text-s ">{listVal.description}</p>
              <Clock deadline={listVal.targetDate} />
              <button
                className="text-black-600 h-[30px] absolute right-[0px] bottom-[0px] border-solid border-2 border-[#555] bg-[#555] text-[#fff] hover:bg-[black] hover:text-[white] hover:border-[black]  " 
                type="submit"
                onClick={(e) => deleteList(listVal._id)}
              >
                Done
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YourToDO;