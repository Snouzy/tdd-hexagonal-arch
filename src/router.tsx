import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./pages/Layout";
import { createHomeLoader } from "./pages/Home/create-home-loader";
import { AppStore } from "./lib/create-store";

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: createHomeLoader({ store }),
        },
      ],
    },
  ]);

export type AppRouter = ReturnType<typeof createRouter>;