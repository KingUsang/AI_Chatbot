import React from 'react';
import {Bot, User} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({message}) => {
	const {content, role, timestamp} = message;
	const isBot = message.role === 'assistant';

	return (
		<div className={`flex items-start  ${isBot ? '' : 'flex-row-reverse'}`}>
			<div
				className={`flex items-start gap-2 ${isBot ? '' : 'flex-row-reverse'}`}
			>
				{/* Avatar */}
				<div
					className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
						isBot ? 'bg-purple-accent' : 'bg-blue-accent'
					}`}
				>
					{isBot ? <Bot size={16} /> : <User size={16} />}
				</div>

				{/* Message Content */}
				<div
					className={`flex flex-col max-w-xs lg:max-w-md ${
						isBot ? 'items-start' : 'items-end'
					}`}
				>
					<div
						className={`px-4 py-3 rounded-2xl text-white w-full overflow-auto ">
							 ${isBot ? 'bg-dark-card rounded-tl-sm' : 'bg-blue-accent rounded-tr-sm'}`}
					>
						<div className="prose prose-sm prose-pre:w-full dark:prose-invert text-white prose-pre:p-0">
							<ReactMarkdown
								rehypePlugins={[rehypeHighlight, rehypeRaw]}
								children={content}
							></ReactMarkdown>
						</div>
					</div>
          {/*Local Storage doesn't support dates*/}
					{/*<span className="text-xs text-gray-500 mt-1">
						{timestamp.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>*/}
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
{
	/* components={{
                h1: ({ node, ...props }) => <h2 {...props} />,
                h2: ({ node, ...props }) => <h3 {...props} />,
                h3: ({ node, ...props }) => <h4 {...props} />,
                h4: ({ node, ...props }) => <h5 {...props} />,
                h5: ({ node, ...props }) => <h6 {...props} />,
              }} */
}
