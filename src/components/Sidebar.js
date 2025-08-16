import { useState } from "react"
import { MessageSquare, Pencil, Trash2, User, Bot, TableProperties  } from 'lucide-react'
import { useChats, useChatsDispatch } from "@/ConversationContext"

const Sidebar = () => {
  const chats = useChats()
  const dispatch = useChatsDispatch()
  const [showSidebar, setShowSidebar] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  const activeChatId = chats.find(c => c.isActive)
  const changeActiveChat = (id) => {
    dispatch({
      type: "changed active chat",
      id
    }) 
  }
  
  const handleEdit = () => {
    dispatch({
      type: "edit chat",
      id: activeChatId
    })
  } 

  const handleDelete = () => {
    dispatch({
      type: "delete chat",
      id: activeChatId
    })
  } 
  
  const toggleSidebar = () => setShowSidebar(prev => !prev)
  //TODO: add functionality of adding confirm modal before deleting
  return (
    <>
    <button onClick={toggleSidebar}  className={`fixed top-8 ${showSidebar ? "left-72" : "left-4" } z-30 sm:hidden transition-transform`}>
      <TableProperties />
    </button>
    <div className={`w-80 py-3 bg-dark-sidebar border-r border-gray-700 flex flex-col ${showSidebar ? "translate-x-0" : "-translate-x-full"} fixed inset-0 z-20 transition-transform sm:relative sm:translate-x-0`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-accent rounded-full flex items-center justify-center">
            <Bot size={16} />
          </div>
          <span className="font-semibold">MyGPTbot.ai</span>
        </div>
      </div>

      {/* Chats/Conversations */}
      <div className="flex-1 p-4">
        <nav>
          <ul className="space-y-2">
          {chats?.map(c => (
            <li
              key={c.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                c.isActive 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <button onClick={() => !c.isActive && changeActiveChat(c.id)} className="cursor-pointer flex gap-2 w-2/3">
                <MessageSquare size={18} />
                
                <span className="text-sm">{c.title || "New Chat"}</span>
              </button>
              <div className="space-x-4">
                {/* Edit */}
                <button>
                  <Pencil />
                </button>
                {/* Delete */}
                <button>
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">User Account</div>
            <div className="text-xs text-gray-400">Free Plan</div>
          </div>
        </div>
      </div>
    </div>
    {/* overlay */}
    {showSidebar && <div onClick={toggleSidebar} className="fixed z-10 inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm transition-opacity duration-500 opacity-100" />}
    </>
  )
}

export default Sidebar
