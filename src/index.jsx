import React from "react"
import ReactDOM from "reactDOM/client"
import App from "./App"
import { BrowserRouter, Router } from "react-router-dom"

const root = ReactDOM.creatRoot(document.getElementById("root"));
root.render(
    <Router>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Router>
);