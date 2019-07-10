import React from 'react';
import { Row, FormGroup, CustomInput, Button } from 'reactstrap';
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
    yearClick = event => {
        event.preventDefault();
        const year = { year: event.target.value };

        this.props.setYear(event.target.value)
    }
    handleNextClick = e => {
        e.preventDefault();
        this.props.setCounter(this.props.currentCount+1)
    }
    render(){
        let whatToShow = "";
        console.log(this.props.currentYear === undefined)
        this.props.currentYear === "" ? whatToShow = "SCHOOL YEAR" : whatToShow = this.props.currentYear;
        return (
            <FormGroup row className="subject">
                <Row className="gradeLevel">
                    {/* <p className="classDataSubHeader">SCHOOL YEAR</p> */}
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
// import React from 'react';
// import { Row, FormGroup, CustomInput, Button } from 'reactstrap';

// class YearForm extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = { 
//             startYear: "",
//             endYear: ""
//         }
//     }
//     handleNextClick = e => {
//         e.preventDefault();
//         console.log(e)
//     }
//     render(){
//         return (
//                 <FormGroup row className="yearContainer">
//                     <p className="classDataSubHeader">YEAR</p>
//                     <p className="classDataText">Choose the year of the class that you would like to arraynge</p>
//                     <Row>
//                         <CustomInput type="select" className="select" id="select" name="customSelect">
//                             <option className="select" id="year" value="">YEAR</option>
//                             <option className="select" value="2015 2016">2015 - 2016</option>
//                             <option className="select" value="2016 2017">2016 - 2017</option>
//                             <option className="select" value="2017 2018">2017 - 2018</option>
//                             <option className="select" value="2018 2019">2018 - 2019</option>
//                             <option className="select" value="2019 2020">2019 - 2020</option>
//                             <option className="select" value="2020 2021">2020 - 2021</option>
//                         </CustomInput>
//                     </Row>
                    // <Row>
                    //     <Button className="nextButton" onClick={this.handleNextClick}>
                    //         CONTINUE
                    //     </Button>
                    // </Row>
//                 </FormGroup>
//         )

//     }
// }

// export default YearForm;