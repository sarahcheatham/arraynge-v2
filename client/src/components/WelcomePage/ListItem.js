import React, { Component } from "react";
import PropTypes from 'prop-types';
// import DeleteButton from './DeleteButton';
// import Checkbox from '@material-ui/core/Checkbox';
// import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from 'reactstrap';
// import SaveButton from './SaveButton';

class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            classId: "",
            year: "",
            gradelevel: "",
            subject: "",
            numStudents: "",
            checkboxState: false,
        }
        
    }
   
    checked = event => {
        this.setState({ checkboxState: !this.state.checkboxState })
        console.log("LIST ITEM:", event.target)
        const li = this.props;
        const classId = this.props.classId;
        const gradelevel = this.props.gradelevel;
        const subject = this.props.subject;
        const year = this.props.year;
        console.log("this.props:", this.props)

        this.props.onCheck({
            classId, gradelevel, subject, year
        })
    }

    onlyChecked = event => {
        console.log(this.state.checkboxState)
    }
    render(){
        const textStyle = {
            color: '#F9586B'
        }
        const checkbox = {
            float: 'right',
            height: '10px',
            width: '10px',
            padding: 0,
            marginTop: '1%'
        }
        const buttonStyle = {
            float: 'right',
            padding: 0,
            margin: 0,
        }
        return (
            <li onChange={this.checked} classId={this.props.classId} className="classListProps">
                <div><span className={this.props.className}>YEAR:</span>{" "}<span style={textStyle}>{this.props.year}</span><input type="checkbox" style={checkbox} onChange={this.props.onCheck}/></div>
                <div><span className={this.props.className}>GRADE LEVEL:</span>{" "}<span style={textStyle}>{this.props.gradelevel}</span></div>
                <div><span className={this.props.className}>SUBJECT:</span>{" "}<span style={textStyle}>{this.props.subject}</span></div>
            </li>
        )
    }  
}

ListItem.propTypes ={
    classId: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    gradelevel: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    // numStudents: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    // show: PropTypes.func.isRequired
};

export default ListItem;