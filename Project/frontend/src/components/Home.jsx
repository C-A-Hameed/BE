import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/task/my", {
        withCredentials: true,
      });
      setTasks(data.tasks);
    } catch (error) {
      setTasks([]);
    }
  };

  const addTask = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/task/add",
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message, { icon: '✅' });
      setTitle(""); // Clear title field
      setDescription(""); // Clear description field
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message, { icon: '❌' });
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/task/del/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message, { icon: '✅' });
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message, { icon: '❌' });
    }
  };

  const updateTask = async (id) => {
    const updatedTask = tasks.find((task) => task._id === id);
    await axios
      .put(`http://localhost:4000/api/v1/task/update/${id}`, updatedTask, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message, { icon: '✅' });
      })
      .catch((error) => {
        toast.error(error.response.data.message, { icon: '❌' });
      });
  };

  const handleInputChange = (taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
    }
    getAllTasks();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated]);

  return (
    <>
      <section className="home">
        <h1>CREATE YOUR TASKS</h1>
        <div className="create-task">
          <input
            type="text"
            placeholder="Your Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={10}
            placeholder="Your Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addTask}>Create Task</button>
        </div>
        <div className="tasks">
          {tasks && tasks.length > 0 ? (
            tasks.map((element, index) => (
              <div className="card" key={element._id}>
                <div className="task-number">Task #{index + 1}</div>
                <input
                  type="text"
                  value={element.title}
                  onChange={(e) =>
                    handleInputChange(element._id, "title", e.target.value)
                  }
                />
                <textarea
                  rows={5}
                  value={element.description}
                  onChange={(e) =>
                    handleInputChange(
                      element._id,
                      "description",
                      e.target.value
                    )
                  }
                >
                  {element.description}
                </textarea>
                <div>
                  <button onClick={() => updateTask(element._id)}>
                    Update
                  </button>
                  <button onClick={() => deleteTask(element._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>NO TASKS CREATED!</h1>
          )}
        </div>
        {showScrollButton && (
          <div className="scroll-to-top" onClick={scrollToTop}>
            &#8679;
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
