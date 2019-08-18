import React, { Component } from "react";
import benchmarks from '../../api/benchmarks.json';
import './Charts.css';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { loadStudentData, setCurrentClass } from '../../store/actions';
// import '../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalBarSeries} from 'react-vis';


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

    compareScore(benchmark, sortBy){
        console.log("inside func compareScore:", this.props.studentdata.students)
    }

   
    render(){
        const data = [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
        ];
        const benchmarkScore = this.getBenchmarkForScore(this.props.sortBy);
        console.log("benchmarkScore:", benchmarkScore)
        console.log("compareScore:", this.compareScore())
        return(
            <Container>
                <XYPlot height={200} width={200}>
                    <VerticalBarSeries color={"var(--flamingo)"} data={data} />
                </XYPlot>
            </Container>
            
        );
    }
}

const mapStateToProps = state => {
    return{
        currentClass: state.currentClass,
        studentdata: state.studentdata,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentClass: currentClass => dispatch(setCurrentClass(currentClass)),
        loadStudentData: classId => dispatch(loadStudentData(classId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Charts);
