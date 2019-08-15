import React, {Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadUsername, loadLastClass, loadClassData, setCurrentClass, loadCurrentClass, loadStudentData } from "../../store/actions";
import PropTypes from 'prop-types';
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

    isEmpty = obj => {
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false
            }
        }
        return true
    }

    componentDidMount(){
        this.props.loadUsername();
        this.props.loadClassData();
        const getClass  = localStorage.getItem("currentClass");
        const currentClass = JSON.parse(getClass);
        
        if(this.isEmpty(currentClass)){
            this.props.loadLastClass();
        } else{
            const currentClassId = currentClass._id;
            this.props.loadCurrentClass(currentClassId)
        }
    }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     // console.log("prevProps:", prevProps)
    //     // console.log("prevState:", prevState)
    //     // console.log("snapshot:", snapshot)
    // }

    checkItem = item =>{
        console.log(this.props.currentClass._id, item.classID)
        this.setState({checkboxState: !this.state.checkboxState})
        const classId = item.classID;
        const gradelevel = item.gradelevel;
        const subject = item.subject; 
        const year = item.year;
        this.setState({ classId, gradelevel, subject, year })
        console.log("CURRENT CLASS:", this.props.currentClass)
        if(this.state.checkboxState === true && this.props.checkboxState === true){
            console.log("here")
        }
    };

    saveButton = (e) => {
        e.preventDefault();
        const classId = this.state.classId;
        this.props.loadCurrentClass(classId);
        this.props.loadStudentData(classId);
        // console.log("currentCLASS:", this.props.currentClass)
    }

    onRouterClick = (e) => {
        // console.log("currentCLASS:", this.props.currentClass)
        // console.log('edit click', this.state.classId)
        localStorage.setItem("currentClass", JSON.stringify(this.props.currentClass));
        this.props.setCurrentClass(this.props.currentClass)
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
            float: "right",
            marginBottom: "2%",
            borderRadius: 5,
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingTop: "1%",
            paddingBottom: "1%",
            alignSelf: 'flex-end',
            fontFamily: 'quasimoda, sans-serif',
            backgroundColor: "var(--mermaid-tint)",
            borderColor: "var(--mermaid-green)",
            color: "var(--mermaid-green)"
        }

        // let year = "";
        // let gradelevel = "";
        // let subject = "";
        

        return(
            <Container className="welcomepage">
                <Col className="welcome-left-col">
                    <Row className="currentClassContainer">
                        <div id="currClassHeader">CURRENT CLASS</div>
                        <div className="currClassPropList"><span className="currClassTitle">YEAR:</span>{" "}<span className="currClassText">{this.props.currentClass.year}</span></div>
                        <div className="currClassPropList"><span className="currClassTitle">GRADE LEVEL:</span>{" "}<span className="currClassText">{this.props.currentClass.gradelevel}</span></div>
                        <div className="currClassPropList"><span className="currClassTitle">SUBJECT:</span>{" "}<span className="currClassText">{this.props.currentClass.subject}</span></div>
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
                        <Row className="diffClassHeader">CHOOSE A DIFFERENT CLASS: {" "} {this.state.checkboxState ? <SaveButton style={saveButton} show={this.saveButton}/> : <div className="saveButton-noDisplay"></div>}</Row>
                        <ul className="classList">
                            {this.props.classdata.classes.map((item, index) => {
                                const year = item.year;
                                const subject = item.subject;
                                const gradelevel = item.gradelevel;
                                const classID = item._id;
                                // console.log(this.checkedClass.current)
                                return <ListItem currentClass={this.props.currentClass} ref={this.checkedClass} key={index} className="classListItem" classID={classID} subject={subject} gradelevel={gradelevel} year={year} onCheck={this.checkItem}/>
                            })}
                        </ul>
                    </Row>
                </Col>
                <Col className="threeButtonContainer">
                        <Row className="arrayngeClassButtonContainer">
                            <div className="button-subhead">ARRAYNGE THIS CLASS:</div>
                            <Button className="welcomeButtons" id="arrayngeClassButton" onClick={this.onRouterClick}>
                                <Link to={'/arraynge'} style={threeButtons}>
                                    ARRAYNGE
                                </Link>
                            </Button>
                        </Row>
                        <Row className="editClassButtonContainer">
                            <div className="button-subhead">EDIT THIS CLASS:</div>
                            <Button className="welcomeButtons" id="editClassButton" onClick={this.onRouterClick}>
                                <Link to={'/scores'} style={threeButtons}>
                                    EDIT
                                </Link>
                            </Button>
                        </Row>
                        <Row className="viewChartsButtonContainer">
                            <div className="button-subhead">VIEW CHARTS FOR THIS CLASS:</div>
                            <Button className="welcomeButtons" id="viewChartsButton" onClick={this.onRouterClick}>
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
        currentUserId: state.currentUserId,
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
// export default withRouter(connect(mapStateToProps, mapDispatchToProps) (WelcomePage));
