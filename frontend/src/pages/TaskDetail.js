import React, { useEffect, useState } from "react";
import { getTask, updateTask } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  const fetchTask = async () => {
    const res = await getTask(id);
    setTask(res.data);
  };

  useEffect(() => { fetchTask(); }, [id]);

  const handleUpdate = async () => {
    await updateTask(id, task);
    navigate("/dashboard");
  };

  return (
    <div className="task-detail">
      <h2>Edit Task</h2>
      <input value={task.title || ""} onChange={(e) => setTask({ ...task, title: e.target.value })} />
      <textarea value={task.description || ""} onChange={(e) => setTask({ ...task, description: e.target.value })} />
      <input type="date" value={task.dueDate ? task.dueDate.slice(0,10) : ""} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
      <select value={task.priority || "low"} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleUpdate}>Update Task</button>
    </div>
  );
}

export default TaskDetail;
