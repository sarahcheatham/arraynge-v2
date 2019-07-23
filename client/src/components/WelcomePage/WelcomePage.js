import React, {Component} from "react";
import { connect } from 'react-redux';
import { loadUsername, loadLastClass, loadClassData, setCurrentClass, loadCurrentClass, loadStudentData } from "../../store/actions";
import PropTypes from 'prop-types';
// import SubHeader from '../SubHeader/SubHeader';
import ListItem from './ListItem';
import SaveButton from './SaveButton';
import { Container, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./WelcomePage.css";

class WelcomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            classId: "",
            gradelevel: "",
            subject: "",
            year: "",
            checkboxState: false
        };
        this.checkedClass = React.createRef();
    }

    componentDidMount(){
        this.props.loadUsername();
        this.props.loadLastClass();
        this.props.loadClassData();
    }

    checkItem = item =>{
        this.setState({checkboxState: !this.state.checkboxState})
        const classId = item.classId;
        const gradelevel = item.gradelevel;
        const subject = item.subject; 
        const year = item.year;
        this.setState({ classId, gradelevel, subject, year })
        console.log(this.props)
        if(this.state.checkboxState === true && this.props.checkboxState === true){
            console.log("here")
        }
    };

    showButton = (e) => {
        e.preventDefault();
        const classId = this.state.classId;
        this.props.loadCurrentClass(classId);
        this.props.loadStudentData(classId);
    }

    onEditClick = (e) => {
        this.props.loadStudentData(this.state.classId)
    }


    render(){
        const createButton = { 
            color: "var(--text-color)",
            backgroundColor: "var(--blue-gray-tint)",
            textDecoration: 'none',
            fontFamily: "quasimoda, sans-serif",
            fontStyle: "normal",
            fontWeight: 300,
        }
        const threeButtons = { 
            color: "var(--text-color)",
            backgroundColor: "var(--blue-gray-tint)",
            textDecoration: 'none',
            fontFamily: "quasimoda, sans-serif",
            fontStyle: "normal",
            fontWeight: 300,
        }
    
        const saveButton = {
            // width: 75,
            marginBottom: "2%",
            alignSelf: 'flex-end',
            fontFamily: 'quasimoda, sans-serif'
        }

        return(
            <Container className="welcomepage">
                <Col className="welcome-left-col">
                    <Row className="currentClassContainer">
                        <div id="currClassHeader">CURRENT CLASS</div>
                        <div className="currClassPropList"><span className="currClassTitle">YEAR:</span>{" "}<span className="currClassText">{this.props.currentClass.year || ""}</span></div>
                        <div className="currClassPropList"><span className="currClassTitle">GRADE LEVEL:</span>{" "}<span className="currClassText">{this.props.currentClass.gradelevel || ""}</span></div>
                        <div className="currClassPropList"><span className="currClassTitle">SUBJECT:</span>{" "}<span className="currClassText">{this.props.currentClass.subject || ""}</span></div>
                    </Row>
                    <Row className="newClassButtonContainer">
                            <div className="button-subhead">CREATE A NEW CLASS:</div>
                            <Button className="welcomeButtons" id="newClassButton">
                                <Link to={'/classdata'} style={createButton}>
                                    + NEW CLASS
                                </Link>
                            </Button>
                    </Row>
                    <Row className="chooseDiffClassContainer">
                        <div className="diffClassHeader">CHOOSE A DIFFERENT CLASS:</div>
                        {this.state.checkboxState ? <SaveButton style={saveButton} show={this.showButton}/> : <div></div>}
                        <ul className="classList">
                            {this.props.classdata.classes.map((item, index) => {
                                const year = item.year;
                                const subject = item.subject;
                                const gradelevel = item.gradelevel;
                                const classId = item._id;
                                return <ListItem ref={this.checkedClass} key={index} className="classListItem" classId={classId} subject={subject} gradelevel={gradelevel} year={year} onCheck={this.checkItem}/>
                            })}
                        </ul>
                    </Row>
                </Col>
                <Col className="threeButtonContainer">
                        <Row className="arrayngeClassButtonContainer">
                            <div className="button-subhead">ARRAYNGE THIS CLASS:</div>
                            <Button className="welcomeButtons" id="arrayngeClassButton">
                                <Link to={'/arrayngement'} style={threeButtons}>
                                    ARRAYNGE
                                </Link>
                            </Button>
                        </Row>
                        <Row className="editClassButtonContainer">
                            <div className="button-subhead">EDIT THIS CLASS:</div>
                            <Button className="welcomeButtons" id="editClassButton" onClick={this.onEditClick}>
                                <Link to={'/scores'} style={threeButtons}>
                                    EDIT
                                </Link>
                            </Button>
                        </Row>
                        <Row className="viewChartsButtonContainer">
                            <div className="button-subhead">VIEW CHARTS FOR THIS CLASS:</div>
                            <Button className="welcomeButtons" id="viewChartsButton">
                                <Link to={'/charts'} style={threeButtons}>
                                    VIEW CHARTS
                                </Link>
                            </Button>
                        </Row>
                    </Col>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return{
        username: state.username,
        currentClass: state.currentClass,
        classdata: state.classdata,
        studentdata: state.studentdata
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUsername: () => dispatch(loadUsername()),
        loadLastClass: () => dispatch(loadLastClass()),
        loadClassData: () => dispatch(loadClassData()),
        setCurrentClass: currentClass => dispatch(setCurrentClass(currentClass)),
        loadCurrentClass: classId => dispatch(loadCurrentClass(classId)),
        loadStudentData: classId => dispatch(loadStudentData(classId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (WelcomePage);
