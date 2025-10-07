import React from "react";
import { Link } from "react-router-dom";

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px", backgroundColor: getPriorityColor(task.priority) }}>
          <Link to={`/task/${task._id}`}>
            <h4>{task.title}</h4>
          </Link>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

function getPriorityColor(priority) {
  switch (priority) {
    case "high": return "#ffcccc";
    case "medium": return "#fff3cd";
    default: return "#d4edda";
  }
}

export default TaskList;
