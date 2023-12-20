const ToDoCounter = (props) => {
    return (
        <div className="text-[#555] absolute m-[0] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
<h1 className="text-3xl font-bold">No.of your To-Do's : <span className="hover:text-[black]">{props.count}</span></h1>

        </div>
      );
}
 
export default ToDoCounter;