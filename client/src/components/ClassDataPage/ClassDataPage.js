import React, {Component} from "react";
import SubHeader from '../SubHeader/SubHeader';
import YearForm from './YearForm';
import SubjectForm from './SubjectForm';
import GradeLevelForm from './GradeLevelForm';
import NumberOfStudentsForm from './NumberOfStudentsForm';
import { Container, Form } from 'reactstrap';
import { connect } from "react-redux";
import { loadUserId, loadUsername, loadClassData } from '../../store/actions';
import './ClassDataPage.css';

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
        const formCountHashMap = {
            0 : <YearForm/>,
            1 : <SubjectForm/>,
            2 : <GradeLevelForm/>,
            3 : <NumberOfStudentsForm/>
        }
        return formCountHashMap[counter]
    }

    render(){
        let formToShow = this.getFormCount(this.props.currentCount);
        return(
            <Container className="classDataPage">
                <Form className="classdata-form">
                    <SubHeader text="CREATE A NEW CLASS" className="classDataPageHeader"/>
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
        classdata: state.classdata
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