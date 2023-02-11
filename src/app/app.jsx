import { Outlet } from "react-router-dom";
import { Logo } from "../assets/icons";
import { Header } from "../components/layout/Header/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const App = () => {
	return (
		<>
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
		</>
	);
};
