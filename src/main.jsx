import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "./main.css";
import { QueryClient, QueryClientProvider } from "react-query";

const clientt = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			cacheTime: 50000,
		},
	}
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<QueryClientProvider client={clientt}>
				<RouterProvider router={router} />
		</QueryClientProvider>
	</>
);
