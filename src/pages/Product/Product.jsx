import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { ProductColumn } from "./ProductColumn";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useQueryData } from "../../hook";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import {
	ToastAlertDelete,
	ToastAlertEditWithId,
	ToastAlertPostWithId,
	ToastContainerr,
} from "../../components/Toastify";
import "../../components/ImageUpload/ImageUpload.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import "./Product.css";
import "../../components/ToggleSwitch/ToggleSwitch.css";

const baseURL = import.meta.env.VITE_APP_BASE_IMG_URL

export const Product = () => {
	const [isToggled, setIsToggled] = useState(false);
	// const { data, isLoading, refetch, isFetched, error, status } =
	// 	useQueryData("products");
	const [postProduct, setPostProduct] = useState(false);
	const [editProduct, setEditProduct] = useState(false);
	const [deleteProduct, setDeleteProduct] = useState(false);
	const defaultImg = new Blob(["Avoid error for empty input file"], {
		type: "text/plain",
	});
	const [idd, setId] = useState(0);
	const [findedData, setFindedData] = useState({});
	const [optionValue, setOptionValue] = useState(1);
	let [firstPhotos, setFirstPhotos] = useState(null);
	let [secondPhotos, setSecondPhotos] = useState(null);
	let [thirdPhotos, setThirdPhotos] = useState(null);
	const [stock, setStock] = useState(false);
	const [newPoduct, setNewProduct] = useState(false);

	let StockDone = stock ? "d-inline-block" : "d-none";
	let StockFalse = stock ? "d-none" : "d-inline-block";

	let nameR = useRef(null), categR = useRef(null), weigR = useRef(null), frI = useRef(null),seI = useRef(null), thI = useRef(null), warR = useRef(null), sizR = useRef(null), capR = useRef(null), infR = useRef(null), prR = useRef(null), stR = useRef(null)

	// Add edit and delete buttons for backend data to render on table
	
	Array.isArray(data?.products) ?
		data?.products?.map(
			(item) =>
				(item.edit = (
					<button
						className="btn-edit opacity-50"
						data-id={item.id}
						onClick={(e) => edit(+e.target.dataset.id)}
						type="button" disabled
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
		) : null
	

	// Memoize table head
	const columns = useMemo(() => ProductColumn, []);

	/* Images upload and show for user proccess start */

	const handleFirstInputChange = (evt) => {
		let target = evt.target.files;
		if (!target.length) {
			setFirstPhotos(defaultImg);
		}
		setFirstPhotos(target[0]);
	};

	const handleSecondInputChange = (evt) => {
		if (!evt.target.files.length) {
			setSecondPhotos(defaultImg);
		}
		setSecondPhotos(evt.target.files[0]);
	};

	const handleThirdInputChange = (evt) => {
		if (!evt.target.files.length) {
			setThirdPhotos(defaultImg);
		}
		setThirdPhotos(evt.target.files[0]);
	};

	/* Images upload and show for user proccess end */

	const form1 = useForm({
		mode: "onChange",
	
	});

	const { register, handleSubmit } = useForm({
		mode: "onBlur",
	});

	// Select value
	const handleSelectValue = (evt) => {
		setOptionValue(parseInt(evt.target.value));
	};

	// Form submit
	const formSubmit = (formSubmitData) => {
		let formData = new FormData();
		formData.append("name", formSubmitData.product_name);
		formData.append("category", formSubmitData.product_category.slice(2));
		formData.append("weight", formSubmitData.product_weight);
		formData.append("images", formSubmitData.first_image[0]);
		formData.append("images", formSubmitData.second_image[0]);
		formData.append("images", formSubmitData.third_image[0]);
		formData.append("isActive", true);
		formData.append("warranty", formSubmitData.product_warranty);
		formData.append("size", formSubmitData.product_size);
		formData.append("capacity", formSubmitData.product_capacity);
		formData.append("body", formSubmitData.product_info);
		formData.append("cost", formSubmitData.product_price);
		formData.append("newCost", formSubmitData.product_stock_price);
		formData.append("discount", stock);
		formData.append("new", newPoduct);

		//Alert for submit info
		ToastAlertPostWithId("products", formData, optionValue, setPostProduct);
		refetch();
		setFirstPhotos(null), setSecondPhotos(null), setThirdPhotos(null);
	};

	/* Editing proccess start */


	// Get button id
	const edit = (id) => {
		setEditProduct(true);
		setId(id);
		let finded = data?.products?.find((obj) => obj.id === id);
		setFindedData(finded);



	};

	// const convertImg = (img, index) => {
	// 	img?.replaceAll("[", "")
	// 	.replaceAll("]", "")
	// 	.replaceAll('"', "")
	// 	.split(",")[index];
	// }




	// FormSubmit for edit
	const formSubmitEdited = (evt) => {
		evt.preventDefault()

		let formData = new FormData();
		formData.append("name", nameR.current.value);
		formData.append("category", categR.current.value.slice(2));
		formData.append("weight", weigR.current.value);
		formData.append("images", frI.current.files[0]);
		formData.append("images", seI.current.files[0]);
		formData.append("images", thI.current.files[0]);
		formData.append("isActive", true);
		formData.append("warranty", warR.current.value)
		formData.append("size", sizR.current.value);
		formData.append("capacity", capR.current.value);
		formData.append("body", infR.current.value);
		formData.append("cost", prR.current.value);
		formData.append("newCost", stR.current.value);
		formData.append("discount", stock);
		formData.append("new", newPoduct);

		ToastAlertEditWithId("products", formData, optionValue, setEditProduct);
	};

	/* Editing proccess end */

	/* Deleting proccess start */

	//Get button id
	const deleting = (id) => {
		setId(id);
		setDeleteProduct(true);
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
		ToastAlertDelete("products", id, setDeleteProduct);
		refetch();
	};

	/* Deleting proccess end */

	return (
		<div className="p-5 product ">
			<Modal
				modal={postProduct}
				setModal={setPostProduct}
				title={"Mahsulot qo'shish"}
				width={"80%"}
				height={"77%"}
			>
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
							{firstPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(firstPhotos)}
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
							{secondPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(secondPhotos)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
						<span className="image-upload">
							{thirdPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(thirdPhotos)}
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
						<label className="label mb-5">
							Toifalar
							<select
								required
								name="product_category"
								className="input"
								{...form1.register("product_category")}
								onChange={handleSelectValue}
							>
								<option value="label" hidden>
									masalan: Model C
								</option>
								{data?.categories?.map((category) => (
									<option
										value={category.id + category.category}
										className="fs-4"
										key={category.id}
									>
										{category.category}
									</option>
								))}
							</select>
						</label>

						<label className="label mb-5">
							Tovar nomi
							<input
								{...form1.register("product_name")}
								type="text"
								className="input"
								placeholder="masalan: Lux Soft Memory"
								required
							/>
						</label>
						<label className="label mb-5">
							Narxi
							<input
								type="text"
								{...form1.register("product_price")}
								className="input"
								placeholder="masalan: 20 000"
								defaultValue={"2"}
								required
							/>
						</label>
						<label className="label mb-5">
							Yuklama
							<input
								type="text"
								className="input"
								{...form1.register("product_weight")}
								placeholder="masalan: 200 kg"
								defaultValue={"3"}
								required
							/>
						</label>
					</div>
					<div className="col">
						<label className="label mb-5">
							Razmeri
							<input
								type="text"
								className="input"
								{...form1.register("product_size")}
								defaultValue={"4"}
								placeholder="masalan: 200 x 140 x 40"
								required
							/>
						</label>
						<label className="label mb-5">
							Kafolat
							<input
								type="text"
								className="input"
								{...form1.register("product_warranty")}
								defaultValue={"5"}
								placeholder="masalan: 1 yil"
								required
							/>
						</label>
						<label className="label mb-5">
							Sig'im
							<input
								type="text"
								className="input"
								{...form1.register("product_capacity")}
								defaultValue={"6"}
								placeholder="masalan: 2"
								required
							/>
						</label>

						<label className="label mb-5 position-relative">
							Aksiya narxi
							<input
								type="text"
								className="input"
								{...form1.register("product_stock_price")}
								defaultValue={"7"}
								placeholder="masalan: 1 200 000"
							/>
							<button
								className={`stock-true ${StockDone}`}
								type="button"
								onClick={() => setStock(false)}
							></button>
							<button
								className={`stock-false ${StockFalse}`}
								type="button"
								onClick={() => setStock(true)}
							></button>
						</label>
					</div>
					<div className="col">
						<label className="label">
							Ma'lumot
							<textarea
								cols="30"
								rows="11"
								className="input"
								{...form1.register("product_info")}
								defaultValue={"info"}
								placeholder="info..."
								required
							></textarea>
						</label>

						<ToggleSwitch
							isToggled={newPoduct}
							onToggle={() => setNewProduct(!newPoduct)}
						/>
						<Button />
					</div>
				</form>
			</Modal>
			<Modal
				modal={editProduct}
				setModal={setEditProduct}
				title={"Mahsulot o'zgartirish"}
				width={"80%"}
				height={"77%"}
			>
				<form className="row" onSubmit={(formSubmitEdited)}>
					<div className="col">
						<span className="image-upload position-relative">
							<input
								type="file"
								// {...register("first_image")}
								ref={frI}
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
						<span className="image-upload position-relative">
							<input
								type="file"
								className="opacity-0 position-absolute"
								ref={seI}
								// {...register("second_image")}
								required
								onChange={handleSecondInputChange}
							/>
							{secondPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(secondPhotos)}
									alt="Image_Photo"
								/>
							) : null}
						</span>
						<span className="image-upload">
							{thirdPhotos ? (
								<img
									className="uploaded-img position-absolute"
									src={URL.createObjectURL(thirdPhotos)}
									alt="Image_Photo"
								/>
							) : null}
							<input
								type="file"
								className="opacity-0"
								ref={thI}
								// {...register("third_image")}
								onChange={handleThirdInputChange}
								required
							/>
						</span>
					</div>
					<div className="col">
						{console.log(findedData)}
						<label className="label mb-5">
							Toifalar
							<select
								required
								name="product_category"
								className="input"
								ref={categR}
								// {...register("product_category")}
								onChange={handleSelectValue}
								defaultValue={findedData.category}
							>
								<option value="label" hidden>
									masalan: Model C
								</option>
								{data?.categories?.map((category) => (
									<option
										value={category.id + category.category}
										className="fs-4"
										key={category.id}
									>
										{category.category}
									</option>
								))}
							</select>
						</label>

						<label className="label mb-5">
							Tovar nomi
							<input
								// {...register("product_namee")}
								ref={nameR}
								type="text"
								className="input"
								defaultValue={findedData.name}
								placeholder="masalan: Lux Soft Memory"
								required
							/>
						</label>
						<label className="label mb-5">
							Narxi
							<input
								type="text"
								ref={prR}
								// {...register("product_price")}
								className="input"
								placeholder={findedData.cost}
								defaultValue={"20000"}
								required
							/>
						</label>
						<label className="label mb-5">
							Yuklama
							<input
								type="text"
								className="input"
								ref={weigR}
								// {...register("product_weight")}
								placeholder={findedData.weight}
								defaultValue={"200"}
								required
							/>
						</label>
					</div>
					<div className="col">
						<label className="label mb-5">
							Razmeri
							<input
								type="text"
								className="input"
								ref={sizR}
								// {...register("product_size")}
								defaultValue={findedData.size}
								placeholder={"masalan: 200 x 140 x 40"}
								required
							/>
						</label>
						<label className="label mb-5">
							Kafolat
							<input
								type="text"
								className="input"
								ref={warR}
								// {...register("product_warranty")}
								defaultValue={findedData.warranty}
								placeholder={"masalan: 1 yil"}
								required
							/>
						</label>
						<label className="label mb-5">
							Sig'im
							<input
								type="text"
								className="input"
								ref={capR}
								// {...register("product_capacity")}
								defaultValue={findedData.capacity}
								placeholder={"masalan: 2"}
								required
							/>
						</label>

						<label className="label mb-5 position-relative">
							Aksiya narxi
							<input
								type="text"
								className="input"
								ref={stR}
								// {...register("product_stock_price")}
								defaultValue={findedData.new_cost}
								placeholder="masalan: 1 200 000"
							/>
							<button
								className={`stock-true ${StockDone}`}
								type="button"
								onClick={() => setStock(false)}
							></button>
							<button
								className={`stock-false ${StockFalse}`}
								type="button"
								onClick={() => setStock(true)}
							></button>
						</label>
					</div>
					<div className="col">
						<label className="label">
							Ma'lumot
							<textarea
								cols="30"
								rows="11"
								className="input"
								ref={infR}
								// {...register("product_info")}
								defaultValue={findedData.body}
								placeholder="info..."
								required
							></textarea>
						</label>

						<ToggleSwitch
							isToggled={newPoduct}
							onToggle={() => setNewProduct(!newPoduct)}
						/>
						<Button />
					</div>
				</form>
			</Modal>

			{/* ))} */}

			<button
				type="submit"
				className="reusable"
				style={{ position: "absolute", bottom: "3rem", right: "0" }}
				onClick={() => setPostProduct(true)}
			>
				Qo'shish
			</button>

			<Modal
				title={"Haqiqatdan ham o’chirmoqchimisiz?"}
				modal={deleteProduct}
				setModal={setDeleteProduct}
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
			{data?.products?.length ? (
				<Table columns={columns} data={data?.products} />
			) : status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : error?.message === "Network Error" ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) : !data?.products?.length ? (
				<h3>Mahsulotlar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
			) : (
				""
			)}
		</div>
	);
};
