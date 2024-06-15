import React, { useState, useEffect } from 'react';
import './App.css';

function ItineraryPlanner() {
  // State variables
  const [taskList, setTaskList] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [currentlyEditingTask, setCurrentlyEditingTask] = useState(null);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever the task list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  // Handle input changes for new task
  const handleNewTaskInputChange = (event) => {
    setNewTaskInput(event.target.value);
  };

  // Add a new task to the list
  const handleAddTask = () => {
    if (newTaskInput.trim()!== '') {
      const newTask = { id: Date.now(), text: newTaskInput.trim() };
      setTaskList([...taskList, newTask]);
      setNewTaskInput('');
    }
  };

  // Delete a task from the list
  const handleDeleteTask = (taskId) => {
    setTaskList(taskList.filter((task) => task.id!== taskId));
  };

  // Start editing a task
  const handleEditTask = (task) => {
    setCurrentlyEditingTask(task);
  };

  // Save changes to a task
  const handleSaveEdit = (taskId, newTaskText) => {
    setTaskList(
      taskList.map((task) =>
        task.id === taskId? {...task, text: newTaskText.trim() } : task
      )
    );
    setCurrentlyEditingTask(null);
  };

  return (
    <div className="itinerary-planner m-auto">
      <h1>Itinerary Planner</h1>
      <h6>"Discover the world your way with our personalized itinerary planner — where every journey is crafted to exceed your dreams."</h6>
      <div className="new-task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskInput}
          onChange={handleNewTaskInputChange}
          
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <br/>
      <hr/>
      <ul className="task-list">
        {taskList.map((task) => (
          <li key={task.id}>
            {currentlyEditingTask && currentlyEditingTask.id === task.id? (
              <div className="edit-task-input">
                <input
                  type="text"
                  value={currentlyEditingTask.text}
                  onChange={(event) =>
                    setCurrentlyEditingTask({
                     ...currentlyEditingTask,
                      text: event.target.value,
                    })
                  }
                />
                <button onClick={() => handleSaveEdit(task.id, currentlyEditingTask.text)}>
                  Save
                </button>
                <button onClick={() => setCurrentlyEditingTask(null)}>Cancel</button>
              </div>
            ) : (

              <div>
                ▶ {task.text}
                <br/>
                <br/>
                <div className='ops'>

                <button className="btnEdit" onClick={() => handleEditTask(task)}>Edit</button>
                <button className="btnDel" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryPlanner;