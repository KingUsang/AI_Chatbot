'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatArea from '@/components/ChatArea'
import { ChatsProvider } from '@/ConversationContext'
import { ToastContainer, toast } from 'react-toastify'
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})


export default function Home() {
  
  const [inputMessage, setInputMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className={`flex h-screen bg-dark-bg text-white ${geist.className}`}>
      <ChatsProvider>
        <ToastContainer 
          draggable
          pauseOnHover
          theme="light"
        />
        <Sidebar />
        <ChatArea />
      </ChatsProvider>
    </div>
  )
}
