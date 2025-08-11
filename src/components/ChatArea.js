import React from 'react'
import { Send } from 'lucide-react'
import MessageBubble from './MessageBubble'
import Header from './Header'
import Messages from './Messages'
import InputArea from './InputArea'
import { useChats } = "./../Conversation"

const ChatArea = () => {

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <Header />

      {/* Messages Area */}
      <Messages />

      {/* Input Area */}
      <InputArea />
    </div>
  )
}

export default ChatArea
