import React, { useState } from "react";
import { useStateValue } from "../Context/GlobalState";
import "./AddTask.css";
import uuidv4 from "../../node_modules/uuid/dist/v4";

function AddTask() {
  const [text, setText] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [reminder, setReminder] = useState(false);

  const [{ tasks }, dispatch] = useStateValue();

  async function saveTask(e) {
    e.preventDefault();

    if (text === "" || dateTime === "") {
      alert("Please fill in the details");
      return;
    }

    const task = {
      id: uuidv4(),
      text: text,
      dateTime: dateTime,
      reminder: reminder,
    };

    // POST to json file
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.warn("Error: ", error);
      });

    dispatch({
      type: "SAVE_TASK",
      details: {
        id: task.id,
        text: text,
        dateTime: dateTime,
        reminder: reminder,
      },
    });

    setText("");
    setDateTime("");
    setReminder(false);
    console.log(reminder);
  }
  console.log(tasks);

  return (
    <div>
      <form onSubmit={saveTask}>
        <div className="input">
          <h4>Task</h4>
          <input
            type="text"
            placeholder="Add Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="input">
          <h4>Day & Time</h4>
          <input
            type="datetime-local"
            placeholder="Add Day & Time"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>

        <div className="reminder">
          <span>Set Reminder</span>
          <input
            type="checkbox"
            value={reminder}
            checked={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>

        <input type="submit" value="Save Task" className="saveBtn" />
      </form>
    </div>
  );
}

export default AddTask;
