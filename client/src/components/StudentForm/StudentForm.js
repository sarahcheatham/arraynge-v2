import React, { Component } from "react";
import { Col, Row, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserId, loadClassData, createStudentData } from '../../store/actions';
import Image1 from './content-save.png';
import './StudentForm.css';

class StudentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            classdata: [],
            userId: '',
            name: '',
            score: [
                {BOYscore: ''},
                {EOYgoal: ''},
                {MOYscore: ''},
                {EOYscore: ''}
            ],
            check: false
        };
    }

    componentDidMount(){
       this.props.loadUserId();
       this.props.loadClassData();
    }

    handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({check: true})
        this.props.onFormSubmit({
            classId: this.props.currentClass._id,
            userId: this.props.currentUserId,
            name: this.state.name,
            score:[
                {BOYscore: this.state.BOYscore},
                {EOYgoal: this.state.EOYgoal},
                {MOYscore: this.state.MOYscore},
                {EOYscore: this.state.EOYscore} 
            ]
        })
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit} className="studentdatapage">
                <Row className="single-form-container">
                    <Col>
                        <FormGroup id='formInlineStudent'> 
                            <Label className="studentdataname">Student First Name:</Label>
                            <Input 
                                type="text" 
                                placeholder="Jane Doe" 
                                className="studentdatainputs" 
                                name="name" 
                                onChange={this.handleFormChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup id="formInlineBoyScore">
                            <Label className="studentdatalabels">BOY Score:</Label>{' '}
                            <Input 
                                type="text" 
                                className="studentdatainputs"
                                name="BOYscore" 
                                onChange={this.handleFormChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup id="formInlineEoyGoal">
                            <Label className="studentdatalabels">EOY Goal:</Label>{' '}
                            <Input 
                                type="text" 
                                className="studentdatainputs"
                                name="EOYgoal" 
                                onChange={this.handleFormChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup id="formInlineMoyScore">
                            <Label className="studentdatalabels">MOY Score:</Label>{' '}
                            <Input 
                                type="text" 
                                className="studentdatainputs"
                                name="MOYscore" 
                                onChange={this.handleFormChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup id="formInlineEoyScore">
                            <Label className="studentdatalabels">EOY Score:</Label>{' '}
                            <Input 
                                type="text" 
                                className="studentdatainputs"
                                name="EOYscore" 
                                onChange={this.handleFormChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col className="studentdata-button-container">
                        <Row>{" "}</Row>
                        <Row>
                            <Button type="submit" className="studentdatainputs" id="studentdatapagebutton">
                                <img 
                                    src={Image1} 
                                    alt="save" 
                                />
                            </Button>
                        </Row>
                    </Col>
                    {/* <Col className="checkbox-container">
                        <svg style={{showStyle}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path nativecolor="#8FAD57" fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    </Col> */}
                </Row>
            </Form>
        );
    }
}

StudentForm.propTypes ={
    onFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return{
        currentUserId: state.currentUserId,
        classdata: state.classdata,
        currentClass: state.currentClass,
        studentdata: state.studentdata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        loadClassData: () => dispatch(loadClassData()),
        createStudentData: (classId, student) => dispatch(createStudentData(classId, student))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (StudentForm);