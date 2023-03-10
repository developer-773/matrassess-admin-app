import { useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { LocationColumn } from "./LocationColumn";
import "./Location.css";
import "../../components/ImageUpload/ImageUpload.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import { Modal } from "../../components/Modal";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { useQueryData } from "../../hook/useQueryData";
import { ToastAlertDelete, ToastAlertEditWithId, ToastAlertPost, ToastContainerr } from "../../components/Toastify";
import axios from "axios";
import { Token } from "../../auth";

export const Location = () => {
	const {data, error, status, refetch} = useQueryData("location", "address")
	const [isToggled, setisToggled] = useState(false)
	const [postAddress, setPostAddress] = useState(false)
	const [editAddress, setEditAddress] = useState(false)
	const [deleteAddress, setDeleteAddress] = useState(false)
	const defaultImg = new Blob(["For error handling"], {type: "text/plain"})
	const [idd, setId] = useState(0)
	const [findedData, setFindedData] = useState({})
	const [firstPhoto, setFirstPhoto] = useState(null)
	const [secondPhoto, setSecondPhoto] = useState(null)	
	const [thirdPhoto, setThirdPhoto] = useState(null)
	const toggleRef = useRef(null)
	const toggleRef2 = useRef(null)




	// Add edit and delete buttons for backend data to render on table
	Array.isArray(data) ? 
	data.map(
		(item) =>
	(item.edit = (
		<button className="btn-edit"
		data-id={item.id}
		onClick={(e) => edit(+e.target.dataset.id)}
		type="button"
		></button>
	)) && 
	(item.delete = (
		<button className="btn-delete"
		data-id={item.id}
		type="button"
		onClick={(e) => deleting(+e.target.dataset.id)}
		>
		</button>
	))) : null


	const refetchData = () => {
		refetch()
	}


		/* Image upload and preview for user proccess start */

	const handleFirstInputChange = (evt) => {
		let target = evt.target.files
		if(!target.length) {
			setFirstPhoto(defaultImg)
		}
		setFirstPhoto(target[0])
	}

	const handleSecondInputChange = (evt) => {
		let target = evt.target.files
		if(!target.length) {
			setSecondPhoto(defaultImg)
		}

		setSecondPhoto(target[0])
	}

	const handleThirdInputChange = (evt) => {
		let target = evt.target.files
		if(!target.length) {
			setThirdPhoto(defaultImg)
		}
		setThirdPhoto(target[0])
	}
	
		/* Image upload and preview for user proccess end */
	
	// Initialize forms
	const form1 = useForm()
	const form2 = useForm()




	//Submit form
	const formSubmit = (submited) => {

		const data = new FormData()
			data.append("location", submited.address_name),
			data.append("destination", submited.address_description),
			data.append("geolocation", submited.address_location),
			data.append("images", submited.first_image[0]),
			data.append("images", submited.second_image[0]),
			data.append("images", submited.third_image[0]),
			data.append("isActive", true)
			//Request data
			ToastAlertPost("address", data, setPostAddress)
			
			setFirstPhoto(null), setSecondPhoto(null), setThirdPhoto(null)
			refetchData()
	}

	/* Editing proccess start */

	// Get button id
	const edit = (id) => {
		setEditAddress(true);
		setId(id);
		let finded = data?.find((obj) => obj.id === id);
		setFindedData(finded);
	}


	//Edit Form
	const formEdit = (submited) => {

		const data = new FormData()
			data.append("location", submited.address_name),
			data.append("destination", submited.address_description),
			data.append("geolocation", submited.address_location),
			data.append("images", submited.first_image[0]),
			data.append("images", submited.second_image[0]),
			data.append("images", submited.third_image[0]),

			data.append("isActive", true)

			//Request data
			ToastAlertEditWithId("address", data, idd, setEditAddress)
			refetchData()
	}

	/* Editing proccess end */



/* Deleting proccess start */

	//Get button id
	const deleting = (id) => {
		setId(id);
		setDeleteAddress(true);
	};

	//handle delete button on confirm modal
	const submitDeleting = () => {
		ToastAlertDelete("address", idd, setDeleteAddress);
		refetchData()
	};

	//handle cancel button on confirm modal
	const cancelDeleting = () => {
		setDeleteAddress(false);
	};


	/* Deleting proccess end */


	const columns = useMemo(() => LocationColumn, []);



	return (
		<div className="p-5 location">
			
			<Modal modal={postAddress} setModal={setPostAddress} title="Address qo'shish" 	width={"80%"}
				height={"80%"}>
			<form className="row" onSubmit={form1.handleSubmit(formSubmit)}>
			<div className="col">
						<span className="image-upload position-relative">
							<input
								type="file"
								{...form1.register("first_image")}
								className="opacity-0 position-absolute"
								onChange={handleFirstInputChange}
								required
							/>
							{firstPhoto ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(firstPhoto)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
						<span className="image-upload position-relative">
							<input
								type="file"
								className="opacity-0 position-absolute"
								{...form1.register("second_image")}
								required
								onChange={handleSecondInputChange}
							/>
							{secondPhoto ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(secondPhoto)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
						<span className="image-upload">
							{thirdPhoto ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(thirdPhoto)}
									alt="Image_Photo"
								/>
							) : null}
							<input
								type="file"
								className="opacity-0"
								{...form1.register("third_image")}
								onChange={handleThirdInputChange}
								required
							/>
						</span>
					</div>
				<div className="col">
					<label className="label">
				Manzil
				<input className="input" name="address_name" type="text" {...form1.register("address_name")}  placeholder="Manzil" />
					</label>
					<label className="label">
				Location
				<input className="input" type="text" name="address_location" {...form1.register("address_location")} placeholder="Location" />
					</label>
					<span className="d-flex justify-content-between align-items-center">
							<label className="label mb-0">Novinka</label>
							<label className="toggle-switch">
    <input type="checkbox" ref={toggleRef} />
    <span className="switch"></span></label>
						</span>
				</div>
				<div className="col">
					<label className="label">
						Matn
					<textarea className="input" name="address_description" {...form1.register("address_description")} cols="30" rows="10"></textarea>
					</label>
					<Button text={"Saqlash"} />
				</div>

			
			</form>
			</Modal>
			<Modal modal={editAddress} setModal={setEditAddress} title="Address o'zgartirish" 	width={"80%"}
				height={"80%"}>
			<form className="row" onSubmit={form2.handleSubmit(formEdit)}>
			<div className="col">
						<span className="image-upload position-relative">
							<input
								type="file"
								{...form2.register("first_image")}
								className="opacity-0 position-absolute"
								onChange={handleFirstInputChange}
								required
							/>
							{firstPhoto ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(firstPhoto)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
						<span className="image-upload position-relative">
							<input
								type="file"
								className="opacity-0 position-absolute"
								{...form2.register("second_image")}
								required
								onChange={handleSecondInputChange}
							/>
							{secondPhoto ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(secondPhoto)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
						<span className="image-upload">
							{thirdPhoto ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(thirdPhoto)}
									alt="Image_Photo"
								/>
							) : null}
							<input
								type="file"
								className="opacity-0"
								{...form2.register("third_image")}
								onChange={handleThirdInputChange}
								required
							/>
						</span>
					</div>
				<div className="col">
					<label className="label">
				Manzil
				<input className="input" name="address_name" defaultValue={findedData.location} type="text" {...form2.register("address_name")}  placeholder="Manzil" />
					</label>
					<label className="label">
				Location
				<input className="input" type="text" defaultValue={findedData.geolacation} name="address_location" {...form2.register("address_location")} placeholder="Location" />
					</label>

					<span className="d-flex justify-content-between align-items-center">
							<label className="label mb-0">Novinka</label>
							<label className="toggle-switch">
    <input type="checkbox" ref={toggleRef2} />
    <span className="switch"></span></label>
						</span>
				</div>
				<div className="col">
					<label className="label">
						Matn
					<textarea className="input" name="address_description" {...form2.register("address_description")} defaultValue={findedData.destination} cols="30" rows="10"></textarea>
					</label>
					<Button text={"Saqlash"} />
				</div>
			</form>
			</Modal>
			<Modal
				title={"Haqiqatdan ham o???chirmoqchimisiz?"}
				modal={deleteAddress}
				setModal={setDeleteAddress}
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
			<button
				type="submit"
				className="reusable"
				onClick={() => setPostAddress(true)}
			>
				Qo'shish
			</button>
			{data?.length ? <Table columns={columns} data={data}/> :status === "loading" ? <h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2> : error?.message  === "Network Error" ? 	<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2> : !data.length ?   setTimeout(() => {
          <h3>Manzillar hozircha mavjud emas. Hohlasangiz qo'shing.</h3>
        },2500) : ""}
			<ToastContainerr />
		</div>
	);
};
