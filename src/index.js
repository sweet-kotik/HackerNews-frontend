import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import NewsPage from "./NewsPageApp";
import './css/style.css';
import htmx from "htmx.org";

let app = ReactDOMClient.createRoot(document.querySelector('#root'));

app.render(<App />)
htmx.on('#root', 'htmx:afterSettle', () => {
    if(document.querySelector('#newsPage')) {
        try {      
            app = ReactDOMClient.createRoot(document.querySelector('#root'));
            app.unmount();
            app = ReactDOMClient.createRoot(document.querySelector('#root'));
            app.render(<NewsPage />, {hydrate: true})
        } catch (error) {
            console.log(error)
        }
    } else {
        app = ReactDOMClient.createRoot(document.querySelector('#root'));
        app.unmount()
        app = ReactDOMClient.createRoot(document.querySelector('#root'));
        app.render(<App />)
    }
})