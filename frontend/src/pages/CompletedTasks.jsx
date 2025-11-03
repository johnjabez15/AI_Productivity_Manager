import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Chip, Box
} from '@mui/material';
import { Home, CheckCircle } from '@mui/icons-material';
import { taskService } from '../services/api';

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  const loadCompletedTasks = async () => {
    try {
      const response = await taskService.getCompletedTasks();
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Completed Tasks</Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')} startIcon={<Home />}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <CheckCircle sx={{ mr: 2, fontSize: 40, color: 'success.main' }} />
          <Typography variant="h4">Your Accomplishments</Typography>
        </Box>
        {tasks.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 8 }}>
            No completed tasks yet. Keep working on your goals!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} md={6} lg={4} key={task.id}>
                <Card sx={{ borderLeft: '4px solid #4caf50' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{task.title}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {task.description}
                    </Typography>
                    <Box display="flex" gap={1} mb={1}>
                      <Chip label={task.priority} color="success" size="small" />
                      <Chip label="Completed" color="success" size="small" />
                    </Box>
                    {task.completedAt && (
                      <Typography variant="caption" color="text.secondary">
                        Completed: {new Date(task.completedAt).toLocaleDateString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default CompletedTasks;
