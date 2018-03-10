import React from "react";

// export {default as About} from './About';
import  Home from './Home';
import About from './About';
import Topics from './Topics';

export default {
    "/": {exact: true, component: Home, navTitle: 'Home'},
    "/about": {component: About, navTitle: 'About'},
    "/topics": {component: Topics, navTitle: 'Topics'},
}