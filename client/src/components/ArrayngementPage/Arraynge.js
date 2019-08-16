import React, { Component } from "react";
import benchmarks from '../../api/benchmarks.json';
import './Arraynge.css';
import { Container } from 'reactstrap';
// import './Groups/Groups.css';
import ArrayngementDropMenu from "../DropMenus/ArrayngementDropMenu";
import { connect } from 'react-redux';
import { loadStudentData, setCurrentClass } from '../../store/actions';
// import NumberOfGroupsDropMenu from './DropMenus/NumberOfGroupsDropMenu';
// import TwoGroups from "./Groups/TwoGroups";
// import ThreeGroups from "./Groups/ThreeGroups";
// import FourGroups from "./Groups/FourGroups";
// import FiveGroups from "./Groups/FiveGroups";
// import SixGroups from "./Groups/SixGroups";

class Arraynge extends Component{
    constructor(){
        super();
        this.state = {
            classId: "",
            subject: "",
            gradelevel: "", 
            numberOfGroups: ""    
        };
        this.allowDrop = this.allowDrop.bind(this);
        this.drop = this.drop.bind(this);
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
        const classId = currentClass._id;
        const gradelevel = currentClass.gradelevel;
        const subject = currentClass.subject;
        this.setState({classId, gradelevel, subject});

        if(this.isEmpty(this.props.currentClass)){
            console.log("EMPTY")
            this.props.loadStudentData(classId)
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
        }
        return color
    }

    getBenchmarkForScore(sortBy){
        let boyBenchmark = null;
        let moyBenchmark = null;
        let eoyBenchmark = null;

        const benchmark = benchmarks.find(bm => bm.gradelevel === this.state.gradelevel.toUpperCase() && bm.subject === this.state.subject);
    
        if(benchmark){
            boyBenchmark = Math.floor(benchmark.score[0].BOYscore);
            moyBenchmark = Math.floor(benchmark.score[1].MOYscore);
            eoyBenchmark = Math.floor(benchmark.score[2].EOYscore);
        }

        const bench = {
            "BOY score": boyBenchmark,
            "MOY score": moyBenchmark,
            "EOY score": eoyBenchmark,
            "EOY goal": eoyBenchmark
        }

        return bench[sortBy]
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
        const benchmarkScore = this.getBenchmarkForScore(this.props.sortBy);
        let studentCards = null;
        const students = this.props.studentdata.students;
        // let numberOfGroupsToShow = this.getNumberOfGroups(this.state.numberOfGroups);
        
        //sort students by time of year for tests
        if(this.props.sortBy !== ""){
            studentCards = this.sortStudentScore(students, this.props.sortBy)  
        }

        //assign a square to each student based on their scores compared to the benchmarks
        studentCards = students.map((student, index)=>{
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
                     {/* <NumberOfGroupsDropMenu className="arrayngementgroups" onGroupsClick={this.handleGroupsChange}/> */}
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
