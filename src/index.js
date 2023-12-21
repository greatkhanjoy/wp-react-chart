import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import Settings from './Settings';

document.addEventListener("DOMContentLoaded", function() {
    var element = document.getElementById("wpcr-graph-container");
    if(typeof element !== "undefined" && element !== null) {
        const root = createRoot(element)
        root.render(<App />);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var settingsElement = document.getElementById("wpcr-settings");
    if(typeof settingsElement !== "undefined" && settingsElement !== null) {
        const settingsRoot = createRoot(settingsElement)
        settingsRoot.render(<Settings />);
    }
});
