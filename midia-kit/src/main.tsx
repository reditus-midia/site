import { createRoot } from "react-dom/client";
import "./base.css";
import Apresentacao from "./page";

const root = document.getElementById("root");
if (root) createRoot(root).render(<Apresentacao />);
