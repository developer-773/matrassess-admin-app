import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../components/Table";
import { CategoryColumn } from "./CategoryColumn";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import "./Category.css";
import "../../components/Input/Input.css";
import "../../components/Button/Button.css";
import {
	ToastAlertDelete,
	ToastAlertEdit,
	ToastAlertPost,
	ToastContainerr,
} from "../../components/Toastify";
import { useQueryData } from "../../hook";
import { Loader } from "../../components/Loader";
import { ImageContext } from "../../context/ImageContex";

export const Category = () => {
	const { data, refetch, isFetched, isLoading, isSuccess, error, status } =
		useQueryData("categories");

	const [postCategory, setPostCategory] = useState(false);
	const [editCategory, setEditCategory] = useState(false);
	const [deleteCategoryy, setDeleteCategoryy] = useState(false);
	const [idd, setId] = useState(0);
	let categoryRef = useRef(null);

	// const handleFetch = () => {
	// 	refetch();
	// };

	// handleFetch();

		Array.isArray(data) ?
		data?.map(
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
		) : null
	

	const columns = useMemo(() => CategoryColumn, []);

	// Post category
	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		const categoryValue = categoryRef.current.value;
		const obj = {
			category: categoryValue,
			isActive: true,
		};
		ToastAlertPost("categories", obj, setPostCategory);
	};

	/* Editing proccess start */

	// Get button id
	const edit = (id) => {
		setEditCategory(true);
		setId(id);
	};

	// Function for edit
	const handleEdit = async (id) => {
		const obj = {
			category: categoryRef.current.value,
			isActive: true,
		};
		ToastAlertEdit("categories", id, obj, setEditCategory);
	};

	// FormSubmit for edit
	const handleFormEdit = (evt) => {
		evt.preventDefault();
		handleEdit(idd);
	};

	/* Editing proccess end */

	/* Deleting proccess start */

	//Get button id
	const deleting = (id) => {
		setId(id);
		setDeleteCategoryy(true);
	};

	//handle delete button on confirm modal
	const submitDeleting = () => {
		deleteCategory(idd);
	};

	//handle cancel button on confirm modal
	const cancelDeleting = () => {
		setDeleteCategoryy(false);
	};

	// function for delete
	const deleteCategory = async (id) => {
		ToastAlertDelete("categories", id, setDeleteCategoryy);
	};

	/* Deleting proccess end */

	return (
		<div className="p-5 category position-relative">
			{data?.length ? (
				<>
				
					<Table columns={columns} data={data} />
					<Modal
						title={"Kategoriya qo'shish"}
						modal={postCategory}
						setModal={setPostCategory}
						width={"20%"}
						height={"50%"}
					>
						<form onSubmit={handleFormSubmit}>
							<label className="label">
								Kategoriya nomi
								<input
									autoFocus
									ref={categoryRef}
									type="text"
									className="input"
									placeholder="Masalan Model B"
									required
								/>
							</label>
							<Button />
						</form>
					</Modal>
					<Modal
						title={"Kategoriyani o'zgartirish"}
						modal={editCategory}
						setModal={setEditCategory}
						width={"20%"}
						height={"50%"}
					>
						<form onSubmit={handleFormEdit}>
							<label className="label">
								Kategoriya nomi
								<input
									ref={categoryRef}
									autoFocus
									type="text"
									className="input"
									placeholder="Masalan Model A+"
									required
								/>
							</label>
							<Button />
						</form>
					</Modal>
					<button
						className="reusable"
						style={{ position: "absolute", bottom: "3rem", right: "0" }}
						onClick={() => setPostCategory(true)}
					>
						Qo'shish
					</button>
					<Modal
						title={"Haqiqatdan ham o’chirmoqchimisiz?"}
						modal={deleteCategoryy}
						setModal={setDeleteCategoryy}
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
				</>
			) : !data === [] ? (
				<>
				<h3>Kategoriyalar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
				<button
						className="reusable"
						style={{ position: "absolute", bottom: "3rem", right: "0" }}
						onClick={() => setPostCategory(true)}
						>
						Qo'shish
					</button>
						</>
			) : error?.message === "Network Error" ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) : status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : (
				""
			)}
		</div>
	);
};
