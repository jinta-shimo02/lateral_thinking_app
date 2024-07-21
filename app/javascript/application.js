// Entry point for the build script in your package.json
// import "@hotwired/turbo-rails"
// import "./controllers"

// app/javascript/application.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"; // Reactコンポーネントへのパス

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("react-root");
    if (root) {
        ReactDOM.render(<App />, root);
    }
});
