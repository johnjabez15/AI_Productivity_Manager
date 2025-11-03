import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, Box, Button, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { AssignmentTurnedIn, Chat, Assignment, ExitToApp } from '@mui/icons-material';
import { taskService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await taskService.getAllTasks();
      const tasks = response.data;
      setStats({
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'COMPLETED').length,
        pending: tasks.filter(t => t.status === 'PENDING').length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Productivity Manager
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Welcome, {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Tasks
                </Typography>
                <Typography variant="h3">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="h3" color="success.main">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="h3" color="warning.main">{stats.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Assignment sx={{ mr: 1, fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5">Manage Tasks</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Create, edit, and organize your tasks efficiently.
              </Typography>
              <Button variant="contained" onClick={() => navigate('/tasks')}>
                Go to Tasks
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Chat sx={{ mr: 1, fontSize: 40, color: 'secondary.main' }} />
                <Typography variant="h5">AI Assistant</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Get motivation and task scheduling help from AI.
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => navigate('/ai-chat')}>
                Chat with AI
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AssignmentTurnedIn sx={{ mr: 1, fontSize: 40, color: 'success.main' }} />
                <Typography variant="h5">Completed Tasks</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                View your accomplishments and track your progress.
              </Typography>
              <Button variant="outlined" color="success" onClick={() => navigate('/completed')}>
                View Completed
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
