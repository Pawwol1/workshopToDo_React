import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import {getTasks} from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const handleAddNewTask = task => {
    setTasks(prevTasks => {
      return [
        task,
        ...prevTasks
      ];
    });
  };

  const handleRemoveTask = id => {
    setTasks(prevState => prevState.filter(task => task.id !== id));
  };

  return (
    <>
      <NewTask onNewTask={handleAddNewTask}/>

      {tasks.map(task => {
        return <Task key={task.id} {...task} onRemoveTask={handleRemoveTask}/>;
      })}
    </>
  );
}

ReactDOM.render(<App/>, document.querySelector("#app"));