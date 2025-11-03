import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Card, CardContent, CardActions, Grid, Chip, IconButton
} from '@mui/material';
import { Add, Delete, Edit, Home } from '@mui/icons-material';
import { taskService } from '../services/api';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: '', description: '', priority: 'MEDIUM', deadline: '', status: 'PENDING'
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = (task = null) => {
    if (task) {
      setEditMode(true);
      setCurrentTask(task);
    } else {
      setEditMode(false);
      setCurrentTask({ title: '', description: '', priority: 'MEDIUM', deadline: '', status: 'PENDING' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask({ title: '', description: '', priority: 'MEDIUM', deadline: '', status: 'PENDING' });
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await taskService.updateTask(currentTask.id, currentTask);
      } else {
        await taskService.createTask(currentTask);
      }
      loadTasks();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = { LOW: 'info', MEDIUM: 'warning', HIGH: 'error', URGENT: 'error' };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = { PENDING: 'warning', IN_PROGRESS: 'info', COMPLETED: 'success' };
    return colors[status] || 'default';
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Task Manager</Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')} startIcon={<Home />}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">My Tasks</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
            New Task
          </Button>
        </Box>
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {task.description}
                  </Typography>
                  <Box display="flex" gap={1} mb={1}>
                    <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" />
                    <Chip label={task.status} color={getStatusColor(task.status)} size="small" />
                  </Box>
                  {task.deadline && (
                    <Typography variant="caption" color="text.secondary">
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton size="small" color="primary" onClick={() => handleOpen(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={currentTask.title}
            onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={currentTask.description}
            onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
          />
          <TextField
            fullWidth
            select
            label="Priority"
            margin="normal"
            value={currentTask.priority}
            onChange={(e) => setCurrentTask({...currentTask, priority: e.target.value})}
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="URGENT">Urgent</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Status"
            margin="normal"
            value={currentTask.status}
            onChange={(e) => setCurrentTask({...currentTask, status: e.target.value})}
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Deadline"
            type="datetime-local"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={currentTask.deadline}
            onChange={(e) => setCurrentTask({...currentTask, deadline: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskManager;
