import React from "react";
import App from 'app/components/App';
import 'www/style';
import {spring} from 'react-motion';
import("react-dom").then(ReactDOM => {

    const rootEl = document.getElementById('root');
    console.log(rootEl);
    const render = Component =>
        // ReactDOM.hydrate(
        ReactDOM.render(
            <Component/>,
            rootEl
        );
window.motion = spring;
    render(App);
});