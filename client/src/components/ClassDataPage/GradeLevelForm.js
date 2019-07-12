import React from 'react';
import { Row, FormGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setCurrentGradeLevel, setCounter } from '../../store/actions';

class GradeLevelForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            gradelevel: "",
            showMenu: false
        }
    }
    showMenu = event => {
        event.preventDefault();
        this.setState({ showMenu: true}, ()=>{
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu = event => {
        if(!this.dropdownMenu.contains(event.target)){
            this.setState({ showMenu: false}, ()=>{
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    gradeLevelClick = event => {
        event.preventDefault();
        this.props.setGradeLevel(event.target.value)
    }

    handleNextClick = e => {
        e.preventDefault();
        this.props.setCounter(this.props.currentCount+1)
    }

    render(){
        let whatToShow = "";
        this.props.gradelevel === "" ? whatToShow = "SHOW GRADE LEVELS" : whatToShow = this.props.gradelevel
        return (
            <FormGroup row className="subject">
                <Row className="gradeLevel">
                    <p className="classDataSubHeader">GRADE LEVEL</p>
                    
                    <p className="classDataText">Choose the grade level that you would like to arraynge</p>
            
                    <div className="dropMenuContainer">
                        <Button onClick={this.showMenu} className='mainDropMenuButton'>
                            {whatToShow}
                        </Button>
                        {
                            this.state.showMenu 
                            ?
                            (
                            <div 
                                className='dropMenu'
                                ref = {(element)=>{
                                    this.dropdownMenu = element;
                                }}
                            >
                                <Button className='grades' onClick={this.gradeLevelClick} value="Kindergarten">Kindergarten</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="First Grade">First Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Second Grade">Second Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Third Grade">Third Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Fourth Grade">Fourth Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Fifth Grade">Fifth Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Sixth Grade">Sixth Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Seventh Grade">Seventh Grade</Button>
                                <Button className='grades' onClick={this.gradeLevelClick} value="Eigth Grade">Eigth Grade</Button>
                            </div>
                            ) 
                            : (
                                null
                            )
                        }
                    </div>
                </Row> 
                <Row>
                    <Button className="nextButton" onClick={this.handleNextClick}>
                        CONTINUE
                    </Button>
                </Row>
            </FormGroup>
        )

    }
}

const mapStateToProps = state => {
    return {
      gradelevel: state.currentGradeLevel,
      currentCount: state.currentCount
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        setGradeLevel: gradelevel => dispatch(setCurrentGradeLevel(gradelevel)),
        setCounter: counter => dispatch(setCounter(counter))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (GradeLevelForm);
 