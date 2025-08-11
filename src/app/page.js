'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatArea from '@/components/ChatArea'
import { ChatsProvider } from '@/components/ConversationContext'
import { ToastContainer, toast } from 'react-toastify'

export default function Home() {
  // we should instead have a setConversation() state that hold all the conversations
  // and then pass messages of the last conversation to ChatArea
  // We should probably useContext here
  // i should do a refactor of the data flow in this app
  // use context or a data management library to manage the conversations of the user and let it provide the functions to addNewMessage 
  // and also to add new addNewConversation and also changeActiveConverstaion hand then save it to local storage
  // calling the api should be done in a new Input area component and it should have its isSubmitting state

  const [messages, setMessages] = useState([
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
  ])

  const [inputMessage, setInputMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)



  return (
    <div className="flex h-screen bg-dark-bg text-white">
      <ChatsProvider>
        <ToastContainer />
        <Sidebar />
        <ChatArea />
      </ChatsProvider>
    </div>
  )
}
