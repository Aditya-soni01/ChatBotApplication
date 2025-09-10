// src/components/chat/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { ChatMessage } from '../../types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Show welcome message when no messages
  if (messages.length === 0 && !isLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 4,
            textAlign: 'center',
            maxWidth: 400,
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Welcome to AI ChatBot! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start a conversation by typing your message below.
            I'm here to help you with questions, provide information,
            or just have a friendly chat!
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        py: 1,
        px: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(0,0,0,0.3)',
        },
      }}
    >
      {/* Render all messages */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Show typing indicator when loading */}
      {isLoading && <TypingIndicator />}

      {/* Invisible div to scroll to */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;