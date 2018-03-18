import React from 'react';
import {AnimatedSwitch} from "react-router-transition";
import {transition as fadeTransition} from 'app/components/animations/Fade';


const Switch = ({children}) => (
    <AnimatedSwitch
        {...fadeTransition}
        mapStyles={styles => ({
            opacity: styles.opacity,
            transform: `scale(${styles.scale})`,
        })}
        className={'fade-container'}
    >{children}</AnimatedSwitch>
);

export default Switch;