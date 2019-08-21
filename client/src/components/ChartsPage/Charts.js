import React, { Component } from "react";
import benchmarks from '../../api/benchmarks.json';
import './Charts.css';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { loadStudentData, setCurrentClass } from '../../store/actions';
import {XYPlot, makeWidthFlexible, makeHeightFlexible, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';


class Charts extends Component{
    constructor(){
        super();
        this.state = {
            classId: "",
            subject: "",
            gradelevel: "",   
        };
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

    compareScore(students, sortBy){
        const data = [
            {x: 'At or Above Grade Level', y: 0, color: "#8FAD57"},
            {x: 'Below Grade Level', y: 0, color: "#DF4C36"},
            {x: 'Not Tested', y: 0, color: "#D7E1DF"},
            {x: 'Total Students', y: 0, color: "var(--flamingo)"}
        ]
        const benchmarkScore = this.getBenchmarkForScore(this.props.sortBy);
        if(sortBy){
            const propertyName = this.scoreInfo[sortBy].propertyName;
            const index = this.scoreInfo[sortBy].index;
            data[3]['y'] = students.length;
            students.forEach((student, i)=>{
                const score = student.score[index][propertyName];
                if(score === null){
                   data[2]['y'] += 1;
                } else if(score >= benchmarkScore){
                    data[0]['y'] += 1;
                } else {
                    data[1]['y'] +=1;
                }
            })
            return data
        }
        
    }


   
    render(){
        const FlexibleWidthXYPlot = makeWidthFlexible(XYPlot);
        const FlexibleHeightXYPlot = makeHeightFlexible(XYPlot);
        const students = this.props.studentdata.students;
        const data = this.compareScore(students, this.props.sortBy)
        console.log("data:", data)
        return(
          
            <Row>
                <FlexibleWidthXYPlot
                    xType="ordinal"
                    height={400}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis 
                        className="xAxis"
                     />
                    <YAxis />
                    <VerticalBarSeries 
                        colorType={"literal"} 
                        data={data} 
                    />
                </FlexibleWidthXYPlot>
            </Row>
     
            
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
export default connect(mapStateToProps, mapDispatchToProps)(Charts);
