import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { 
                index: true,
                element: <Home />
            }
        ]
    }
])

export type AppRouter = typeof router