import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Container, Typography, IconButton } from '@mui/material';
import { Delete, Edit, Done } from '@mui/icons-material';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "" || deadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      task,
      description,
      priority,
      deadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setDescription("");
    setPriority("top");
    setDeadline("");
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setDeadline(taskToEdit.deadline);
      setEditingTaskId(id);
    }
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === editingTaskId
        ? { ...t, task, description, priority, deadline }
        : t
    );
    setTasks(updatedTasks);
    setTask("");
    setDescription("");
    setPriority("top");
    setDeadline("");
    setEditingTaskId(null);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const upcomingTasks = tasks.filter((t) => !t.done);

  return (
    <Container className="App">
      <Typography variant="h2" gutterBottom>
        Task Tool - React
      </Typography>
      <div className="task-form">
        <TextField
          label="Task"
          value={task}
          onChange={handleTaskChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
        />
        <Select
          value={priority}
          onChange={handlePriorityChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="top">Top Priority</MenuItem>
          <MenuItem value="middle">Middle Priority</MenuItem>
          <MenuItem value="low">Less Priority</MenuItem>
        </Select>
        <TextField
          type="date"
          value={deadline}
          onChange={handleDeadlineChange}
          fullWidth
          margin="normal"
        />
        {editingTaskId ? (
          <Button
            variant="contained"
            color="primary"
            onClick={updateTask}
            fullWidth
          >
            Update Task
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            fullWidth
          >
            Add Task
          </Button>
        )}
      </div>
      <Typography variant="h4" gutterBottom>
        Upcoming Tasks
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingTasks.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.task}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.priority}</TableCell>
              <TableCell>{t.deadline}</TableCell>
              <TableCell>
                <IconButton onClick={() => markDone(t.id)}>
                  <Done />
                </IconButton>
                <IconButton onClick={() => editTask(t.id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteTask(t.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h4" gutterBottom>
        Completed Tasks
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedTasks.map((ct) => (
            <TableRow key={ct.id}>
              <TableCell>{ct.task}</TableCell>
              <TableCell>{ct.description}</TableCell>
              <TableCell>{ct.priority}</TableCell>
              <TableCell>{ct.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
