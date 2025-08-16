import { useChatsDispatch } from "@/ConversationContext"

const Header = () => {
  const dispatch = useChatsDispatch()
  
  const handleNewChat = () => {
    const id = Math.random()
    dispatch({
      type: "added chat",
      id ,
    })
    dispatch({
      type : "changed active chat",
      id
    })
  }
  
  return (
    <div className="p-6 border-b border-gray-700">
      <div className="flex items-center justify-between pl-8">
        <div>
          <h1 className="text-2xl font-semibold">AI Assistant</h1>
          <p className="text-gray-400 text-sm">How can I help you today?</p>
        </div>
        <button onClick={handleNewChat} className="bg-purple-accent hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          New Chat
        </button>
      </div>
    </div>
  )
}

export default Header