import { MessageSquare, Settings, HelpCircle, User, Plus } from 'lucide-react'
import { useChats, useDispatchChats } = "@/Conversation.js"

const Sidebar = () => {
  const chats = useChats()
  const dispatch = useDispatchChats()
  const [showSidebar, setShowSidebar] = useState('false')
  
  const changeActiveChat = (id) => {
    dispatch({
      type: "changed active chat"
      id
    }) 
  }
  
  return (
    <div className="w-80 bg-dark-sidebar border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-accent rounded-full flex items-center justify-center">
            <MessageSquare size={16} />
          </div>
          <span className="font-semibold">myGPTbot.ai</span>
        </div>
      </div>

      {/* Chats/Conversations */}
      <div className="flex-1 p-4">
        <nav>
          <ul className="space-y-2">
          {chats.map(c => (
            <li
              key={c.id}
            >
              <button className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                c.isActive 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
                onClick={}
              >
                <MessageSquare size={18} />
                <span className="text-sm">{c.title}</span>
              </button>
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
  )
}

export default Sidebar
