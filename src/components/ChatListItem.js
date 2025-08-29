import {useState} from 'react';
import {MessageSquare, Pencil, Trash2, Check, X} from 'lucide-react';
import AlertModal from '@/components/AlertModal';

const ChatListItem = ({chat, onSwitchChat, onRenameChat, onDeleteChat}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(chat.title);

	const handleStartEdit = () => {
		setIsEditing(true);
		setEditValue(chat.title);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditValue(chat.title);
	};

	const handleSubmitEdit = (e) => {
		e.preventDefault();
		if (editValue.trim() !== '') {
			onRenameChat(chat.id, editValue.trim());
		}
		setIsEditing(false);
	};

	return (
		<li
			className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
				chat.isActive
					? 'bg-gray-700 text-white'
					: 'text-gray-400 hover:bg-gray-700 hover:text-white'
			}`}
		>
			<div className="flex gap-2 w-2/3 items-center">
				<MessageSquare size={18} />
				{isEditing ? (
					<form
						onSubmit={handleSubmitEdit}
						className="flex items-center gap-2 flex-1"
					>
						<input
							autoFocus
							type="text"
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
							onKeyDown={(e) => e.key === 'Escape' && handleCancelEdit()}
							onBlur={handleSubmitEdit}
							className="bg-transparent border-b border-gray-500 focus:outline-none text-sm flex-1"
						/>
						<button type="submit">
							<Check size={30} className="text-green-400" />
						</button>
						<button type="button" onClick={handleCancelEdit}>
							<X size={30} className="text-red-400" />
						</button>
					</form>
				) : (
					<button
						onClick={() => onSwitchChat(chat.id)}
						className="cursor-pointer truncate text-left w-full"
					>
						{chat.title || 'New Chat'}
					</button>
				)}
			</div>

			{!isEditing && chat.isActive && (
				<div className="flex gap-3">
					<button onClick={handleStartEdit}>
						<Pencil />
					</button>
					<AlertModal
						title="Delete Chat?"
						message="Are you sure you want to Clear this Chat? This action cannot be undone."
						onConfirm={() => onDeleteChat(chat.id)}
						trigger={
							<button>
								<Trash2 />
							</button>
						}
					/>
				</div>
			)}
		</li>
	);
};

export default ChatListItem;
