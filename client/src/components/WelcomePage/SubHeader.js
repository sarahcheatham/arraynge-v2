import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { Transition } from 'react-transition-group';

const SubHeader = (props, {in: inProp}) => {
    const duration = 300;
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    }
    return(
            <Transition 
                in={this.state.in} 
                timeout={duration}
             >
             {state => (
                <div className={`fade fade-${state}`} />
            )}
                {/* {state => (
                    <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                    }}>
                    {props.text}
                    </div>
                )} */}
            </Transition>
    )
}



export default SubHeader;