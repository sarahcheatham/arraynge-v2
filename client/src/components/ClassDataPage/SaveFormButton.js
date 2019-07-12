import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import { connect } from "react-redux";
import { createClassData, setCounter } from '../../store/actions';


class SaveFormButton extends Component {

    handleSubmit = event => {
        event.preventDefault();
        const classdata = {
            userId: this.props.currentUserId,
            gradelevel: this.props.currentGradeLevel,
            subject: this.props.currentSubject,
            year: this.props.currentYear
        }
        this.props.createClassData(classdata)
    }
    
    handleNextClick = e => {
        e.preventDefault();
        this.props.setCounter(this.props.currentCount+1)
    }

    render(){
        return (
            <Row className="classdatabuttonscontainer">
                <Button type="submit" className="classdatabutton" onClick={this.handleSubmit}>SAVE</Button>
                <Button className="nextButton" onClick={this.handleNextClick}>CONTINUE</Button>
            </Row>
        )
    }
}
const mapStateToProps = state => {
    return {
        currentUserId: state.currentUserId,
        currentCount: state.currentCount,
        currentGradeLevel: state.currentGradeLevel,
        currentSubject: state.currentSubject,
        currentYear: state.currentYear,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        createClassData: classdata => dispatch(createClassData(classdata)),
        setCounter: counter => dispatch(setCounter(counter))
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (SaveFormButton);