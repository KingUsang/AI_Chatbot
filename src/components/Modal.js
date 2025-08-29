import {forwardRef} from 'react';
import {useState, useRef, useEffect, createContext, useContext} from 'react';
import {X} from 'lucide-react';

const ModalContext = createContext();

const Modal = ({children}) => {
	const modalRef = useRef(null);

	return (
		<ModalContext.Provider value={modalRef}>
			<div>{children}</div>
		</ModalContext.Provider>
	);
};

Modal.Trigger = ({children}) => {
	const modalRef = useContext(ModalContext);
	return (
		<div
			onClick={() => modalRef.current.showModal()}
			className="cursor-pointer"
		>
			{children}
		</div>
	);
};

Modal.Content = ({children}) => {
	const modalRef = useContext(ModalContext);
	return (
		<dialog
			ref={modalRef}
			className="bg-black rounded-lg w-[90vw] max-w-md max-h-[90vh] overflow-y-auto opacity-0 scale-0 
      transition-all duration-700-3000 open:opacity-100 open:scale-100 starting:open:opacity-0 starting:open:scale-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
		>
			<div className="p-6 text-white">{children}</div>
		</dialog>
	);
};

Modal.Header = ({title,danger, children}) => {
	const modalRef = useContext(ModalContext);
	const closeModal = () => modalRef.current.close();
	return (
		<div className="flex items-center justify-between mb-4">
			<h2 className={`text-lg font-semibold ${danger ? "text-red-500" : "text-gray-900"} w-4/5 `}>{title}</h2>
			{children}
			<button
				onClick={closeModal}
				className="text-gray-400 hover:text-gray-600 transition-colors"
			>
				<X className="w-5 h-5" />
			</button>
		</div>
	);
};

export default Modal;
