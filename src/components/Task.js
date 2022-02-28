import React from "react";
import "./Task.css";
import { FaTimes } from "react-icons/fa";
import { useStateValue } from "../Context/GlobalState";
import { fetchTask } from "./db";

function Task({ task }) {
  const dateTime = task.dateTime.split("T");
  const date = dateTime[0];
  const time = dateTime[1];

  const [{ tasks }, dispatch] = useStateValue();

  async function onDelete() {
    // DELETE from json file
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "DELETE",
    });

    dispatch({
      type: "DELETE_TASK",
      details: {
        id: task.id,
      },
    });
  }

  async function setReminder() {
    // PUT(update) to json file
    const tempTask = await fetchTask(task.id);
    const updatedTask = { ...tempTask, reminder: !tempTask.reminder };

    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated: ", data);
      })
      .catch((error) => {
        console.warn("Update error: ", error);
      });

    dispatch({
      type: "SET_REMINDER",
      id: task.id,
    });
  }

  return (
    <div
      className={task.reminder ? "task-reminder" : "task"}
      onDoubleClick={setReminder}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={onDelete}
        />
      </h3>
      <p>{`${date} ${time}`}</p>
    </div>
  );
}

export default Task;
