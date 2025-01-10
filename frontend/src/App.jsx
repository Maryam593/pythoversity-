import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";  

const App = () => {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskVisibility, setTaskVisibility] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks') 
      .then(response => {
        setTasks(response.data);  
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []); 

  const handleTasks = (e) => {
    e.preventDefault();
    setTaskVisibility(!taskVisibility);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') {
      toast.error("Please enter a task!"); 
      return;
    }
    if (tasks.length >= 5) {
      toast.error("You can only add up to 5 tasks."); 
      return;
    }

    const task = { task: newTask }; 
    axios.post('http://localhost:5000/api/tasks', task)  
      .then(response => {
        setTasks([...tasks, response.data]); 
        setNewTask('');
        toast.success("Task added successfully!");  
      })
      .catch(error => {
        console.error('There was an error adding the task!', error);
      });
  };


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)  
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id));  
        toast.success("Task deleted successfully!");  
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">To-Do List</h1>
      <form onSubmit={handleSubmit} className="w-96 bg-white p-6 rounded-lg shadow-lg mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task"
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </form>
      <button
        onClick={handleTasks}
        className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 mb-6 transition-colors"
      >
        {taskVisibility ? 'Hide Tasks' : 'Show Tasks'}
      </button>
      <ul className="w-96 bg-white p-6 rounded-lg shadow-lg">
        {taskVisibility ? (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center py-2 border-b border-gray-300">
              <span>{task.task}</span>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <h2 className="text-center text-gray-600">No tasks to show.</h2>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default App;
