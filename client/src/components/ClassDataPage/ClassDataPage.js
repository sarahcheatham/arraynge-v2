import React, {Component} from "react";
import SubHeader from '../SubHeader/SubHeader';
import YearForm from './YearForm';
import SubjectForm from './SubjectForm';
import GradeLevelForm from './GradeLevelForm';
import NumberOfStudentsForm from './NumberOfStudentsForm';
// import SaveFormButton from './SaveFormButton';
import StudentDataPage from '../StudentDataPage/StudentDataPage';
import { Container, Row, Col, Form, FormGroup, Label, CustomInput, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loadUserId, loadUsername, loadClassData } from '../../store/actions';
import './ClassDataPage.css';
import dateFns from 'date-fns';

class ClassDataPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            showMenu: false,
            startYear: "",
            endYear: ""
        }
    };

    componentDidMount(){
        this.props.loadUserId();
        this.props.loadUsername();
        this.props.loadClassData();
    }

    getFormCount = counter =>{
        console.log(counter)
        const formCountHashMap = {
            0 : <YearForm/>,
            1 : <SubjectForm/>,
            2 : <GradeLevelForm/>,
            3 : <NumberOfStudentsForm/>,
            4 : <StudentDataPage/>
        }
        console.log("formCountHashMap:", formCountHashMap[counter])
        return formCountHashMap[counter]
    }

    // handleSubmit = event => {
    //     event.preventDefault();
    //     const classdata = {
    //         userId: this.props.currentUserId,
    //         gradelevel: this.props.currentGradeLevel,
    //         subject: this.props.currentSubject,
    //         year: this.props.currentYear
    //     }
    //     this.props.createClassData(classdata)
    // }
    
    // handleContinueClick = event => {
    //     event.preventDefault();
    //     console.log(event)
    // }

    
    
    render(){
        let formToShow = this.getFormCount(this.props.currentCount);
        console.log("formToShow:", formToShow)
        return(
            <Container className="classDataPage">
                <SubHeader text="CREATE A NEW CLASS" className="classDataPageHeader"/>
                <Form className="classdata-form">
                    {formToShow}
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        username: state.username,
        currentCount: state.currentCount,
        currentGradeLevel: state.currentGradeLevel,
        currentSubject: state.currentSubject,
        currentYear: state.currentYear,
        classdata: {
            loading: state.loading,
            error: state.error,
            classes: state.classes
        },
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        loadUsername: () => dispatch(loadUsername()),
        loadClassData: () => dispatch(loadClassData())
    };
}


export default connect(mapStateToProps, mapDispatchToProps) (ClassDataPage);