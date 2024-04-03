import { create } from "zustand";

const useConversation = create ((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
}));

export default useConversation;


// export const useGroup = create ((set) => ({
//     selectedGroup: null,
//     setSelectedGroup: (selectedGroup) => set({selectedGroup}),
//     messages: [],
//     setMessages: (messages) => set({messages}),
// }));