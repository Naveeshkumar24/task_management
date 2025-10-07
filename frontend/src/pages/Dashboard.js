import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    const res = await getTasks(page);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteTask(id);
      fetchTasks();
    }
  };

  const toggleStatus = async (task) => {
    await updateTask(task._id, { status: task.status === "pending" ? "completed" : "pending" });
    fetchTasks();
  };

  return (
    <div className="dashboard">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? <p>No tasks found</p> : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className={task.priority}>
                <td><Link to={`/tasks/${task._id}`}>{task.title}</Link></td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.priority}</td>
                <td>
                  <button onClick={() => toggleStatus(task)}>{task.status}</button>
                </td>
                <td>
                  <Link to={`/tasks/${task._id}`}>Edit</Link> | 
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Dashboard;
