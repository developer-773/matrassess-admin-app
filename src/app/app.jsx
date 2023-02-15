import { Online, Offline } from "react-detect-offline";
import { Outlet } from "react-router-dom";
import { Logo } from "../assets/icons";
import { Header } from "../components/layout/Header/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const App = () => {
	return (
		<>
		<Offline><h2 className="position-absolute top-50 translate-middle start-50  fs-1 text-danger">Ooops! Internet bilan aloqa uzildi!</h2></Offline>
		<Online>
			<div className="d-flex">
				<div className="p-5" style={{ width: "220px", background: "#01384d" }}>
					<Logo />
				</div>
				<Header />
			</div>
			<div className="d-flex ">
				<Sidebar />
				<Outlet />
			</div>
		</Online>
		</>
	);
};
