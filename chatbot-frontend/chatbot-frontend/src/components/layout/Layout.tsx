// src/components/layout/Layout.tsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onClearChat: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onClearChat }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: 'background.default',
    }}>
      {/* Header */}
      <Header onClearChat={onClearChat} />
      
      {/* Main Content */}
      <Container 
        maxWidth="md" 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          py: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;