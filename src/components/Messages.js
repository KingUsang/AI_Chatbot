import { useChats } = "@/Conversation.js"

const Messages = () => {
  const chats = useChats()
  
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {chats.find(c => c.isActive).messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>  
  )  
}

export default Messages