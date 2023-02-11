import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useQueryData } from "../../hook";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import {
	ToastAlertDelete,
	ToastAlertEdit,
	ToastAlertEditWithId,
	ToastAlertPost,
	ToastAlertPostWithId,
	ToastContainerr,
} from "../../components/Toastify";
import "../../components/ImageUpload/ImageUpload.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import "./Technology.css";
import "../../components/ToggleSwitch/ToggleSwitch.css";
import { TechColumn } from "./TechColumn";
import { Token } from "../../auth";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_IMG_URL;

export const Technology = () => {
	const [isToggled, setIsToggled] = useState(false);
	const techData = useQueryData("technology");
	const [postTech, setPostTech] = useState(false);
	const [editTech, setEditTech] = useState(false);
	const [deleteTech, setDeleteTech] = useState(false);
	const [idd, setId] = useState(0);
	const [findedData, setFindedData] = useState({});
	const [newPoduct, setNewProduct] = useState(false);

	const nameRef = useRef(null);
	const descRef = useRef(null);
	const linkRef = useRef(null);
	const videoRef = useRef(null);

	const nameRef2 = useRef(null);
	const descRef2 = useRef(null);
	const linkRef2 = useRef(null);
	const videoRef2 = useRef(null);

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
					)) &&
					(item.status = <ToggleSwitch />)
		  )
		: null;

	const form1 = useForm({
		mode: "onChange",
	});

	const { register, handleSubmit } = useForm({
		mode: "onBlur",
	});

	// Form submit
	const formSubmit = (evt) => {
		evt.preventDefault();

		const techPost = {
			"name": nameRef.current.value,
			"thumbnail": linkRef.current.value,
			"link": videoRef.current.value,
			"description": descRef.current.value,
			"isActive": true,
		};


		//Alert for submit info
		ToastAlertPost("technology", techPost, setPostTech);
		techData.refetch();
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
		evt.preventDefault()
		const techEdited = {
			"name": nameRef2.current.value,
			"thumbnail": linkRef2.current.value,
			"link": videoRef2.current.value,
			"description": descRef2.current.value,
			"isActive": true,
		};
		//Alert for submit info
		ToastAlertEditWithId("technology", techEdited, idd, setEditTech);
		
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
		deleteCategory(idd);
	};

	//handle cancel button on confirm modal
	const cancelDeleting = () => {
		setDeleteProduct(false);
	};

	// function for delete
	const deleteCategory = async (id) => {
		ToastAlertDelete("technology", id, setDeleteTech);
		refetch();
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
				<form className="row" onSubmit={(formSubmit)}>
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
						<ToggleSwitch
							isToggled={newPoduct}
							onToggle={() => setNewProduct(!newPoduct)}
						/>
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
						<ToggleSwitch
							isToggled={newPoduct}
							onToggle={() => setNewProduct(!newPoduct)}
						/>
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
				style={{ position: "absolute", bottom: "3rem", right: "0" }}
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
				<h3>Texnologiyalar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
			) : (
				""
			)}
		</div>
	);
};

// import { useMemo } from "react"
// import { Table } from "../../components/Table"
// import { TechColumn } from "./TechColumn"
// import {MdModeEditOutline, MdDelete} from "react-icons/md"
// import "./Technology.css"
// import axios from "axios"
// import { Token } from "../../auth"
// import { useQueryData } from "../../hook"

// export const Technology = () => {

//   const dat = useQueryData("technology")

//   const handle = () => {
//     alert("Working")
//   }

//   setTimeout(() => {
//     console.log(dat)
//   }, 2000)
//   const data = [{
//     tech_name: "Menory foam",
//     tech_description: "Enim urna... ",
//     tech_video_link: "youtube.com...",
//     edit: <button className="p-3"><MdModeEditOutline size={20}/></button>,
//     delete: <button className="p-3"><MdDelete color="red" size={20}/></button>
//   }]

//   const postTech = () => {
//     const obj = {
//       "name":"Texnologiya",
//       "thumbnail":"O'zbekiston tengdur O'zbekistonga",
//       "link":"https://kun.uz",
//       "description":"Bas qillaring! Faqat O'zbekistondami muammolar? Yurtim uchun O'zbekistonim uchun jonim fido! Tez kunda ko'rishamiz",
//       "isActive":true
//     }
//     axios.post("http://localhost:1212/admin/technology", obj, {
//       headers: {
//         Authorization: Token
//       }
//     }).then(res => console.log(res)).catch(err => console.log(err))
//   }

//   const columns = useMemo(() => TechColumn, [])
//   const techData = useMemo(() => data, [])

//   return (
//     <div className="p-5 tech">
//       <Table columns={columns} data={techData}/>
//     </div>
//   )
// }
