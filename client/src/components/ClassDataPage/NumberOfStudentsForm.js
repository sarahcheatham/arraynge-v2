import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from "react-redux";
import {  createClassData, setNumberOfStudents, setCounter, loadLastClass } from '../../store/actions';
import SubHeader from '../SubHeader/SubHeader'
import './ClassDataPage.css';


class NumberOfStudentsForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberOfStudents: 0
        }
    }

    handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.props.setNumberOfStudents(event.target.value)
    }

    handleNextClick = e => {
        this.props.loadLastClass();
        this.props.setCounter(this.props.currentCount+1)
    }

    handleSubmit = event => {
        event.preventDefault();
        const classdata = {
            userId: this.props.currentUserId,
            gradelevel: this.props.currentGradeLevel,
            subject: this.props.currentSubject,
            year: this.props.currentYear
        }
        this.props.createClassData(classdata)
    }

    render(){
        const styles = {
            color: 'black',
            textDecoration: 'none'
        }
        return (
            <Row>
                <SubHeader className="classDataSubHeader" text="NUMBER OF STUDENTS"/>
                <FormGroup id='formNumberOfStudents'>
                    <Label className="classDataText">Please enter the number of students in your class:</Label>{' '}
                    <Input 
                        type='text'
                        name='numberOfStudents'
                        onChange={this.handleFormChange}
                        value={this.state.numberOfStudents}
                        className="numberofstudents-input"
                    />
                </FormGroup>
                <Row className="classdatabuttonscontainer">
                    <Button type="submit" className="classdatabutton" onClick={this.handleSubmit}>
                        SAVE
                    </Button>
                    <Link to={'/studentdata'} style={styles} className="classdatabutton">
                        <Button type="submit" className="classdatacontinuebutton" onClick={this.handleNextClick}>
                            CONTINUE
                        </Button>
                    </Link>
                </Row>
        </Row> 
        )
    }
}
const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        currentCount: state.currentCount,
        currentGradeLevel: state.currentGradeLevel,
        currentSubject: state.currentSubject,
        currentYear: state.currentYear,
        numberOfStudents: state.numberOfStudents
    };
}
const mapDispatchToProps = dispatch => {
    return {
        createClassData: classdata => dispatch(createClassData(classdata)),
        setNumberOfStudents: numOfStudents => dispatch(setNumberOfStudents(numOfStudents)),
        setCounter: counter => dispatch(setCounter(counter)),
        loadLastClass: () => dispatch(loadLastClass())
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (NumberOfStudentsForm);