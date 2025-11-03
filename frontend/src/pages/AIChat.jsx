import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, AppBar, Toolbar, Typography, Button, Box, Paper, TextField, IconButton, List, ListItem, ListItemText
} from '@mui/material';
import { Send, Home } from '@mui/icons-material';
import { aiService } from '../services/api';

function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your productivity assistant. How can I help you stay motivated today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chat(input);
      const aiMessage = { role: 'assistant', content: response.data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>AI Assistant</Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')} startIcon={<Home />}>
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>Chat with AI</Typography>
        <Paper sx={{ flexGrow: 1, p: 2, mb: 2, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
          <List>
            {messages.map((msg, idx) => (
              <ListItem key={idx} sx={{ 
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 1
              }}>
                <Paper sx={{ 
                  p: 2, 
                  maxWidth: '70%',
                  backgroundColor: msg.role === 'user' ? '#1976d2' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#000'
                }}>
                  <ListItemText primary={msg.content} />
                </Paper>
              </ListItem>
            ))}
            {loading && (
              <ListItem>
                <Paper sx={{ p: 2, backgroundColor: '#fff' }}>
                  <ListItemText primary="Thinking..." />
                </Paper>
              </ListItem>
            )}
          </List>
        </Paper>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <IconButton color="primary" onClick={handleSend} disabled={loading}>
            <Send />
          </IconButton>
        </Box>
      </Container>
    </>
  );
}

export default AIChat;
