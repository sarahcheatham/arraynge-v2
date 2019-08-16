import React, { Component } from 'react';
import UpdateForm from "./UpdateForm";
import UpdateTable from "./UpdateTable";
import { Container, Col, Button, Table, thead, tr } from 'reactstrap';
import './EditDataPage.css';
import { connect } from 'react-redux';
import { loadStudentData, setCurrentClass, updateStudentData } from "../../store/actions";

//loading previous students when you log out and log in as a new user 
//until you click the home button then come back to the scores page.

class EditDataPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentClass: {},
            classId: "",
            message: "",
            save: {},
            isEdit: false,
            bgColor: "",
            userId: "",
            id: "",
            students: [],
            gradelevel: "",
            delete: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    isEmpty = obj => {
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false
            }
        }
        return true
    }

    componentDidMount(){
        const getClass  = localStorage.getItem("currentClass");
        const currentClass = JSON.parse(getClass);
        const currentClassId = currentClass._id;
        this.setState({classId: currentClassId})
        if(this.isEmpty(this.props.currentClass)){
            console.log("EMPTY")
            this.props.loadStudentData(currentClassId)
            this.props.setCurrentClass(currentClass)
        }
        console.log("NOT EMPTY")
        this.props.loadStudentData(this.props.currentClass._id)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentClass !== this.props.currentClass) {
            this.props.loadStudentData(this.props.currentClass._id)
        }
    }

    mouseDown(event){
        event.preventDefault();
        this.setState({bgColor: "#E9EBF4"})
    }

    mouseUp(event){
        event.preventDefault();
        this.setState({bgColor: "#F7F7FB"})
    }

    handleEdit(event){
        event.preventDefault();
        this.setState({isEdit: !this.state.isEdit})
        // if(this.state.isEdit === true){
        //     this.props.loadStudentData(this.props.currentClass._id);
        // }
        // this.props.loadStudentData(this.props.currentClass._id);
    }
    handleDelete(student){
        const id = student.id;
        console.log("handleDelete:", student)
        let options = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        }
        fetch(`/api/studentdata/${id}`, options).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log("response:", res)
        }).catch((err)=>{
            console.log("error:", err)
        })
        this.setState({delete: true})
        this.props.loadStudentData();
    }

    handleSubmit(studentdata){
        //put fetch is not refreshing when you click the edit/save scores button after clicking
        //the purple save button that is next to each students name.
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
        const id = studentdata.id;
        const name = studentdata.name;
        const score = studentdata.score;
        const userId = this.props.currentUserId;
        const gradelevel = studentdata.gradelevel;
        const subject = studentdata.subject;
        const classId = this.state.classId;
        console.log("studentdata:", studentdata)
        this.props.updateStudentData(classId, id, { classId, userId, name, gradelevel, subject, score })
    }

    render(){
        const students = this.props.studentdata.students;
        let formOrTable = "";
        let buttonText = "";
      
        const formComponents =[];
        const tableComponents = [];
       
        students.forEach((student, index)=>{
            const id = student._id;
            const userId = this.props.currentUserId;
            const name = student.name;
            const gradelevel = student.gradelevel;
            const subject = student.subject;
            const BOYscore = student.score[0].BOYscore;
            const EOYgoal = student.score[1].EOYgoal;
            const MOYscore = student.score[2].MOYscore;
            const EOYscore = student.score[3].EOYscore;
          
            let sc = <UpdateForm key={index} id={id} userId={userId} name={name} gradelevel={gradelevel} subject={subject} BOYscore={BOYscore} EOYgoal={EOYgoal} MOYscore={MOYscore} EOYscore={EOYscore} onFormSubmit={this.handleSubmit} onStudentDelete={this.handleDelete}/>
            formComponents.push(sc);
        })
        students.forEach((student, index)=>{
            const id = student._id;
            const name = student.name;
            const gradelevel = student.gradelevel;
            const subject = student.subject;
            const BOYscore = student.score[0].BOYscore;
            const EOYgoal = student.score[1].EOYgoal;
            const MOYscore = student.score[2].MOYscore;
            const EOYscore = student.score[3].EOYscore;

            let sc = <UpdateTable key={index} id={id} name={name} gradelevel={gradelevel} subject={subject} BOYscore={BOYscore} EOYgoal={EOYgoal} MOYscore={MOYscore} EOYscore={EOYscore}/>
            tableComponents.push(sc)
        })
        if(this.state.isEdit === true){
            formOrTable = <Container className="fullForm-container">
                            <div className="formheader-container">
                                <Col className="formheader">Student Name:</Col>
                                <Col className="formheader">Grade Level:</Col>
                                <Col className="formheader">Subject:</Col>
                                <Col className="formheader">BOY Score:</Col>
                                <Col className="formheader">EOY Goal:</Col>
                                <Col className="formheader">MOY Score:</Col>
                                <Col className="formheader">EOY Score:</Col>
                            </div>
                            {formComponents}
                        </Container>
            buttonText = "View Scores";
        } else {
            formOrTable = <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th className="tableheader">Student Name:</th>
                                        <th className="tableheader">Grade Level:</th>
                                        <th className="tableheader">Subject:</th>
                                        <th className="tableheader">BOY Score:</th>
                                        <th className="tableheader">EOY Goal:</th>
                                        <th className="tableheader">MOY Score:</th>
                                        <th className="tableheader">EOY Score:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableComponents}
                                </tbody>
                            </Table>
            buttonText = "Edit Scores";
        }
        return(
            <div className="secretpage">
                <div className="secretgradeandbutton">
                    <h2 className="secretgradelevel">{this.state.gradelevel}</h2>
                    <Button className="editbutton" onClick={this.handleEdit} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} style={{backgroundColor: this.state.bgColor}}>{buttonText}</Button>
                </div>
                {formOrTable}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        currentClass: state.currentClass,
        studentdata: state.studentdata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentClass: currentClass => dispatch(setCurrentClass(currentClass)),
        loadStudentData: classId => dispatch(loadStudentData(classId)),
        updateStudentData: (classId, studentId, student) => dispatch(updateStudentData(classId, studentId, student))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditDataPage);
