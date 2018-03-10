import React from 'react';
import {spring, AnimatedSwitch} from "react-router-transition";

const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: spring(0),
        scale: spring(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: spring(1),
        scale: spring(1),
    },
};


const Switch = ({children}) => (
    <AnimatedSwitch
        {...bounceTransition}
        mapStyles={styles => ({
            opacity: styles.opacity,
            transform: `scale(${styles.scale})`,
        })}
        className={'route-wrapper'}
    >{children}</AnimatedSwitch>
);

export default Switch;