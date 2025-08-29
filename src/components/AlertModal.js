import Modal from '@/components/Modal';

const AlertModal = ({
	title = 'Clear?',
	message = 'Are your Sure?',
	onConfirm,
	confirmText = 'Clear',
	cancelText = 'Cancel',
	trigger
}) => {
	return (
		<Modal>
			<Modal.Trigger>{trigger}</Modal.Trigger>
			<Modal.Content>
				<Modal.Header title={title} danger={true} />
				<form method="dialog">
					<label>{message}</label>

					<div className="w-full flex gap-4 pt-4">
						<button
							onClick={onConfirm}
							className="flex-1 py-2 bg-red-500 text-white rounded-full transition-colors font-medium"
						>
							{confirmText}
						</button>
						<button className="flex-1  py-2 text-black bg-gray-100 rounded-full transition-colors font-medium">
							{cancelText}
						</button>
					</div>
				</form>
			</Modal.Content>
		</Modal>
	);
};

export default AlertModal;
