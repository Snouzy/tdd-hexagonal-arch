import { ChakraProvider } from "@chakra-ui/react";
import {  RouterProvider, RouterProviderProps } from "react-router-dom";
import React from "react";

export const Provider = ({
  router,
}: {
  router: RouterProviderProps["router"];
}) => (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
);
