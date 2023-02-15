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

function preloader(loading) {
		setTimeout(() => {
			if(loading) {
			window.location.reload()
			}
		},5000)
	
}

function preloaderForLogin(load) {

	setTimeout(() => {
		if(load) {
			toast.update(load, {
				render: "Login successfully ! Redirecting...",
				type: "success",
				isLoading: false,
				autoClose: 2000,
			});
			
		}
	}, 2500)
}

export const postUser = ({ username, password }) => {
	const id = toast.loading("Ma'lumotlar tekshirilmoqda... Iltimos, kuting...");

	axios
		.post(`${baseUrl}/login`, {
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

		preloaderForLogin(id)
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
				modalFalse(false),
				toast.update(i, {
					render: "Muvaffaqiyatli o'zgartirildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			modalFalse(false)
			toast.update(i, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,

			});
		});

		preloader(i)
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
			setPostCategory(false);
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
			setPostCategory(false);
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
				setPostCategory(false);
				toast.update(idd, {
					render: "Muvaffaqiyatli o'zgartirildi !",
					type: "success",
					isLoading: false,
					autoClose: 1500,
				});
			}
		})
		.catch((err) => {
			setPostCategory(false);
			toast.update(idd, {
				render: "Qayerdadir xatolik bo'ldi.",
				type: "error",
				isLoading: false,
				autoClose: 1500,
			});
		});

		preloader(idd)
}

export const ToastAlertDelete = (path, id) => {
	const i = toast.loading("So'rovingiz, qabul qilindi ...");
	axios
		.delete(`${baseUrl}/${path}/${id}`, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {	
				toast.update(i, {
					render: "Muvaffaqiyatli o'chirildi !",
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

	preloader(i)
}

export const ToastAlertDeleteWithId = (path, id) => {
	const i = toast.loading("So'rovingiz, qabul qilindi ...");
	axios
		.delete(`${baseUrl}/${path}/${id}`, {
			headers: {
				Authorization: Token,
			},
		})
		.then((res) => {
			if (res.status >= 200 || res.status <= 210) {
				toast.update(i, {
					render: "Muvaffaqiyatli o'chirildi !",
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

		preloader(i)
}


