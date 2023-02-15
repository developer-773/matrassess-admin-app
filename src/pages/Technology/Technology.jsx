import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { useQueryData } from "../../hook";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import {
	ToastAlertDelete,
	ToastAlertEditWithId,
	ToastAlertPost,
	ToastContainerr,
} from "../../components/Toastify";
import "../../components/ImageUpload/ImageUpload.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import "./Technology.css";
import "../../components/ToggleSwitch/ToggleSwitch.css";
import { TechColumn } from "./TechColumn";

export const Technology = () => {
	const techData = useQueryData("tech", "technology");
	const [postTech, setPostTech] = useState(false);
	const [editTech, setEditTech] = useState(false);
	const [deleteTech, setDeleteTech] = useState(false);
	const [idd, setId] = useState(0);
	const [findedData, setFindedData] = useState({});
	const [count, setCount] = useState(0);

	const nameRef = useRef(null);
	const descRef = useRef(null);
	const linkRef = useRef(null);
	const videoRef = useRef(null);

	const nameRef2 = useRef(null);
	const descRef2 = useRef(null);
	const linkRef2 = useRef(null);
	const videoRef2 = useRef(null);
	const toggleRef2 = useRef(false);

	useEffect(() => {}, [count]);

	// Memoize table head
	const columns = useMemo(() => TechColumn, []);
	const data = useMemo(() => techData?.data, []);

	// Add edit and delete buttons for backend data to render on table
	Array.isArray(techData?.data)
		? techData?.data?.map(
				(item) =>
					(item.edit = (
						<button
							className="btn-edit"
							data-id={item.id}
							onClick={(e) => edit(+e.target.dataset.id)}
							type="button"
						></button>
					)) &&
					(item.delete = (
						<button
							className="btn-delete"
							data-id={item.id}
							type="button"
							onClick={(e) => deleting(+e.target.dataset.id)}
						></button>
					))
		  )
		: null;

	// Form submit
	const formSubmit = (evt) => {
		evt.preventDefault();

		const techPost = {
			name: nameRef.current.value,
			thumbnail: linkRef.current.value,
			link: videoRef.current.value,
			description: descRef.current.value,
			isActive: true,
		};

		//Alert for submit info
		ToastAlertPost("technology", techPost, setPostTech);
		techData.refetch();
		setCount((prev) => prev + 1);
	};

	/* Editing proccess start */

	// Get button id
	const edit = (id) => {
		setEditTech(true);
		setId(id);
		let finded = techData?.data?.find((obj) => obj.id === id);
		setFindedData(finded);
	};

	// FormSubmit for edit
	const formSubmitEdited = (evt) => {
		evt.preventDefault();
		const techEdited = {
			name: nameRef2.current.value,
			thumbnail: linkRef2.current.value,
			link: videoRef2.current.value,
			description: descRef2.current.value,
			isActive: true,
		};
		//Alert for submit info
		ToastAlertEditWithId("technology", techEdited, idd, setEditTech);
		techData.refetch();
		setCount(count + 1);
	};

	/* Editing proccess end */

	/* Deleting proccess start */

	//Get button id
	const deleting = (id) => {
		setId(id);
		setDeleteTech(true);
	};

	//handle delete button on confirm modal
	const submitDeleting = () => {
		ToastAlertDelete("technology", idd, setDeleteTech);
	};

	//handle cancel button on confirm modal
	const cancelDeleting = () => {
		setDeleteProduct(false);
	};

	/* Deleting proccess end */

	return (
		<div className="p-5 tech ">
			<Modal
				modal={postTech}
				setModal={setPostTech}
				title={"Texnologiyalar qo'shish"}
				width={"80%"}
				height={"77%"}
			>
				<form className="row" onSubmit={formSubmit}>
					<div className="col">
						<label className="label mb-5">
							Texnologiya nomi
							<input
								ref={nameRef}
								type="text"
								className="input"
								placeholder="masalan: Menory foam"
								required
							/>
						</label>

						<label className="label mb-5">
							Batafsil nomi
							<input
								type="text"
								ref={descRef}
								className="input"
								placeholder="Batafsil..."
								required
							/>
						</label>
						<span className="d-flex justify-content-between">
							<label className="label">Novinka</label>
							<label className="toggle-switch">
								<input type="checkbox" />
								<span className="switch"></span>
							</label>
						</span>
					</div>
					<div className="col">
						<label className="label mb-5">
							Rasm
							<input
								type="text"
								className="input"
								ref={linkRef}
								placeholder="Videoning rasmi"
								required
							/>
						</label>
						<label className="label mb-5">
							Video
							<input
								type="text"
								className="input"
								ref={videoRef}
								placeholder="Youtube link"
								required
							/>
						</label>
						<Button />
					</div>
				</form>
			</Modal>
			<Modal
				modal={editTech}
				setModal={setEditTech}
				title={"Texnologiyani o'zgartirish"}
				width={"80%"}
				height={"77%"}
			>
				<form className="row" onSubmit={formSubmitEdited}>
					<div className="col">
						<label className="label mb-5">
							Texnologiya nomi
							<input
								defaultValue={findedData?.name}
								ref={nameRef2}
								type="text"
								className="input"
								placeholder="masalan: Menory foam"
								required
							/>
						</label>

						<label className="label mb-5">
							Batafsil nomi
							<input
								type="text"
								defaultValue={findedData.description}
								ref={descRef2}
								className="input"
								placeholder="Batafsil..."
								required
							/>
						</label>

						<span className="d-flex justify-content-between">
							<label className="label">Novinka</label>
							<label className="toggle-switch">
								<input type="checkbox" ref={toggleRef2} />
								<span className="switch"></span>
							</label>
						</span>
					</div>
					<div className="col">
						<label className="label mb-5">
							Rasm
							<input
								type="text"
								className="input"
								defaultValue={findedData.thumbnail}
								ref={linkRef2}
								placeholder="Videoning rasmi"
								required
							/>
						</label>
						<label className="label mb-5">
							Video
							<input
								type="text"
								className="input"
								defaultValue={findedData.link}
								ref={videoRef2}
								placeholder="Youtube link"
								required
							/>
						</label>
						<Button />
					</div>
				</form>
			</Modal>
			<button
				type="submit"
				className="reusable"
				onClick={() => setPostTech(true)}
			>
				Qo'shish
			</button>
			<Modal
				title={"Haqiqatdan ham o’chirmoqchimisiz?"}
				modal={deleteTech}
				setModal={setDeleteTech}
				width={"30%"}
				height={"23%"}
			>
				<div className="d-flex justify-content-end">
					<button
						className="fw-bold border-0 btn btn-outline-dark p-3 ps-5 pe-5"
						onClick={cancelDeleting}
					>
						YO'Q
					</button>
					<button
						className="fw-bold border-0 btn btn-light text-danger p-3 ps-5 pe-5"
						onClick={submitDeleting}
					>
						HA
					</button>
				</div>
			</Modal>
			<ToastContainerr />
			{techData?.data?.length ? (
				<Table columns={columns} data={techData?.data} />
			) : techData?.status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : techData?.error?.message === "Network Error" ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) : !techData?.data?.length ? (
				setTimeout(() => {
					<h3>Texnologiyalar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
				  },2500)
			) : (
				""
			)}
		</div>
	);
};
