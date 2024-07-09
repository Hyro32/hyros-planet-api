import { createRoot } from "react-dom/client";
import Main from "./main";
import "@fontsource-variable/lexend";
import "./index.css";

const container = document.querySelector("#root");
const root = createRoot(container!);

root.render(<Main />);
