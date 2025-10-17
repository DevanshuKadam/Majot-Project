import { create } from 'zustand';

const useChatStore = create((set) => ({
  // Chat state
  messages: [
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you manage your shop today?',
      timestamp: new Date().toISOString(),
    }
  ],
  
  // UI state
  isChatPanelOpen: true,
  
  // Agent activity
  activeAgents: [],
  agentLogs: [],
  
  // Shop info
  shopInfo: {
    name: 'Devanshu\'s Store',
    owner: 'Devanshu',
    location: 'Mumbai, India',
  },
  
  // Actions
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    }]
  })),
  
  toggleChatPanel: () => set((state) => ({
    isChatPanelOpen: !state.isChatPanelOpen
  })),
  
  setChatPanelOpen: (isOpen) => set({ isChatPanelOpen: isOpen }),
  
  addAgentLog: (log) => set((state) => ({
    agentLogs: [...state.agentLogs, {
      ...log,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    }]
  })),
  
  setActiveAgents: (agents) => set({ activeAgents: agents }),
  
  updateShopInfo: (info) => set((state) => ({
    shopInfo: { ...state.shopInfo, ...info }
  })),
  
  clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;
