import React from 'react';
import PropTypes from 'prop-types';
import {spring, Motion} from "react-motion";

export const transition = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0,
        // scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: spring(0),
        // scale: spring(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: spring(1),
        // scale: spring(1),
    },
};

export class Fade extends React.Component {
    propTypes = {
        children: PropTypes.oneOfType(
            [
                PropTypes.node,
                PropTypes.arrayOf(PropTypes.node)
            ]
        ).isRequired,
        style: PropTypes.object,
        active: PropTypes.bool.isRequired,
        className: PropTypes.oneOfType(
            [
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string)
            ]
        ),
        atActive: PropTypes.object,
        atEnter: PropTypes.object,
        atLeave: PropTypes.object,
    };
    constructor(props) {
        super(props);
        this.state = {
            mountMotion: props.active
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.active && this.setState({mountMotion:true});
    }

    render() {
        const {active, children, className,
            style,
            atEnter = transition.atEnter,
            atActive = transition.atActive,
            atLeave = transition.atLeave
        } = this.props;
        return (this.state.mountMotion && <Motion
            defaultStyle={atEnter}
            style={active?atActive:atLeave}
            onRest={() => {
                !active && this.setState({mountMotion:false})
            }}
        >
            {interpolatingStyle => <div style={{top: 0, position: active?'relative':'absolute', ...style, ...interpolatingStyle}}
                                        className={className}>{children}</div>}
        </Motion>);
    }
}

export default Fade;