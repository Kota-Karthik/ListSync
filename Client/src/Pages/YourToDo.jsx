import Navbar from "../Components/Navbar";

const YourToDO = (props) => {
  const deleteList = (event, listVal) => {
    props.setallLists(
      props.allLists.filter((allList) => {
        if (listVal === allList) {
          return false;
        } else {
          return true;
        }
      })
    );
  };
  return (
    <div>
      <Navbar />

      <div className="text-center mt-[50px] flex justify-center items-center flex-col">
        {props.allLists.map((listVal) => {
          return (
            <div key={listVal}className="h-auto min-w-[300px] min-h-[75px] max-w-[300px] m-[20px] inline-block mx-[0px] relative p-[2rem] break-all hover:shadow-2xl  border-l-[5px] border-[#555] ">
              <h3 className="text-xl font-bold ">{listVal} </h3>
              <button
                className="text-black-600 h-[30px] absolute right-[0px] bottom-[0px] border-solid border-2 border-[#555] bg-[#555] text-[#fff] hover:bg-[black] hover:text-[white] hover:border-[black]  " 
                type="submit"
                onClick={(event) => deleteList(event, listVal)}
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