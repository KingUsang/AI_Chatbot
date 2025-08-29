import MessageBubble from './MessageBubble'

const Messages = ({messages, messagesEndRef}) => {
  return (
   
    <div className="flex-1 overflow-y-auto px-3 py-6 sm:p-6 space-y-6">
      {messages.length ? messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      )) : 
        <div className="h-full w-full grid place-items-center">
          <p className="text-5xl leading-16 text-center">What Can I help you with? </p>
        </div>
      }
      	<div ref={messagesEndRef}></div>
    </div>  
  )  
}

export default Messages