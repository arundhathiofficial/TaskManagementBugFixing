import { useState } from "react";
import { initialTasks } from "./data/tasks";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // ❌ BUG 1: Mutating state directly
  const addTask = () => {
    if (!input.trim()) return;
    tasks.push({
      id: Date.now(),
      text: input,
      completed: false,
    });
    setTasks(tasks); 
    setInput("");
  }; 


  // ❌ BUG 2: Mutating object inside map
  const toggleTask = (id) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        task.completed =  !task.completed; // mutation
      }
      return task;
    });
    setTasks(updated);
  };

  // ❌ BUG 3: Wrong filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed; // wrong
    if (filter === "completed") return task.completed;   // wrong
    return true;
  });

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Task Manager</h2>

        {/* ❌ BUG 4: Incorrect controlled input */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={input}
            onChange={() => setInput()}
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add 
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className="btn btn-outline-warning"
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {/* Task List */}
        <div className="list-group">
          {filteredTasks.map((task, index) => (
            <div
              key={index} // ❌ BUG 5: wrong key
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                {/* ❌ BUG 6: No conditional styling */}
                <span>{task.text}</span>
              </div>

              <span
                className={
                  task.completed
                    ? "badge bg-success"
                    : "badge bg-warning text-dark"
                }
              >
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}