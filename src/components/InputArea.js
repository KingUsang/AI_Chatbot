import { useState } from "react"
import { useChatsDispatch } = "./../Conversation.js"
import { Send, LoaderCircle } from 'lucide-react'
import { toast } from 'react-toastify'


async function queryAssistant(data) {
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${process.env.HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ 
        messages : {...messages, newMessage},
        model: "deepseek-ai/DeepSeek-V3-0324"
      }),
		}
	);
	const result = await response.json();
  console.log(JSON.stringify(result));
	return result;
}

const InputArea = () => {
  const [inputMessage, setInputMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useChatsDispatch()
  
  const toastError = () => toast('Sorry, we encountered an error while sending your message')
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && inputMessage.trim()) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  
  const handleSendMessage = () => {
    setIsSubmitting(true)
    const message = {
      id: messages.length + 1,
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    }
    
    
    queryAssistant().then((assistantResponse) => {
      dispatch({
        type: "added",
        message
      })
      dispatch({
        type: added,
        message: {
          ...assistantResponse.choices[0].message, 
          id: Math.random(), 
          timestamp: new Date()
        }
      })
      console.log(JSON.stringify(assistantResponse));
    }).catch(err => {
      console.error(err)
      toastError()
    }).finally(() => setIsSubmitting(false))
  }
  
  return (
    <div className="p-6 border-t border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask myGPTbot.ai anything..."
            className="w-full bg-dark-card border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-accent transition-colors"
            rows="3"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="bg-purple-accent relative hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded-lg transition-colors "
        >
          {isSubmitting && <LoaderCircle className="animate-spin absolute inset-12" />}
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}