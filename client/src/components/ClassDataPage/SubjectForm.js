import React from 'react';
import { Row, FormGroup, CustomInput, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setCurrentSubject, setCounter } from '../../store/actions';

class SubjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            subject: "",
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

    subjectClick = event => {
        event.preventDefault();
        // const year = { year: event.target.value };

        this.props.setCurrentSubject(event.target.value)
    }
  
    handleNextClick = e => {
        e.preventDefault();
        this.props.setCounter(this.props.currentCount+1)
    }
  
    render(){
        let whatToShow = "";
        this.props.currentSubject === "" ? whatToShow = "SHOW SUBJECTS" : whatToShow = this.props.currentSubject
        return (
                <FormGroup row className="subject">
                    <p className="classDataSubHeader">SUBJECT</p>
                    <p className="classDataText">Choose the subject that you would like to arraynge</p>
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
                                <Button type="button" className="subjects" onClick={this.subjectClick} value="MATH">MATH</Button>
                                <Button type="button" className="subjects" onClick={this.subjectClick} value="READING">READING</Button>
                            </div>
                            ) 
                            : (
                                null
                            )
                        }
                    </div>
                    {/* <div className="subjectButtons">
                        <Button type="button" className="mathButton" onClick={this.subjectClick} value="MATH">
                            MATH
                        </Button>
                        <Button type="button" className="readingButton" onClick={this.subjectClick} value="READING">
                            READING
                        </Button>
                    </div> */}
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
      currentSubject: state.currentSubject,
      currentCount: state.currentCount
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        setCurrentSubject: subject => dispatch(setCurrentSubject(subject)),
        setCounter: counter => dispatch(setCounter(counter))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (SubjectForm);