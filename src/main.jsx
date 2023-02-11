import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "./main.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ImageProvider } from "./context/ImageContex";

const clientt = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<QueryClientProvider client={clientt}>
			<ImageProvider>
				<RouterProvider router={router} />
			</ImageProvider>
		</QueryClientProvider>
	</>
);
