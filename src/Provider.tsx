import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router";
import { AppStore } from "./lib/create-store";

export const Provider = ({
  store,
  router,
}: {
  store: AppStore;
  router: AppRouter;
}) => (
  <ReduxProvider store={store}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ReduxProvider>
);
