import React, { Component } from "react";
import benchmarks from '../../api/benchmarks.json';
import './Charts.css';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { loadStudentData, setCurrentClass } from '../../store/actions';


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

   
    render(){
        return(
            <Container>
                <Row>Charts</Row>
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
