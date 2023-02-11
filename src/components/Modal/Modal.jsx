import ReactModal from "react-modal";

export const Modal = ({ title, modal, setModal, children, width, height }) => {
	ReactModal.setAppElement("#root");

	const modalStyle = {
		overlay: {
			position: "fixed",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			zIndex: "11",
			backgroundColor: "rgba(0, 0, 0, 0.4",
		},
		content: {
			width: width,
			height: height,
			margin: "auto",
		},
	};

	const closeBtnStyle = {
		position: "absolute",
		top: 0,
		right: 0,
		background: "#01384D",
		color: "#fff",
		borderRadius: 0,
	};

	return (
		<ReactModal
			isOpen={modal}
			style={modalStyle}
			onRequestClose={() => setModal(false)}
		>
			<h3 className="mb-5">{title}</h3>
			<button onClick={() => setModal(false)} style={closeBtnStyle}>
				&times;
			</button>
			<div className="modal-content">{children}</div>
		</ReactModal>
	);
};
