import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from "react-redux";
import { loadUserId, createClassData, setNumberOfStudents, setCounter } from '../../store/actions';
import SaveFormButton from './SaveFormButton';


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
        e.preventDefault();
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
            <Form>
                <Row className="subjectheader">MATH</Row>
                <Row className="studentdatasubheader">ENTER STUDENT DATA</Row>
                <FormGroup id='formNumberOfStudents'>
                    <Label className="numberofstudents">Please enter the number of students in your class:</Label>{' '}
                    <Input 
                        type='text'
                        name='numberOfStudents'
                        onChange={this.handleFormChange}
                        value={this.state.numberOfStudents}
                    />
                </FormGroup>
                <Row className="classdatabuttonscontainer">
                    <Button type="submit" className="classdatabutton" onClick={this.handleSubmit}>
                        SAVE
                    </Button>
                    
                    <Button className="nextButton" onClick={this.handleNextClick}>
                        CONTINUE
                    </Button>
                </Row>
        </Form>
        
                /* <Link to={'/studentdata'} style={styles} className="classdatabutton">
                    <Button type="submit" className="classdatacontinuebutton" onClick={this.handleContinueClick}>
                        CONTINUE
                    </Button>
                </Link> */
           
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
        loadUserId: () => dispatch(loadUserId()),
        createClassData: classdata => dispatch(createClassData(classdata)),
        setNumberOfStudents: numOfStudents => dispatch(setNumberOfStudents(numOfStudents)),
        setCounter: counter => dispatch(setCounter(counter))
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (SaveFormButton);