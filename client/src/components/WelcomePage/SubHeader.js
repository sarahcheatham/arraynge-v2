import React from "react";
import { Col, Row } from 'reactstrap';

const SubHeader = props => {
    return(
        <Row className={props.className}>
           <Col>{props.text}</Col>
        </Row>
    )
}

export default SubHeader;