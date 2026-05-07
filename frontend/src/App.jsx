import { useState } from "react";

function App() {

  const [role, setRole] = useState("admin");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Create Login Page",
      status: "Completed"
    },

    {
      id: 2,
      title: "Fix API Integration",
      status: "In Progress"
    },

    {
      id: 3,
      title: "Deploy Full Project",
      status: "Pending"
    }
  ]);

  const [taskTitle, setTaskTitle] = useState("");

  const addTask = () => {

    if (!taskTitle) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      status: "Pending"
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");

  };

  const updateStatus = (id) => {

    const updatedTasks = tasks.map((task) =>

      task.id === id
        ? {
            ...task,
            status:
              task.status === "Pending"
                ? "In Progress"
                : task.status === "In Progress"
                ? "Completed"
                : "Completed"
          }
        : task

    );

    setTasks(updatedTasks);

  };

  return (

    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      padding: "40px",
      color: "white",
      fontFamily: "Arial"
    }}>

      <h1 style={{ textAlign: "center" }}>
        Team Task Manager
      </h1>

      <p style={{ textAlign: "center" }}>
        Manage projects, assign tasks and track progress
      </p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px"
      }}>

        <button
          onClick={() => setRole("admin")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: role === "admin" ? "#2563eb" : "gray",
            color: "white",
            cursor: "pointer"
          }}
        >
          Admin
        </button>

        <button
          onClick={() => setRole("member")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: role === "member" ? "#2563eb" : "gray",
            color: "white",
            cursor: "pointer"
          }}
        >
          Member
        </button>

      </div>

      {
        role === "admin" &&

        <div style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px"
        }}>

          <input
            type="text"
            placeholder="Enter task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{
              padding: "12px",
              width: "300px",
              borderRadius: "8px",
              border: "none"
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer"
            }}
          >
            Add Task
          </button>

        </div>
      }

      <div style={{
        marginTop: "40px",
        display: "grid",
        gap: "20px"
      }}>

        {tasks.map((task) => (

          <div
            key={task.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px"
            }}
          >

            <h2>{task.title}</h2>

            <p>

              Status:

              <span style={{
                color:
                  task.status === "Completed"
                    ? "lightgreen"
                    : task.status === "In Progress"
                    ? "orange"
                    : "tomato"
              }}>
                {" "}{task.status}
              </span>

            </p>

            {
              role === "member" &&

              <button
                onClick={() => updateStatus(task.id)}
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#334155",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Update Status
              </button>
            }

          </div>

        ))}

      </div>

    </div>

  );

}

export default App;