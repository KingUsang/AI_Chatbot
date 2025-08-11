import { useReducer } from "react";
import { createContext, useContext } from "react";

export const ChatsContext = createContext(null)
export const ChatsDispatchContext = createContext(null)

export const ChatsProvider({ children }) {
  const [chats, dispatch] = useReducer(chatsReducer, initialChats)
  return (
    <ChatsContext value={chats}>
      <ChatsDispatchContext value={dispatch}>
        {children}
      </ChatsDispatchContext>
    </ChatsContext>
  )
}

export function useChats() {
  return useContext(ChatsContext);
}

export function useChatsDispatch() {
  return useContext(ChatsDispatchContext);
}

function chatsReducer(chats, action) {
  switch (action.type) {
    case "added chat": {
      return [
        ...chats,
        {
          id: action.id,
          messages: []
        }
      ]
    }
    case "added message": {
      return chats.map(c => {
        if(c.isActive){
          return {
            ...c,
            messages: [
              ...c.messages,
              action.message
            ]
          }
        }
      })
    }
    case "changed active chat" : {
      return chats.map(c => {
        if(c.isActive){
          return {
            ...c,
            isActive: false
          }
        }else if (c.id === action.id){
          return {
            ...c,
            isActive: true
          }
        }
        return c
      })
    }
  
    default:
      break;
  }
}

const initialChats = [
  {
    id: Math.random(),
    title: "How are you",
    isActive: true,
    messages: [
      {
        id: 1,
        content: "Hi, I'm the best AI. I can get you back from the gym. How about you?",
        role: "assistant",
        timestamp: new Date()
      },
      {
        id: 2,
        content: "What is your favorite food?",
        role: "user",
        timestamp: new Date()
      },
      {
        id: 3,
        content: "My favorite meal of all time is The Godfather Part II. What's your favorite movie?",
        role: "assistant",
        timestamp: new Date()
      },
      {
        id: 4,
        content: "Can you tell me about The Godfather Part II?",
        role: "user",
        timestamp: new Date()
      },
      {
        id: 5,
        content: "I was thinking the Pacman Game and running Robot for some adventure friends.",
        role: "assistant",
        timestamp: new Date()
      }
    ],
  },
  {
    id: Math.random(),
    title: "Effiel Tower",
    isActive: false,
    messages: [
      {
        id: 1,
        content: "Hi, I'm the best AI. I can get you back from the gym. How about you?",
        role: "assistant",
        timestamp: new Date()
      },
      {
        id: 2,
        content: "What is your favorite food?",
        role: "user",
        timestamp: new Date()
      },
      {
        id: 3,
        content: "My favorite meal of all time is The Godfather Part II. What's your favorite movie?",
        role: "assistant",
        timestamp: new Date()
      },
      {
        id: 4,
        content: "Can you tell me about The Godfather Part II?",
        role: "user",
        timestamp: new Date()
      },
      {
        id: 5,
        content: "I was thinking the Pacman Game and running Robot for some adventure friends.",
        role: "assistant",
        timestamp: new Date()
      }
    ]
  }

]