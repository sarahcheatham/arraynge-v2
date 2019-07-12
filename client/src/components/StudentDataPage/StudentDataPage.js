import React, {Component} from "react";
import StudentForm from '../StudentForm/StudentForm';
import SubHeader from '../SubHeader/SubHeader';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './StudentDataPage.css';
import '../ClassDataPage/ClassDataPage.css';
import { connect } from 'react-redux';
import { loadUserId, loadLastClass, updateStudentData } from '../../store/actions';

class StudentDataPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            students: []
        };
    }

    componentDidMount(){
        this.props.loadUserId();
        this.props.loadLastClass(); 
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
    
        const classId = studentdata.classId;
        const name = studentdata.name;
        const score = studentdata.score;
        const userId = studentdata.userId;
        const gradelevel = this.props.currentClass.gradelevel;
        const subject = this.props.currentClass.subject;

        let students = { userId, name, gradelevel, subject, score }
         // add the student to the class
        this.state.students.push(students);
        this.props.updateStudentData(this.props.currentClass._id, { students });

        // do a fetch(PUT) to /api/classdata/:id to update the class
        // this.props.updateClassData(id, {userId, name, gradelevel, subject, score})
        // this.props.updateClassData(id, student)
        // this.props.createStudent(classId, student) 
    }

    handleClick = e => {
        e.preventDefault();
        const students = this.state.students;
        // this.props.updateStudentData(this.props.currentClass._id, { students });
    }

    render(){
        const styles = {
            color: 'black',
            textDecoration: 'none'
        }
        let studentComponents = [];
        for(let i = 0; i < this.props.numberOfStudents; i++){
            let sc = <StudentForm key={i} onFormSubmit={this.handleFormSubmit}/>
            studentComponents.push(sc)
        }
        return(
            <Container className="studentdatacontainer">
                <SubHeader className="classDataSubHeader" text="ENTER STUDENT DATA" id="student-form-header"/>
                {studentComponents}
                <Button type="submit" className="classdatabutton" onClick={this.handleClick}>SAVE</Button>
                <Button className="continuebutton"><Link to={'/arrayngement'} style={styles} className="continuebutton">CONTINUE</Link></Button>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return{
        currentUserId: state.currentUserId,
        currentClass: state.currentClass,
        classdata: state.classdata,
        numberOfStudents: state.numberOfStudents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        loadLastClass: () => dispatch(loadLastClass()),
        updateStudentData: (classId, classdata) => dispatch(updateStudentData(classId, classdata)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (StudentDataPage);