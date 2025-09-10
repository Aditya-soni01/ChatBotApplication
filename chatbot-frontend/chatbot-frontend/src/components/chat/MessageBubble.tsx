// src/components/chat/MessageBubble.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Person as PersonIcon,
  SmartToy as BotIcon,
} from '@mui/icons-material';
import type { ChatMessage } from '../../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'User';
  const isAssistant = message.role === 'Assistant';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        mb: 2,
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          mx: 1,
          width: 40,
          height: 40,
        }}
      >
        {isUser ? <PersonIcon /> : <BotIcon />}
      </Avatar>

      {/* Message Content */}
      <Paper
        elevation={2}
        sx={{
          maxWidth: '70%',
          px: 2,
          py: 1.5,
          backgroundColor: isUser 
            ? 'primary.light' 
            : isAssistant 
            ? 'background.paper' 
            : 'warning.light',
          color: isUser ? 'primary.contrastText' : 'text.primary',
        }}
      >
        {/* Message Text */}
        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-wrap', // Preserves line breaks
            wordBreak: 'break-word', // Prevents overflow
          }}
        >
          {message.content}
        </Typography>

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            opacity: 0.7,
            fontSize: '0.75rem',
          }}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageBubble;