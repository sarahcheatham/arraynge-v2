import React, { Component } from 'react';
import './Charts.css';
import { Container, Row } from 'reactstrap';
import Charts from './Charts';

class ChartsPage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <Container>
                <Row>Charts</Row>
                <Charts/>
            </Container>
        )
    }
}

export default ChartsPage;