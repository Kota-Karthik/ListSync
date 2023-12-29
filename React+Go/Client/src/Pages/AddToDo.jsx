import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";
import WarningBox from "../Components/WarningBox";
import { toast } from 'react-toastify';

const AddToDo = (props) => {
  const jwt = Cookies.get('jwt');
  const encryptedData = Cookies.get('encryptedData');
  const postlist = { "title": props.formData.title, "description": props.formData.description, "targetDate": props.formData.targetDate };

  const addList = () => {
    if (props.formData.title.trim() === "") {
      displayWarning("block");
    } else if (new Date(props.formData.targetDate).getTime() <= today) {
      displayWarning2("block");
    } else {
      props.setallLists([...props.allLists, props.formData]);
      props.setFormData({ ...props.formData, title: "" });
      props.setFormData({ ...props.formData, targetDate: "" });

      console.log(props.allLists);
      displayWarning("none");
      displayWarning2("none");
    }
  };
  function displayWarning(display) {
    document.getElementById("WarningBox-h3").style.display = display;
  }
  function displayWarning2(display) {
    document.getElementById("WarningBox-h3-2").style.display = display;
  }
  const today = new Date().getTime();

  const handleAddToDo = async (e) => {
    e.preventDefault();
    addList();
    try {
      const response = await fetch(`http://localhost:3000/todo/newList/${encryptedData}`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "title": props.formData.title,
          "description": props.formData.description,
          "targetDate": props.formData.targetDate,
        }),
      });

     

      // Check if the response is not OK
      if (!response.ok) {
        console.log("List creation failed");
        toast.error("Failed to create your to-do-list");

        // Throw an error based on the HTTP status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      if (data.status === 'success') {
        console.log("List Created");
        toast.success("To-Do-List added successfully");
      } else {
        console.log("List creation failed");
        toast.error("Failed to create your to-do-list");

        // Throw an error based on the server response
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(`Error creating the list: ${err.message}`);
    }

    window.location.reload();
  }





  return (
    <div>
      <Navbar />
      <div className="m-[0] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <input
          type="text"
          onChange={(e) => {
            props.setFormData({ ...props.formData, title: e.target.value });
          }}
          // value={props.formdata.title}
          placeholder="Enter your to-do title..."
          className="h-[50px] w-[300px] block border-[1px] border-[#000000] my-[10px] rounded-md"
        />
        <input
          type="text"
          onChange={(e) => {
            props.setFormData({ ...props.formData, description: e.target.value });
          }}
          // value={props.formdata.title}
          placeholder="Enter your to-do description..."
          className="h-[75px] w-[300px] block border-[1px] border-[#000000] my-[10px] rounded-md"
        />

        <input
          className="h-[40px] w-[300px] block border-[1px] border-[#000000] my-[10px] rounded-md"
          placeholder="Enter your target to complete to-do"
          type="date"
          onChange={(e) => {
            props.setFormData({
              ...props.formData,
              targetDate: e.target.value,
            });
          }}
        />

        <button
          id="AddToDo-button"
          className="w-[100px] h-[30px] border-solid border-2 border-[#555] bg-[#555] text-[#fff] hover:bg-[black] hover:text-[white] hover:border-[black] hover:shadow-xl rounded-md"
          type="submit"
          onClick={handleAddToDo}
        >
          Add
        </button>
      </div>
      <WarningBox />
    </div>
  );
};

export default AddToDo;
