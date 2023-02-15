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
	ToastAlertEditWithId,
	ToastAlertPost,
	ToastContainerr,
} from "../../components/Toastify";
import { useQueryData } from "../../hook";


export const Category = () => {
	const { data, refetch, error, status } =
		useQueryData("category", "categories");

	const [postCategory, setPostCategory] = useState(false);
	const [editCategory, setEditCategory] = useState(false);
	const [deleteCategoryy, setDeleteCategoryy] = useState(false);
	const [idd, setId] = useState(0);
	const [findedData, setFindedData] = useState({})
	let categoryRef = useRef(null);

	const handleFetch = () => {
		refetch();
	};


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
		handleFetch();

	};

	/* Editing proccess start */

	// Get button id
	const edit = (id) => {
		setEditCategory(true);
		setId(id);
		const finded = data?.find(item => item.id === id)
		setFindedData(finded)
	};

	// Function for edit


	// FormSubmit for edit
	const handleFormEdit = (evt) => {
		evt.preventDefault();
		const obj = {
			category: categoryRef.current.value,
			isActive: true,
		};
		ToastAlertEditWithId("categories", obj, idd,  setEditCategory);
	handleFetch();
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
		ToastAlertDelete("categories", idd, setDeleteCategoryy);
		handleFetch()
	};

	//handle cancel button on confirm modal
	const cancelDeleting = () => {
		setDeleteCategoryy(false);
	};

	/* Deleting proccess end */

	return (
		<div className="p-5 category position-relative">
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
			{data?.length ? (
				<>
				
					<Table columns={columns} data={data} />
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
									defaultValue={findedData.category}
									autoFocus
									type="text"
									className="input"
									placeholder="Masalan Model A+"
									required
								/>
							</label>
							<Button text={"Saqlash"}/>
						</form>
					</Modal>
					
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
				
				  setTimeout(() => {
          <h3>Kategoriyalar hozircha mavjud emas. Hohlasangiz qo'shing</h3>
        },2500)
			) : error?.message === "Network Error" ? (
				<h2 className="text-danger">Server bilan muammo yuzaga keldi !</h2>
			) : status === "loading" ? (
				<h2>Ma'lumotlar yuklanmoqda... Internet bormi?</h2>
			) : (
				""
			)}
				<button
						className="reusable"
						onClick={() => setPostCategory(true)}
						>
						Qo'shish
					</button>
		</div>
	);
};
