import { useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { LocationColumn } from "./LocationColumn";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import "./Location.css";
import axios from "axios";
import { Token } from "../../auth";
import "../../components/ImageUpload/ImageUpload.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import { Modal } from "../../components/Modal";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { useQueryData } from "../../hook/useQueryData";
import { ToastContainerr } from "../../components/Toastify";

export const Location = () => {
	const {data, isLoading, error, status} = useQueryData("")
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
	
		/* Image upload and preview for user proccess start */
	
	// Initialize forms
	const form1 = useForm()
	const form2 = useForm()


	//Submit form
	const formSubmit = (evt) => {
		evt.preventDefault()
		// const obb = {
		// 	"location": locR.current.value,
		// 	"destination": desR.current.value,
		// 	"geolocation": geoR.current.value,
		// 	"images": imag.current.files[0],
		// 	"isActive": true
		// }

		const data = new FormData()
			data.append("location", locR.current.value),
			data.append("destination", desR.current.value),
			data.append("geolocation", geoR.current.value),
			data.append("images", imag.current.files[0]),
			data.append("isActive", true)

		axios.put("http://localhost:1212/admin/address/"+1, data, {
			headers: {
				Authorization: Token
			}
		}).then(res => console.log(res)).catch(err => console.log(err))
	}

	const cancelDeleting =() => {}

	const submitDeleting = () => {}
	
	

	

	// const d = [
	// 	{
	// 		head: "Manzil",
	// 	},
    // {
	// 		head: "mo'ljal",
	// 	},
    // {
	// 		head: "Location",
	// 	},
	// ];

	const locR = useRef(null), desR = useRef(null), geoR = useRef(null), imag = useRef(null)





	axios.delete("http://localhost:1212/admin/address/"+1, {
		headers: {
			Authorization: Token
		}
	}).then(res => console.log(res)).catch(err => console.log(err))

	const columns = useMemo(() => LocationColumn, []);
	const LocationData = useMemo(() => data, []);

	// const checkInternet = () => {
	// 	if(navigator.)
	// }
	

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
				<input className="input" name="address_name" type="text" {...form1.register("address_name")} ref={locR} placeholder="Manzil" />
					</label>
					<label className="label">
				Location
				<input className="input" type="text" name="address_location" {...form1.register("address_location")} ref={desR} placeholder="Location" />
					</label>
					<span className="d-flex justify-content-between align-items-center">

				<label className="label mb-0">
					Holat
				</label>
				<ToggleSwitch />
					</span>
				</div>
				<div className="col">
					<label className="label">
						Matn
					<textarea className="input" name="address_description" {...form1.register("address_description")} cols="30" rows="10"></textarea>
					</label>
					<Button text={"Saqlash"} />
				</div>

				{/* <input type="file" ref={imag} />
				
				<input type="text" ref={geoR}  placeholder="Matn" />
				 */}
			{/* <button type="submit">Test</button> */}
			</form>
			</Modal>
			<button
				type="submit"
				className="reusable"
				style={{ position: "absolute", bottom: "3rem", right: "0" }}
				onClick={() => setPostAddress(true)}
			>
				Qo'shish
			</button>
			<Modal
				title={"Haqiqatdan ham o’chirmoqchimisiz?"}
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
			<ToastContainerr />
			{data?.length ? <Table columns={columns} data={data}/> :status === "loading" ? <h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2> : error?.message  === "Network Error" ? 	<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2> : !data.length ? <h3>Address hozircha mavjud emas. Hohlasangiz qo'shing</h3> : ""}
		</div>
	);
};
