/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { persistor, store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      <Toaster richColors closeButton position="top-center" />
    </Provider>
  );
};

export default ReduxProvider;
