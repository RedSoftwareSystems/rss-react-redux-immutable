import React from "react";
import App from 'app/components/App';
import 'www/style';
import("react-dom").then(ReactDOM => {

    const rootEl = document.getElementById('root');
    console.log(rootEl);
    const render = Component =>
        ReactDOM.render(
            <Component/>,
            rootEl
        );

    render(App);
});