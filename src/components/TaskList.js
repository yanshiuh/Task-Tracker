import { async } from "@firebase/util";
import React, { useContext, useEffect } from "react";
import { TaskContext } from "../Context/GlobalState";
import { fetchTasks } from "./db";
import Task from "./Task";
import "./TaskList.css";

function TaskList() {
  const [{ tasks }, dispatch] = useContext(TaskContext);

  useEffect(() => {
    getTask();
  }, []);

  // FETCH data from JSON server
  const getTask = async () => {
    const taskFromServer = await fetchTasks();
    dispatch({
      type: "GET_TASK",
      tasks: taskFromServer,
    });
  };

  return (
    <div>
      {tasks.length > 0
        ? tasks.map((task) => <Task task={task} key={task.id} />)
        : "No task to show currently"}
    </div>
  );
}

export default TaskList;
