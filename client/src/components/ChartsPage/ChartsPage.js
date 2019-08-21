import React, { Component } from 'react';
import './Charts.css';
import { Container, Row, Col } from 'reactstrap';
import Charts from './Charts';
import ArrayngementDropMenu from '../DropMenus/ArrayngementDropMenu';

class ChartsPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <span className="inputbar-charts">
                    <p className="chartslabel">CHARTS:</p>
                    <ArrayngementDropMenu className="arrayngementdropmenu"/>
                     {/* <NumberOfGroupsDropMenu className="arrayngementgroups" onGroupsClick={this.handleGroupsChange}/> */}
                </span>
                <Container fluid>
                <Col xs={6}>
                    <Charts/>
                </Col>
                </Container>
            </div>
        )
    }
}

export default ChartsPage;