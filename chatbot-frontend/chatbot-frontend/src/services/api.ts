// src/services/api.ts
// This handles all communication with our backend API

import axios from 'axios';
import type { ChatMessage, ChatRequest, ApiResponse } from '../types/chat';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your C# API URL
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class ChatService {
  // Send a message to the chatbot
  static async sendMessage(request: ChatRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ChatMessage>('/chat/send', request);
      return {
        success: true,
        message: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to send message',
      };
    }
  }

  // Get conversation history
  static async getConversationHistory(conversationId: string): Promise<ChatMessage[]> {
    try {
      const response = await apiClient.get<ChatMessage[]>(`/chat/conversation/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch conversation history:', error);
      return [];
    }
  }

  // Create new conversation
  static async createConversation(userId: string): Promise<string> {
    try {
      const response = await apiClient.post<{ conversationId: string }>('/chat/conversation', {
        userId,
      });
      return response.data.conversationId;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      // Generate a fallback conversation ID
      return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }
}

export default ChatService;