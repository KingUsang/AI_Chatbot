const initialChats = [
	{
		id: Math.random(),
		title: 'Daily Catch-up',
		isActive: true,
		messages: [
			{
				id: 1,
				content: 'Hey there! How’s your day going so far?',
				role: 'assistant',
				timestamp: new Date()
			},
			{
				id: 2,
				content: 'Pretty good, just got back from class. What about you?',
				role: 'user',
				timestamp: new Date()
			},
			{
				id: 3,
				content:
					'Glad to hear that! I’ve been helping lots of people with their questions today 😊',
				role: 'assistant',
				timestamp: new Date()
			},
			{
				id: 4,
				content: 'Nice! Can you give me a productivity tip?',
				role: 'user',
				timestamp: new Date()
			},
			{
				id: 5,
				content:
					'Sure! Try the Pomodoro technique—25 minutes of focused work followed by a 5-minute break. It really helps maintain focus.',
				role: 'assistant',
				timestamp: new Date()
			}
		]
	},
	{
		id: Math.random(),
		title: 'Travel Plans',
		isActive: false,
		messages: [
			{
				id: 1,
				content: 'Where would you like to travel if you had a free weekend?',
				role: 'assistant',
				timestamp: new Date()
			},
			{
				id: 2,
				content: 'I’d love to visit Paris and see the Eiffel Tower!',
				role: 'user',
				timestamp: new Date()
			},
			{
				id: 3,
				content:
					'That’s a great choice! The Eiffel Tower sparkles at night every hour on the hour ✨',
				role: 'assistant',
				timestamp: new Date()
			},
			{
				id: 4,
				content: 'Wow, I didn’t know that. What else can I do there?',
				role: 'user',
				timestamp: new Date()
			},
			{
				id: 5,
				content:
					'You can enjoy a boat ride on the Seine River, visit the Louvre, or try some authentic croissants at a Parisian café 🥐',
				role: 'assistant',
				timestamp: new Date()
			}
		]
	}
];

export default initialChats