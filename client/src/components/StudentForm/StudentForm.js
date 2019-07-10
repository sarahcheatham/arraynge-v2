import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserId, loadClassData, updateClassData } from '../../store/actions';
import Image1 from './content-save.png';
import './StudentForm.css';
// import SvgIcon from '@material-ui/core/SvgIcon';

class StudentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            classdata: [],
            userId: '',
            name: '',
            score: [
                {BOYscore: ''},
                {EOYgoal: ''},
                {MOYscore: ''},
                {EOYscore: ''}
            ],
            check: false
        };
    }

    componentDidMount(){
       this.props.loadUserId();
       this.props.loadClassData();
    }

    handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({check: true})
        this.props.onFormSubmit({
            userId: this.state.userId,
            name: this.state.name,
            score:[
                {BOYscore: this.state.BOYscore},
                {EOYgoal: this.state.EOYgoal},
                {MOYscore: this.state.MOYscore},
                {EOYscore: this.state.EOYscore} 
            ]
        })
    }

    render(){
        console.log("PROPS:", this.props)
        let showStyle = "";
        const noShow = {
            display: "none"
        }
        const show = {
            color: "8FAD57"
        }
        if(this.state.check === true){
            showStyle = show;
        } else {
            showStyle = noShow;
        }

        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup className="studentdatapage">
                    <FormGroup id='formInlineStudent'>
                        <Label className="studentdataname">Student First Name:</Label>{' '}
                        <Input 
                            type="text" 
                            placeholder="Jane Doe" 
                            className="studentdatainputs" 
                            name="name" 
                            onChange={this.handleFormChange}
                            value={this.state.name}
                        />
                    </FormGroup>{' '}
                    <FormGroup id="formInlineBoyScore">
                        <Label className="studentdatalabels">BOY Score:</Label>{' '}
                        <Input 
                            type="text" 
                            className="studentdatainputs"
                            name="BOYscore" 
                            onChange={this.handleFormChange}
                            value={this.state.BOYscore}
                        />
                    </FormGroup>
                    <FormGroup id="formInlineEoyGoal">
                        <Label className="studentdatalabels">EOY Goal:</Label>{' '}
                        <Input 
                            type="text" 
                            className="studentdatainputs"
                            name="EOYgoal" 
                            onChange={this.handleFormChange}
                            value={this.state.EOYgoal}
                        />
                    </FormGroup>
                    <FormGroup id="formInlineMoyScore">
                        <Label className="studentdatalabels">MOY Score:</Label>{' '}
                        <Input 
                            type="text" 
                            className="studentdatainputs"
                            name="MOYscore" 
                            onChange={this.handleFormChange}
                            value={this.state.MOYscore}
                        />
                    </FormGroup>
                    <FormGroup id="formInlineEoyScore">
                        <Label className="studentdatalabels">EOY Score:</Label>{' '}
                        <Input 
                            type="text" 
                            className="studentdatainputs"
                            name="EOYscore" 
                            onChange={this.handleFormChange}
                            value={this.state.EOYscore}
                        />
                    </FormGroup>
                    <Button type="submit" className="studentdatapagebutton">
                        <img 
                            src={Image1} 
                            alt="save" 
                            id="saveimage"
                        />
                    </Button>
                    <div className="checkbox">
                        <svg style={{showStyle}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path nativeColor="#8FAD57" fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    </div>
                </FormGroup>
            </Form>
        );
    }
}

StudentForm.propTypes ={
    onFormSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return{
        currentUserId: state.currentUserId,
        classdata: {
            loading: state.loading,
            error: state.error,
            classes: state.classes
        } 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        loadClassData: () => dispatch(loadClassData()),
        updateClassData: item => dispatch(updateClassData(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (StudentForm);