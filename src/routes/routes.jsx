import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "../app";
import { Sidebar } from "../components/layout/Sidebar";
import { Customer } from "../pages/Customer";
import { Order } from "../pages/Order";
import {Category} from "../pages/Category"
import {Product } from "../pages/Product";
import {Technology} from "../pages/Technology"
import {Location} from "../pages/Location"
import { Error } from "../components/Error";
import { Login } from "../pages/Login/Login";
import { Token } from "../auth";
import { Carousel } from "../pages/Carousel";


export const router = createBrowserRouter([
    {
        path: "/",
        element: Token ?  <App /> : <Login />,
        children: [
            {
                index: true,
                path: "/",
                element: <Order />
            },
            {
                path: "/customers",
                element: <Customer />
            },
            {
                path: "/categories",
                element: <Category />,
                // errorElement: <Error />,
                // loader: CategoryLoading,
            },
            {
                path: "/product",
                element: <Product />,
            },
            {
                path: "/tech",
                element: <Technology />
            },
            {
                path: "/location",
                element: <Location />
            },
            {
                path: "/carusel",
                element: <Carousel />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    }

])