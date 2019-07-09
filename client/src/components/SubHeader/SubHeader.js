import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { Transition } from 'react-transition-group';
import "./SubHeader.css";


const SubHeader = props => {
    return(
            <Row className={props.className}>{props.text}</Row>
    )
}
// const SubHeader = (props, {in: inProp}) => {
//     const duration = 300;
//     const defaultStyle = {
//         transition: `opacity ${duration}ms ease-in-out`,
//         opacity: 0
//     }

//     const transitionStyles = {
//         entering: { opacity: 1 },
//         entered:  { opacity: 1 },
//         exiting:  { opacity: 0 },
//         exited:  { opacity: 0 },
//     }
//     console.log(props.children)
//     return(
//             <Transition 
//                 in={inProp} 
//                 timeout={duration}
//              >
//              {state => (
//                 <div className={`fade fade-${inProp}`} />
//             )}
//                 {/* {state => (
//                     <div style={{
//                     ...defaultStyle,
//                     ...transitionStyles[state]
//                     }}>
//                     {props.text}
//                     </div>
//                 )} */}
//             </Transition>
//     )
// }



export default SubHeader;