import React from 'react';
import { Row } from 'reactstrap';
// import PropTypes from 'prop-types';
import "./SubHeader.css";


const SubHeader = props => {
    return(
            <Row className={props.className} id={props.id}>{props.text}</Row>
    )
}

export default SubHeader;