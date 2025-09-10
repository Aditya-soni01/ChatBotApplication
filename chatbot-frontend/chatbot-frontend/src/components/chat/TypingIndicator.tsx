// src/components/chat/TypingIndicator.tsx
import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
} from '@mui/material';
import {
  SmartToy as BotIcon,
} from '@mui/icons-material';

const TypingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mb: 2,
        alignItems: 'flex-start',
      }}
    >
      {/* Bot Avatar */}
      <Avatar
        sx={{
          bgcolor: 'secondary.main',
          mx: 1,
          width: 40,
          height: 40,
        }}
      >
        <BotIcon />
      </Avatar>

      {/* Typing Animation */}
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            AI is thinking
          </Typography>
          {/* Animated dots */}
          <Box sx={{ display: 'flex', gap: '2px' }}>
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: 'text.secondary',
                  animation: 'typing 1.4s infinite',
                  animationDelay: `${index * 0.2}s`,
                  '@keyframes typing': {
                    '0%, 60%, 100%': {
                      opacity: 0.3,
                      transform: 'translateY(0)',
                    },
                    '30%': {
                      opacity: 1,
                      transform: 'translateY(-4px)',
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TypingIndicator;