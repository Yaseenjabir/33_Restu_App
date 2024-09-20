"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";

export const ProviderFunction = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default ProviderFunction;
