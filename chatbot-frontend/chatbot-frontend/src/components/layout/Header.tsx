// src/components/layout/Header.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

interface HeaderProps {
  onClearChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearChat }) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        {/* App Icon and Title */}
        <ChatIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI ChatBot
        </Typography>
        
        {/* Action Buttons */}
        <Box>
          <IconButton 
            color="inherit" 
            onClick={onClearChat}
            title="New Conversation"
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;