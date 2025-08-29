function chatsReducer(chats, action) {
	switch (action.type) {
		case 'ADD_CHAT': {
			// Don't add a new chat if the previous chat you added doesn't have a message yet but rather make it active
			if (chats[0].messages.length === 0) {
				return chats.map((c, i) => (i === 0 ? {...c, isActive: true} : c));
			}
			// deactivate all existing chats
			const updatedChats = chats.map((chat) => ({...chat, isActive: false}));
			// create new chat
			const newChat = {
				id: Math.random(),
				title: action.title || 'New Chat',
				isActive: true,
				messages: []
			};

			return [newChat, ...updatedChats];
		}

		case 'ADD_MESSAGE': {
			if (!chats.length) {
				chats = [{id: Math.random(), isActive: true, messages: []}];
			}
			return chats.map((chat) => {
				if (!chat.isActive) return chat;
				// add the message to the currently active chat
				return {
					...chat,
					// give it a title if it is the very first message
					title:
						chat.messages.length === 0
							? generateTitleFromMessage(action.message.content)
							: chat.title,
					messages: [
						...chat.messages,
						{...action.message, id: Math.random(), timestamp: new Date()}
					]
				};
			});
		}

		case 'SWITCH_CHAT': {
			return chats.map((chat) => ({
				...chat,
				isActive: chat.id === action.chatId
			}));
		}

		// edit the title of a particular chat
		case 'RENAME_CHAT': {
			return chats.map((chat) => {
				if (chat.id !== action.chatId) return chat;
				return {...chat, title: action.title};
			});
		}

		//delete a particular chat
		case 'DELETE_CHAT': {
			const remainingChats = chats.filter((chat) => chat.id !== action.chatId);

			// Ensure exactly one active chat
			return remainingChats.map((chat, index) => {
				// If no one is active, activate the first
				if (!remainingChats.some((c) => c.isActive)) {
					return {...chat, isActive: index === 0};
				}
				// Otherwise keep only the existing active one
				return {...chat, isActive: chat.isActive};
			});
		}

		default:
			throw new Error(`unknown action: '${action.type}' action was fired`);
			break;
	}
}

export default chatsReducer;

function generateTitleFromMessage(message, maxLength = 50) {
	if (!message) return 'New Chat';
	const trimmed = message.trim();
	// If there's a sentence end early on, use that
	const firstSentence = trimmed.split(/[.!?]/)[0];
	if (firstSentence.length <= maxLength) {
		return firstSentence;
	}
	return firstSentence.slice(0, maxLength).trim() + '...';
}
