import React, { Component } from 'react';
import './Charts.css';
import { Container, Row } from 'reactstrap';
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
                <Charts/>
            </div>
        )
    }
}

export default ChartsPage;