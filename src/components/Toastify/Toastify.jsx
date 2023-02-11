import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Token } from "../../auth";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;


export const ToastContainerr = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={true}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
		/>
	);
};

// export const NetworkToastify = () => {
// 	toast("Loading...  Please wait....");
// 	<ToastContainer
// 		position="top-right"
// 		autoClose={3000}
// 		hideProgressBar={false}
// 		newestOnTop={true}
// 		closeOnClick
// 		rtl={false}
// 		pauseOnFocusLoss
// 		draggable
// 		pauseOnHover
// 		theme="light"
// 	/>;
// };

// NetworkToastify();

export const postUser = ({ username, password }) => {
	const id = toast.loading("Ma'lumotlar tekshirilmoqda... Iltimos, kuting...");
	axios
		.post(`http://localhost:1212/admin/login`, {
			userName: username,
			password: password,
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				window.localStorage.setItem("matrasToken", res?.data?.token);
				toast.update(id, {
					render: "Login successfully ! Redirecting...",
					type: "success",
					isLoading: false,
					autoClose: 2000,
				});
			}
		})
		.catch((err) => {
			toast.update(id, {
				render: "Something went wrong",
				type: "error",
				isLoading: false,
				autoClose: 2500,
			});
		});
};

export const ToastAlertEdit = async (path, modalFalse) => {
	const i = toast.loading("So'rovingiz, qabul qilindi ...");
	await axios
		.put(`${baseUrl}/${path}`, obj, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				modalFalse(false)

				toast.update(i, {
					render: "Muvaffaqiyatli o'zgartirildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			toast.update(i, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,
			});
		});
}

export const ToastAlertPost =  (path, obj, setPostCategory) => {

	const id = toast.loading("Iltmos, kuting...");

	axios
		.post(`${baseUrl}/${path}`, obj, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				setPostCategory(false);

				toast.update(id, {
					render: "Muvaffaqiyatli qo'shildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			toast.update(id, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,
			});
		});
}

export const ToastAlertPostWithId =  (path, obj, id, setPostCategory) => {

	const idd = toast.loading("Iltmos, kuting...");

	axios
		.post(`${baseUrl}/${path}/${id}`, obj, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				console.log(res)
				setPostCategory(false);
				toast.update(idd, {
					render: "Muvaffaqiyatli qo'shildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			console.log(err)
			toast.update(idd, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,
			});
		});
}

export const ToastAlertEditWithId =  (path, obj, id, setPostCategory) => {

	const idd = toast.loading("Iltmos, kuting...");

	axios
		.put(`${baseUrl}/${path}/${id}`, obj, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				console.log(res)
				setPostCategory(false);
				toast.update(idd, {
					render: "Muvaffaqiyatli qo'shildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			console.log(err)
			toast.update(idd, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,
			});
		});
}

export const ToastAlertDelete = (path, id, modalFalse) => {
	const i = toast.loading("So'rovingiz, qabul qilindi ...");
	axios
		.delete(`${baseUrl}/${path}/${id}`, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				modalFalse(false)

				toast.update(i, {
					render: "Muvaffaqiyatli o'chirildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			console.log(err)
			toast.update(i, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,
			});
		});
}


