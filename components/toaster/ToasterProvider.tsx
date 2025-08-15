"use client";

import { Toaster } from "react-hot-toast"

export const ToasterProvider = () => {
  return <Toaster position="bottom-center" toastOptions={{
    duration: 3000 
  }}/>
};