import React, {Component} from "react";
import StudentForm from '../StudentForm/StudentForm';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './StudentDataPage.css';
import { connect } from 'react-redux';
import { loadUserId, loadClassData, updateClassData } from '../../store/actions';

class StudentDataPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            // loading: false,
            classdata: [],
            error: null,
            numberOfStudents: "",
            data: [],
            lastclass: {},
            gradelevel: "",
            subject: "",
            userId: ""
        };
    }

    componentDidMount(){
        // this.setState({ loading: true })
        this.props.loadUserId();
        this.props.loadClassData();
    }
    

    handleFormSubmit = studentdata => {
        const blankScore = "";
        if(studentdata.score[0].BOYscore=== undefined){
            studentdata.score[0].BOYscore = blankScore
        } 
        if (studentdata.score[1].EOYgoal === undefined){
            studentdata.score[1].EOYgoal = blankScore
        } 
        if (studentdata.score[2].MOYscore === undefined){
            studentdata.score[2].MOYscore = blankScore
        } 
        if (studentdata.score[3].EOYscore === undefined){
            studentdata.score[3].EOYscore = blankScore
        }
        console.log("studentdata.score:", studentdata.score[0])
        // this.setState({
        //     name: studentdata.name,
        //     score: studentdata.score,
        //     userId: studentdata.userId
        // });
        const name = studentdata.name;
        const score = studentdata.score;
        const userId = studentdata.userId;
        const gradelevel = this.state.gradelevel;
        const subject = this.state.subject;

        // var student = { userId, name, gradelevel, subject, score }
        // this.state.lastClass.students.push(student); // add the student to the class
        // do a fetch(PUT) to /api/classdata/:id to update the class
        this.props.updateClassData({userId, name, gradelevel, subject, score})
        // let options = {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({ userId, name, gradelevel, subject, score })
        // }
        // fetch("/api/studentdata", options).then((res)=>{
        //     return res.json()
        // }).then((res)=>{
        //     console.log(res)
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    // handleClick(e){
    //     this.props.loadStudentData()
    // }
    handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleNextClick = e => {
        e.preventDefault();
        this.props.setCounter(this.props.currentCount+1)
    }

    render(){
        const styles = {
            color: 'black',
            textDecoration: 'none'
        }
        let studentComponents = [];
        for(let i = 0; i < this.state.numberOfStudents; i++){
            let sc = <StudentForm key={i} onFormSubmit={this.handleFormSubmit}/>
            studentComponents.push(sc)
        }
        return(
            <Container className="studentdatacontainer">
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
                </Form>
                {studentComponents}
                <Button className="continuebutton" onClick={this.handleNextClick}>CONTINUE</Button>
                {/* <Button className="continuebutton" onClick={this.handleClick}><Link to={'/arrayngement'} style={styles} className="continuebutton">CONTINUE</Link></Button> */}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return{
        currentUserId: state.currentUserId,
        classdata: {
            loading: state.loading,
            error: state.error,
            classes: state.classes
        } 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        loadClassData: () => dispatch(loadClassData()),
        updateClassData: item => dispatch(updateClassData(item)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (StudentDataPage);