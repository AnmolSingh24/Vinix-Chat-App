import { create } from "zustand";

export const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));


export const useGroup = create((set) => ({
    selectedGroup: null,
    setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
    groups: [],
    setGroups: (groups) => set({ groups }),
}));