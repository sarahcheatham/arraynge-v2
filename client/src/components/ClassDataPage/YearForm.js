import React from 'react';
import { Row, FormGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setYear, setCounter } from '../../store/actions';
import SubHeader from '../SubHeader/SubHeader';

class GradeLevelForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            year: "",
            counter: 1,
            showMenu: false
        }
    }
    showMenu = event => {
        console.log(this.dropdownMenu === null)
        this.setState({ showMenu: true}, ()=>{
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu = event => {
        console.log(this.dropdownMenu === null)
        // console.log(this.dropdownMenu)
        if(!this.dropdownMenu.contains(event.target)){
            this.setState({ showMenu: false}, ()=>{
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }
    yearClick = event => {
        event.preventDefault();
        this.props.setYear(event.target.value)
    }
    handleNextClick = e => {
        e.preventDefault();
        this.props.setCounter(this.props.currentCount+1)
    }
    render(){
        let whatToShow = "";
        this.props.currentYear === "" ? whatToShow = "SCHOOL YEAR" : whatToShow = this.props.currentYear;
        return (
            <FormGroup row className="subject">
                <Row className="gradeLevel">
                    <SubHeader className="classDataSubHeader" text="SCHOOL YEAR"/>
                    
                    <p className="classDataText">Choose the school year of the class that you would like to arraynge</p>
            
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
                                <Button className='years' onClick={this.yearClick} value="2015-2016">2015-2016</Button>
                                <Button className='years' onClick={this.yearClick} value="2016-2017">2016-2017</Button>
                                <Button className='years' onClick={this.yearClick} value="2017-2018">2017-2018</Button>
                                <Button className='years' onClick={this.yearClick} value="2018-2019">2018-2019</Button>
                                <Button className='years' onClick={this.yearClick} value="2019-2020">2019-2020</Button>
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
      currentYear: state.currentYear,
      currentCount: state.currentCount
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        setYear: year => dispatch(setYear(year)),
        setCounter: counter => dispatch(setCounter(counter))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (GradeLevelForm);
