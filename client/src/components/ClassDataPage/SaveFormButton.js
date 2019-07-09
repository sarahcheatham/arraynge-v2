import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'reactstrap';
import { connect } from "react-redux";
import { loadUserId, createClassData, setCounter } from '../../store/actions';


class SaveFormButton extends React.Component {
    constructor(props){
        super(props);
    }

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
    
    handleContinueClick = event => {
        console.log(event)
        // this.props.loadStudentData()
    }

    render(){
        const styles = {
            color: 'black',
            textDecoration: 'none'
        }
        return (
            <Row className="classdatabuttonscontainer">
                <Button type="submit" className="classdatabutton" onClick={this.handleSubmit}>
                    SAVE
                </Button>
                <Link to={'/studentdata'} style={styles} className="classdatabutton">
                    <Button type="submit" className="classdatacontinuebutton" onClick={this.handleContinueClick}>
                        CONTINUE
                    </Button>
                </Link>
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
        loadUserId: () => dispatch(loadUserId()),
        createClassData: classdata => dispatch(createClassData(classdata)),
        setCounter: counter => dispatch(setCounter(counter))
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (SaveFormButton);