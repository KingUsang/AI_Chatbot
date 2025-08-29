'use client';
import {useState, useReducer, useEffect, useRef} from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Messages from '@/components/Messages';
import InputArea from '@/components/InputArea';
import chatsReducer from '@/state/chatsReducer';
import initialChats from '@/state/initialChats';
import {ToastContainer, toast} from 'react-toastify';
import {Geist} from 'next/font/google';

const geist = Geist({
	subsets: ['latin']
});
const LOCAL_STORAGE_KEY = 'mygpt_chats';
const loadInitialChats = () => {
	try {
		const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
		return saved ? JSON.parse(saved) : initialChats;
	} catch (e) {
		console.error('Failed to load chats from localStorage', e);
		return [];
	}
};

export default function Home() {
	const [chats, dispatch] = useReducer(chatsReducer, [], loadInitialChats);
	const messagesEndRef = useRef(null);
	// save to localStorage whenever chats change
	const {messages} = chats.find((c) => c.isActive) || {};
	const scrollToBottom = () => {
	  messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
	};
	
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chats));
	}, [chats]);
	useEffect(scrollToBottom, [messages])

	
	const handleAddChat = () => {
		dispatch({type: 'ADD_CHAT'});
	};
	const handleAddMessage = (message) => {
		dispatch({type: 'ADD_MESSAGE', message});
	};
	const handleSwitchChat = (chatId) => {
		dispatch({type: 'SWITCH_CHAT', chatId});
	};
	const handleRenameChat = (chatId, title) => {
		dispatch({type: 'RENAME_CHAT', chatId, title});
	};
	const handleDeleteChat = (chatId) => {
		dispatch({type: 'DELETE_CHAT', chatId});
	};

	return (
		<div className={`flex h-full bg-dark-bg text-white ${geist.className}`}>
			<ToastContainer draggable theme="dark" />
			<Sidebar
				chats={chats}
				onSwitchChat={handleSwitchChat}
				onRenameChat={handleRenameChat}
				onDeleteChat={handleDeleteChat}
			/>
			<div className="flex-1 flex h-full flex-col">
				<Header onAddChat={handleAddChat} />
				<Messages messagesEndRef={messagesEndRef} messages={messages || []} />
			
				<InputArea messages={messages || []} onAddMessage={handleAddMessage} />
			</div>
		</div>
	);
}
