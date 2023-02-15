import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { AiFillHome } from "react-icons/ai";

import {MdLocationOn, MdOutlineSwipe} from "react-icons/md"
import { CustomerIcon, CategoryIcon, ProductIcon, SettingsIcon } from "../../../assets/icons";
export const Sidebar = () => {
	return (
		<ul className=" sidebar__list flex-grow-3">
			<li className="sidebar__item">
				<NavLink
					to={"/"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<AiFillHome />
					Buyurtmalar
				</NavLink>
			</li>
			<li className="sidebar__item">
				<NavLink
					to={"/customers"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<CustomerIcon />
					Mijozlar
				</NavLink>
			</li>
			<li className="sidebar__item">
				<NavLink
					to={"/categories"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<CategoryIcon />
					Toifalar
				</NavLink>
			</li>
			<li className="sidebar__item">
				<NavLink
					to={"/product"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<ProductIcon />
					Mahsulotlar
				</NavLink>
			</li>
			<li className="sidebar__item">
				<NavLink
					to={"/tech"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<SettingsIcon />
					Texnologiyalar
				</NavLink>
			</li>
			<li className="sidebar__item">
				<NavLink
					to={"/location"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<MdLocationOn />
					Manzil
				</NavLink>
			</li>
			<li className="sidebar__item">
				<NavLink
					to={"/carusel"}
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					<MdOutlineSwipe />
					Carusel
				</NavLink>
			</li>
		</ul>
	);
};
