import Navbar from "../Components/Navbar";
import WarningBox from "../Components/WarningBox";
import { Form, FormControl, Button } from "react-bootstrap";
import Clock from "../Components/Clock";
import style from "../Components/Timer.module.css";
const AddToDo = (props) => {
  function displayWarning(display) {
    document.getElementById("WarningBox-h3").style.display = display;
  }

  const addList = () => {
    if (props.formData.title.trim() === "") {
      displayWarning("block");
    } else {
      props.setallLists([...props.allLists, props.formData]);
      props.setFormData({ ...props.formData, title: ""});
      props.setFormData({ ...props.formData, targetDate:"" });

       console.log(props.allLists);
      displayWarning("none");
    }
  };

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
          className="h-[75px] w-[300px] block"
        />

        <input
          className="h-[40px] w-[300px] block"
          placeholder="new date"
          type="date"
          // value={props.formdata.targetDate}
          onChange={(e) => {
            props.setFormData({ ...props.formData, targetDate: e.target.value });
          }}
        />

        <button
          id="AddToDo-button"
          className="w-[100px] h-[30px] border-solid border-2 border-[#555] bg-[#555] text-[#fff] hover:bg-[black] hover:text-[white] hover:border-[black] hover:shadow-xl"
          type="submit"
          onClick={addList}
        >
          Add
        </button>
      </div>
      <WarningBox />
    </div>
  );
};

export default AddToDo;
