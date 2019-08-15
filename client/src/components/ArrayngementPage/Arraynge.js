import React, { Component } from "react";
import benchmarks from '../../api/benchmarks.json';
import './Arraynge.css';
import { Container } from 'reactstrap';
// import './Groups/Groups.css';
import ArrayngementDropMenu from "../DropMenus/ArrayngementDropMenu";
import { connect } from 'react-redux';
import { loadStudentData, setCurrentClass } from '../../store/actions';
// import SubjectDropMenu from "./DropMenus/SubjectDropMenu";
// import NumberOfGroupsDropMenu from './DropMenus/NumberOfGroupsDropMenu';
// import TwoGroups from "./Groups/TwoGroups";
// import ThreeGroups from "./Groups/ThreeGroups";
// import FourGroups from "./Groups/FourGroups";
// import FiveGroups from "./Groups/FiveGroups";
// import SixGroups from "./Groups/SixGroups";

class Arraynge extends Component{
    constructor(){
        super();
        this.state={
            // students: [],
            // list: [],
            // sortBy: "",
            // userId: "",
            subject: "",
            gradelevel: "", 
            numberOfGroups: ""    
        };
        // this.handleSortBy = this.handleSortBy.bind(this);
        // this.handleSubjectChange = this.handleSubjectChange.bind(this);
        // this.handleGroupsChange = this.handleGroupsChange.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.drop = this.drop.bind(this);
        // this.sortStudentScore = this.sortStudentScore.bind(this);
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
    

    // handleSortBy = event =>{
    //     console.log("handleSortBy:", event)
    //     this.setState({
    //         sortBy: event.sortBy
    //     });
    // }

    handleSubjectChange = event => {
        console.log("handleSubjectChange:", event)
        this.setState({
            subject: event.subject
        });
    }

    handleGroupsChange = event => {
        console.log("handleGroupsChange:", event)
        this.setState({
            numberOfGroups: event.numberOfGroups
        });
    }
   
    allowDrop(allowdropevent){
        allowdropevent.preventDefault();
    }

    dragStart = (e, index)=>{
        this.draggedItem = e.target.parentNode.id;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text", e.target.parentNode.id)
    }

    drop(dropevent){
        dropevent.preventDefault();
        const data = dropevent.dataTransfer.getData("text");
        dropevent.target.appendChild(document.getElementById(data));
    }

    scoreInfo = {
        "BOY score": {
            propertyName: "BOYscore",
            index: 0
        },
        "MOY score": {
            propertyName: "MOYscore",
            index: 2
        },
        "EOY score": {
            propertyName: "EOYscore",
            index: 3
        },
        "EOY goal": {
            propertyName: "EOYgoal",
            index: 1
        }
    }

    //sort students by time of year for tests
    sortStudentScore = (students, sortBy) =>{
        const propertyName = this.scoreInfo[sortBy].propertyName;
        const index = this.scoreInfo[sortBy].index;

        // const { propertyName, index } = this.scoreInfo[sortBy]; // same as above, but using "destructuring"
    
        let studentCards = null;
        const sortStudents = students.sort((a, b)=>{
            return b.score[index][propertyName] - a.score[index][propertyName]
        });
        studentCards = sortStudents.map((student, index)=>{
            let color = "";
            return <li key={index}>
                        <div className="student">
                            <span className={color}/>
                            <span className="studentName">
                                {student.name}
                            </span>
                        </div>
                    </li>
        })
        console.log("studentCards:", studentCards)
        return studentCards
    }
    //assign a color square to each student based on their scores compared to the benchmarks
    getColorForScore(sortBy, student, benchmark){
        if(sortBy === ""){
            return "blankSquare"
        }
        const propertyName = this.scoreInfo[sortBy].propertyName;
        const index = this.scoreInfo[sortBy].index;
        // const { propertyName, index } = this.scoreInfo[sortBy]; // same as above, but using "destructuring"
        let color = "";
        if(student.score[index][propertyName] === null){
            color = "blankSquare"
        }
        if(student.score[index][propertyName] >= benchmark +5){
            color = "blueSquare"
        } else if(student.score[index][propertyName] >= benchmark){
            color = "greenSquare"
        } else if(student.score[index][propertyName] >= benchmark -5){
            color = "yellowSquare"
        } else if(student.score[index][propertyName] >= benchmark -10){
            color = "orangeSquare"
        } else if(student.score[index][propertyName] >= benchmark -100){
            color = "redSquare"
        } else if(student.score[index][propertyName] === null){
            color = "blankSquare"
        }
        return color
    }

    getBenchmarkForScore(sortBy){
        const benchmark = [];
        let boyBenchmark = null;
        let moyBenchmark = null;
        let eoyBenchmark = null;
    
        const findBm = benchmarks.find((bm, index)=>{
            const gradelevel = this.state.gradelevel.toUpperCase();
            const subject = this.state.subject;
            if(bm.gradelevel === gradelevel && bm.subject === subject){
               benchmark.push(bm) 
            }
        })

        if(benchmark[0] !== undefined){
            //rounds the benchmark down to nearest integer based on decimal
            boyBenchmark = Math.floor(benchmark[0].score[0].BOYscore);
            moyBenchmark = Math.floor(benchmark[0].score[1].MOYscore);
            eoyBenchmark = Math.floor(benchmark[0].score[2].EOYscore);
        }
        
        const bench = {
            "BOY score": boyBenchmark,
            "MOY score": moyBenchmark,
            "EOY score": eoyBenchmark,
            "EOY goal": eoyBenchmark
        }
        console.log("bench:", bench[sortBy])
        return bench[sortBy]

        // if(sortBy === "BOY score"){
        //     return boyBenchmark
        // } else if(sortBy === "MOY score"){
        //     return moyBenchmark
        // } else if(sortBy === "EOY score" || sortBy === "EOY goal"){
        //     return eoyBenchmark
        // }
    }

    // getNumberOfGroups(numberOfGroups){
    //     const groupHashMap = {
    //         "": "",
    //         "2": <TwoGroups onDrop={this.drop} onDragOver={this.allowDrop}/>,
    //         "3": <ThreeGroups onDrop={this.drop} onDragOver={this.allowDrop}/>,
    //         "4": <FourGroups onDrop={this.drop} onDragOver={this.allowDrop}/>,
    //         "5": <FiveGroups onDrop={this.drop} onDragOver={this.allowDrop}/>,
    //         "6": <SixGroups onDrop={this.drop} onDragOver={this.allowDrop}/>
    //     }
    //     console.log("groupHashMap:", groupHashMap[numberOfGroups])
    //     return groupHashMap[numberOfGroups]
    // }

    // getStudents(students){
    //     const subject = this.state.subject;
    //     const checkSubject = (students)=>{
    //         if(students !== null){
    //             return students.subject === subject  
    //         }
    //     }
    //     const filteredStudents = students.filter(checkSubject);
    //     return filteredStudents
    // }

    render(){
        console.log("currentClass:", this.props.currentClass)
        console.log("props", this.props)
        const benchmarkScore = this.getBenchmarkForScore(this.props.sortBy);
        let studentCards = null;
        const students = this.props.studentdata.students;
        console.log("students:", students)
        // let numberOfGroupsToShow = this.getNumberOfGroups(this.state.numberOfGroups);
        
        // const filteredStudents = this.filterBySubject(this.state.students)
        //filter students by subject
        // console.log("filteredStudents:", filteredStudents)
        
        //sort students by time of year for tests
        if(this.props.sortBy !== ""){
            studentCards = this.sortStudentScore(students, this.props.sortBy)  
        }
        //assign a square to each student based on their scores compared to the benchmarks
        // studentCards.map((student, index)=>{
        studentCards = students.map((student, index)=>{
            // console.log("student:", student.name, student.score[3].EOYscore)
            let color = "";
            if(this.props.sortBy === ""){
                color = "blankSquare"
                return <li 
                            key={index}
                            id={index}
                            className="list"
                            onDrop={this.drop}
                            onDragOver={this.allowDrop}
                        >
                            <div 
                                className="student"
                                draggable
                                onDragStart={e=>this.dragStart(e, index)}
                                id="drag"
                            >
                                <span className={color}/>
                                <span className="studentName">
                                    {student.name}
                                </span>
                            </div> 
                        </li>
            }
            if(this.props.sortBy !== ""){
                color = this.getColorForScore(this.props.sortBy, student, benchmarkScore)
                return <li 
                        key={index}
                        id={index}
                        className="list"
                        onDrop={this.drop}
                        onDragOver={this.allowDrop}
                    >
                        <div 
                            className="student"
                            draggable
                            onDragStart={e=>this.dragStart(e, index)}
                            id="drag"
                        >
                            <span className={color}/>
                            <span className="studentName">
                                {student.name}
                            </span>
                        </div> 
                    </li>
            }
        })

        
        return(
            <div className="arrayngementpage">
                <span className="inputbar">
                    <p className="studentlabel">STUDENTS:</p>
                    <ArrayngementDropMenu className="arrayngementdropmenu"/>
                    {/* <NumberOfGroupsDropMenu className="arrayngementgroups" onGroupsClick={this.handleGroupsChange}/>
                    <SubjectDropMenu className="arrayngementsubject" subject={this.state.subject} onSubjectClick={this.handleSubjectChange}/> */}
                </span>
                <Container className="mt-3 pl-0 pr-0">
                    <ul className="studentlist">
                        {studentCards}
                    </ul>
                </Container>
                {/* {numberOfGroupsToShow} */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        currentClass: state.currentClass,
        studentdata: state.studentdata,
        sortBy: state.sortBy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentClass: currentClass => dispatch(setCurrentClass(currentClass)),
        loadStudentData: classId => dispatch(loadStudentData(classId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Arraynge);
// export default Arraynge;