// import toast, { Toaster } from "react-hot-toast";
import App from "./components/App/App";
import { createRoot } from "react-dom/client";
// Нормалізація стилів
import "modern-normalize";
// Глобальні стилі (додатково)
import "./global.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(<App />);
