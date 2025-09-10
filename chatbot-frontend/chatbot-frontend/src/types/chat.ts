// src/types/chat.ts
// This file defines the shape of our data
// It helps TypeScript understand what our objects look like

export interface ChatMessage {
  id: number;
  conversationId: string;
  userId: string;
  content: string;
  role: 'User' | 'Assistant' | 'System';
  createdAt: string;
}

export interface ChatRequest {
  message: string;
  conversationId: string;
  userId: string;
  settings?: ChatSettings;
}

export interface ChatSettings {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: ChatMessage;
  error?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  conversationId: string;
}