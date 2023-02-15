import { LoginUserIcon } from "../../assets/icons";
import { SlLock } from "react-icons/sl";
import "../../components/Button/Button.css";
import "../../components/Input/Input.css";
import "./Login.css";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLoaderData } from "react-router-dom";
import { ToastContainerr,  postUser } from "../../components/Toastify";
import { Token } from "../../auth";
import axios from "axios";


export const Login = () => {


	const nameRef = useRef();
	const passwordRef = useRef();

	let login = "admin";
	let pass = "admin";
	const navigate = useNavigate();


	const handleLoginForm = (evt) => {
		evt.preventDefault();
    const username = nameRef.current.value;
    const password = passwordRef.current.value
		if (nameRef.current.value !== login && passwordRef.current.value !== pass) {
      toast.error("Login or password is invalid !")
		} else {
			postUser({username, password});
			setTimeout(() => {
			nameRef.current.value = '';
			passwordRef.current.value = '';
			navigate("/")
		},5000)

		}
	};

	return (
		<>
			<div className="login">
				<form
					className="w-25 mx-auto p-4 border rounded-2"
					style={{ marginTop: "15rem" }}
					onSubmit={handleLoginForm}
				>
					<h3 className="text-center text-dark mb-5">Kirish</h3>
					<span className="d-block position-relative">
						<LoginUserIcon className="position-absolute" />
						<input
							ref={nameRef}
							className="input ps-5"
							type="text"
							placeholder="Login"
							required
						/>
					</span>
					<span className="d-block position-relative">
						<SlLock className="position-absolute" />
						<input
							ref={passwordRef}
							className="input ps-5"
							type="password"
							placeholder="Password"
							required
						/>
					</span>
					<button className="reusable mx-auto mt-5" type="submit">
						Kirish
					</button>
				</form>
			</div>
			<ToastContainerr />
		</>
	);
};
