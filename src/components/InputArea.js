import {useState,useRef} from 'react';
import {Send, LoaderCircle} from 'lucide-react';
import {toast} from 'react-toastify';
import Groq from 'groq-sdk';

async function queryAssistant(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch response");
  }

  const data = await res.json();
  return data; // the assistant's message
}

const InputArea = ({messages, onAddMessage, scrollToBottom}) => {
	const [inputMessage, setInputMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	const toastError = (msg) => toast(msg);
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey && inputMessage.trim()) {
			e.preventDefault();
			handleSendMessage();
		}
	};
	const handleSendMessage = () => {
		setIsSubmitting(true);
		const userMessage = {
			content: inputMessage,
			role: 'user'
		};
		
		queryAssistant([...messages.map(m =>({role: m.role, content: m.content})), userMessage])
			.then((assistantMessage) => {
				onAddMessage(userMessage);
				onAddMessage(assistantMessage);
				setInputMessage('');
			})
			.catch((err) => {
				console.error(err);
				toastError(err.message);
			})
			.finally(() => setIsSubmitting(false));
	};

	return (
		<div className="p-4 sm:py-6 border-t border-gray-700">
		 
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
							{isSubmitting ? (
								<LoaderCircle size={20} className="animate-spin" />
							) : (
								<Send size={20} />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InputArea;
