// src/components/chat/ChatContainer.tsx
import React from 'react';
import {
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { useChat } from '../../hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatContainer: React.FC = () => {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearError,
  } = useChat();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'calc(100vh - 120px)', // Account for header and padding
        minHeight: '500px',
      }}
    >
      {/* Messages Area */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input Area */}
      <MessageInput
        onSendMessage={sendMessage}
        disabled={isLoading}
      />

      {/* Error Display */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={clearError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={clearError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatContainer;