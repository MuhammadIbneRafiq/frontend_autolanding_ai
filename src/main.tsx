import "./index.css";

import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <NextUIProvider className="h-full">
            <App />
        </NextUIProvider>
    </React.StrictMode>
);
