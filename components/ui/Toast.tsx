"use client";

import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
      }}
    />
  );
};

export default Toast;