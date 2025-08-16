import { useState } from "react"
import { useChats, useChatsDispatch } from "@/ConversationContext"
import { Send, LoaderCircle } from 'lucide-react'
import { toast } from 'react-toastify'

function generateTitleFromMessage(message, maxLength = 50) {
  if (!message) return "New Chat"
  const trimmed = message.trim()
  // If there's a sentence end early on, use that
  const firstSentence = trimmed.split(/[.!?]/)[0]
  if (firstSentence.length <= maxLength) {
    return firstSentence
  }
  return firstSentence.slice(0, maxLength).trim() + "..."
}


// refactor my code to use reducer at App.jsx and pass state props and handlers to children
async function queryAssistant(messages) {
	const response = await fetch(
		"https://openrouter.ai/api/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_AI_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ 
        model: 'openai/gpt-4o',
        max_tokens: 1000,
        messages
      }),
		}
	)
	const result = await response.json()
	alert(JSON.stringify(result))
	return result
}

const InputArea = () => {
  const [inputMessage, setInputMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const chats= useChats()
  const dispatch = useChatsDispatch()
  
  const messages = chats.find(c => c.isActive).messages
  
  const toastError = (msg) => toast(msg)
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && inputMessage.trim()) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  //handleSendMessage should be broken to smaller components and renamed to handle submit
  //also textarea should be focused after 
  
  const handleSendMessage = () => {
    setIsSubmitting(true)
    const newMessage = {
      id: Math.random(),
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    }
    
    
    queryAssistant([...messages, newMessage]).then((assistantResponse) => {
      if(assistantResponse.error) throw new Error(assistantResponse.error)
      
      dispatch({
        type: "added message",
        message: newMessage
      })
      
      dispatch({
        type: "added message",
        message: {
          ...assistantResponse.choices[0].message, 
          id: Math.random(), 
          timestamp: new Date()
        }
      })
      
      setInputMessage('')
      
      //If this is the first message in the chat, set the title of the chat to be the the user's message
      if(messages.length === 0) {
        dispatch({ 
          type: "edited chat",
          id: chats.find(c => c.isActive).id,
          title: generateTitleFromMessage(inputMessage) 
        })
      }
    }).catch(err => {
      console.error(err)
      alert(JSON.stringify(err))
      toastError(err)
    }).finally(() => setIsSubmitting(false))
  }
  
  return (
    <div className="px-4 py-6 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="w-full bg-dark-card border border-gray-600 rounded-lg p-3 has-[:focus]:border-purple-accent">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask myGPTbot.ai anything..."
            className="w-full text-white placeholder-gray-400 resize-none transition-colors focus:outline-none"
            rows="2"
          />
          <div className="flex flex-row-reverse">
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isSubmitting}
              className="bg-purple-accent relative hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded-lg transition-colors "
            >
            {isSubmitting ? 
              <LoaderCircle size={20} className="animate-spin" />
                : 
              <Send size={20} />}
           </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputArea