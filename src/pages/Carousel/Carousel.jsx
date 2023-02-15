import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { CaruselColumn } from "./CarouselColumn";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import "./Carousel.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import "../../components/ImageUpload/ImageUpload.css";
import "../../components/ToggleSwitch/ToggleSwitch.css";
import {
	ToastAlertDelete,
	ToastAlertDeleteWithId,
	ToastAlertEditWithId,
	ToastAlertPost,
	ToastContainerr,
} from "../../components/Toastify";
import { useQueryData } from "../../hook";
import { useForm } from "react-hook-form";

export const Carousel = () => {
	const { data, refetch, error, status } = useQueryData("carusel", "carousel");
	const { register, reset, handleSubmit } = useForm();
	const editForm = useForm()
	let [firstPhotos, setFirstPhotos] = useState(null);
	const [postCarusel, setPostCarusel] = useState(false);
	const [editCarusel, setEditCarusel] = useState(false);
	const [deleteCarusel, setDeleteCarusel] = useState(false);
	const [idd, setId] = useState(0);
	const [findedData, setFindedData] = useState({});
	const [count, setCount] = useState(0)

	useEffect(() => {},[count])


	Array.isArray(data)
		? data?.map(
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

	const handleFirstInputChange = (evt) => {
		let target = evt.target.files;
		if (!target.length) {
			setFirstPhotos(defaultImg);
		}
		setFirstPhotos(target[0]);
	};

	const columns = useMemo(() => CaruselColumn, []);

	// Post carusel
	const handleFormSubmit = (handled) => {
		const data = new FormData();
		data.append("title", handled.title);
		data.append("image", handled.photo[0]);
		ToastAlertPost("carousel", data, setPostCarusel);
		refetch()
		setFirstPhotos(null)
	};

	/* Editing proccess start */

	// Get button id
	const edit = (id) => {
		setEditCarusel(true);
		setId(id);
		const finded = data?.find((item) => item.id === id);
		setFindedData(finded);
		
	};

	// Function for edit

	// FormSubmit for edit
	const handleFormEdit = (handled) => {
		const data = new FormData();
		data.append("title", handled.title);
		data.append("image", handled.photo[0]);
		ToastAlertEditWithId("carousel", data, idd, setEditCarusel );
		setCount(count+1)
	};

	/* Editing proccess end */

	/* Deleting proccess start */

	//Get button id
	const deleting = (id) => {
		setId(id);
		setDeleteCarusel(true);
	};

	//handle delete button on confirm modal
	const submitDeleting = () => {
		ToastAlertDelete("carousel", idd, setDeleteCarusel);
		refetch()
		setDeleteCarusel(false)
	};

	//handle cancel button on confirm modal
	const cancelDeleting = () => {
		setDeleteCarusel(false);
	};

	/* Deleting proccess end */

	return (
		<div className="carusel p-5 position-relative">
			<Modal
				title={"Carusel qo'shish"}
				modal={postCarusel}
				setModal={setPostCarusel}
				width={"50%"}
				height={"40%"}
			>
				<form className="row" onSubmit={handleSubmit(handleFormSubmit)}>
					<div className="col">
						<span className="image-upload position-relative">
							<input
								type="file"
								{...register("photo")}
								className="opacity-0 position-absolute"
								onChange={handleFirstInputChange}
								required
							/>
							{firstPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(firstPhotos)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
					</div>

					<div className="col">
						<label className="label">
							Carusel nomi
							<input
								autoFocus
								{...register("title")}
								type="text"
								className="input"
								placeholder="Masalan: Kechalari sokin dam oling..."
								required
							/>
						</label>
					<Button />
					</div>
				</form>
			</Modal>

			<Modal
				title={"Kategoriyani o'zgartirish"}
				modal={editCarusel}
				setModal={setEditCarusel}
				width={"50%"}
				height={"40%"}
			>
				<form className="row" onSubmit={editForm.handleSubmit(handleFormEdit)}>
					<div className="col">
						<span className="image-upload position-relative">
							<input
								type="file"
								{...editForm.register("photo")}
								className="opacity-0 position-absolute"
								onChange={handleFirstInputChange}
								required
							/>
							{firstPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(firstPhotos)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
					</div>

					<div className="col">
						<label className="label">
							Carusel nomi
							<input
								autoFocus
								{...editForm.register("title")}
								defaultValue={findedData.title}
								type="text"
								className="input"
								placeholder="Masalan: Kechalari sokin dam oling..."
								required
							/>
						</label>
					<Button text={"Saqlash"}/>
					</div>
				</form>
			</Modal>
			<button
				type="submit"
				className="reusable"
				onClick={() => setPostCarusel(true)}
			>
				Qo'shish
			</button>
			<Modal
				title={"Haqiqatdan ham o’chirmoqchimisiz?"}
				modal={deleteCarusel}
				setModal={setDeleteCarusel}
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
			{data?.length ? (
				<Table columns={columns} data={data} />
			) : status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : error?.message === "Network Error" ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) : !data?.length ? (
				<h3>Carusellar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
			) : (
				""
			)}
		</div>
	);
};
