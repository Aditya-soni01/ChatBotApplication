// src/hooks/useChat.ts
// This custom hook manages all chat state and logic
// It's a React pattern that lets us reuse stateful logic

import { useState, useCallback, useEffect } from 'react';
import type { ChatMessage, ChatState } from '../types/chat';
import ChatService from '../services/api';

// Generate a unique user ID (in a real app, this would come from authentication)
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useChat = () => {
  // State management using useState hook
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    conversationId: '',
  });

  // Static user ID for this session
  const [userId] = useState<string>(generateUserId);

  // Function to send a message
  const sendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || state.isLoading) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      conversationId: state.conversationId,
      userId: userId,
      content: messageContent.trim(),
      role: 'User',
      createdAt: new Date().toISOString(),
    };

    // Update state: add user message, set loading
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Send message to API
      const response = await ChatService.sendMessage({
        message: messageContent.trim(),
        conversationId: state.conversationId,
        userId: userId,
      });

      if (response.success && response.message) {
        // Add assistant response to messages
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, response.message!],
          isLoading: false,
        }));
      } else {
        // Handle API error
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error || 'Failed to get response',
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Network error occurred',
      }));
    }
  }, [state.conversationId, state.isLoading, userId]);

  // Function to clear error messages
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Function to start a new chat
  const clearChat = useCallback(async () => {
    setState(prev => ({
      ...prev,
      messages: [],
      error: null,
    }));

    // Create new conversation
    const newConversationId = await ChatService.createConversation(userId);
    setState(prev => ({
      ...prev,
      conversationId: newConversationId,
    }));
  }, [userId]);

  // Initialize conversation when hook mounts
  const initializeConversation = useCallback(async () => {
    const conversationId = await ChatService.createConversation(userId);
    setState(prev => ({
      ...prev,
      conversationId,
    }));
  }, [userId]);

  // useEffect runs when component mounts
  useEffect(() => {
    if (!state.conversationId) {
      initializeConversation();
    }
  }, [state.conversationId, initializeConversation]);

  // Return state and functions for components to use
  return {
    ...state,
    sendMessage,
    clearError,
    clearChat,
  };
};