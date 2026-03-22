import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

// Без StrictMode в dev проще сравнивать порядок эффектов с теорией (StrictMode удваивает часть вызовов).
root.render(<App />);
