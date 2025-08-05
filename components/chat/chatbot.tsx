"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';
import { ChatMessage } from '@/lib/types';

interface ChatbotProps {
  context?: {
    building_id?: string;
    project_id?: string;
    type: 'general' | 'building' | 'project' | 'feedback';
  };
}

export function Chatbot({ context }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Load chat history
      loadChatHistory();
      // Send welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        message: '',
        response: getWelcomeMessage(),
        user_id: 'system',
        timestamp: new Date().toISOString(),
        context
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const loadChatHistory = async () => {
    try {
      const history = await apiClient.getChatHistory();
      setMessages(history);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const getWelcomeMessage = () => {
    if (context?.type === 'building') {
      return "Hi! I'm your Kilimani AI assistant. I can help you with information about this building, community feedback, walkability data, and development insights. What would you like to know?";
    } else if (context?.type === 'project') {
      return "Hello! I can provide insights about this project, including community sentiment, ROI analysis, and development recommendations. How can I assist you?";
    }
    return "Welcome to Kilimani AI! I can help you with building information, community insights, urban planning data, and development analytics. What would you like to explore?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      message: userMessage,
      response: '',
      user_id: 'user',
      timestamp: new Date().toISOString(),
      context
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await apiClient.sendChatMessage(userMessage, context);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: userMessage,
        response: response.response,
        user_id: 'bot',
        timestamp: new Date().toISOString(),
        context
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: userMessage,
        response: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        user_id: 'bot',
        timestamp: new Date().toISOString(),
        context
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg gradient-primary text-white z-50"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={cn(
      "fixed bottom-6 right-6 w-96 shadow-xl z-50 transition-all duration-300",
      isMinimized ? "h-16" : "h-[500px]"
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-sm">Kilimani AI Assistant</CardTitle>
            {context?.type && (
              <Badge variant="outline" className="text-xs mt-1">
                {context.type === 'building' ? 'Building Context' : 
                 context.type === 'project' ? 'Project Context' : 'General'}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  {message.message && (
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  )}
                  {message.response && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2 max-w-[80%]">
                        <div className="flex items-center space-x-2 mb-1">
                          <Bot className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium text-primary">Kilimani AI</span>
                        </div>
                        <p className="text-sm">{message.response}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-3 w-3 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about buildings, feedback, or urban planning..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}