import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Image1 from './content-save.png';
// import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone';
// import SvgIcon from '@material-ui/core/SvgIcon';

class UpdateForm extends Component{
    constructor(){
        super();
        this.state={
            save_changes:{},
            id: "",
            userId: "",
            name: "",
            subject: "",
            gradelevel: "",
            score: [
                {BOYscore: ''},
                {EOYgoal: ''},
                {MOYscore: ''},
                {EOYscore: ''}
            ],
            check: false,
            delete: false
        }
        // this.changeNameValue = this.changeNameValue.bind(this);
        // this.changeSubjectValue = this.changeSubjectValue.bind(this);
        // this.changeBoyScore = this.changeBoyScore.bind(this);
        // this.changeEoyGoal = this.changeEoyGoal.bind(this);
        // this.changeMoyScore = this.changeMoyScore.bind(this);
        // this.changeEoyScore = this.changeEoyScore.bind(this);
        // this.changeGradeLevel = this.changeGradeLevel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount(){
        const { id, name, gradelevel, subject, BOYscore, EOYgoal, MOYscore, EOYscore } = this.props;
        this.setState({ id, name, gradelevel, subject, BOYscore, EOYgoal, MOYscore, EOYscore })
    }


    handleFormChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    // changeNameValue(event){
    //     this.setState({name: event.target.value})
    // }

    // changeSubjectValue(event){
    //     this.setState({subject: event.target.value})
    // }

    // changeBoyScore(event){
    //     this.setState({BOYscore: event.target.value})
    // }

    // changeEoyGoal(event){
    //     this.setState({EOYgoal: event.target.value})
    // }

    // changeMoyScore(event){
    //     this.setState({MOYscore: event.target.value})
    // }

    // changeEoyScore(event){
    //     this.setState({EOYscore: event.target.value})
    // }

    // changeGradeLevel(event){
    //     this.setState({gradelevel: event.target.value})
    // }

    //handleDelete
    handleDelete(event){
        event.preventDefault();
        console.log(event)
        this.setState({delete: true});
        this.props.onStudentDelete({
            id: this.state.id,
            name: this.state.name,
            subject: this.state.subject,
            gradelevel: this.state.gradelevel,
            score:[
                {BOYscore: this.state.BOYscore},
                {EOYgoal: this.state.EOYgoal},
                {MOYscore: this.state.MOYscore},
                {EOYscore: this.state.EOYscore}
            ]
        })
    }
    //handleSubmit function
    handleSubmit(event){
        event.preventDefault();
        this.setState({check: true})
        this.props.onFormSubmit({
            id: this.state.id,
            userId: this.props.currentUserId,
            name: this.state.name,
            subject: this.state.subject,
            gradelevel: this.state.gradelevel,
            score:[
                {BOYscore: this.state.BOYscore},
                {EOYgoal: this.state.EOYgoal},
                {MOYscore: this.state.MOYscore},
                {EOYscore: this.state.EOYscore}
            ]
        })
    }
    render(){
        let props = this.props;
        // let showStyle = "";
        // const noShow = {
        //     display: "none"
        // }
        // const show = {
        //     color: "8FAD57"
        // }
        // if(this.state.check === true){
        //     showStyle = show;
        // } else {
        //     showStyle = noShow;
        // }
        return(
            <Container className="updateForm-container">
                <Form className="updateForm">
             
                    <Input 
                        type="text"
                        value={this.state.name} 
                        name="name" 
                        className="studentlistinput" 
                        id="updateForm-name"
                        onChange={this.handleFormChange}
                        placeholder={props.name} 
                    />
                
                    <Input 
                        type="text" 
                        value={this.state.gradelevel} 
                        name="gradelevel" 
                        className="studentlistinput" 
                        id="updateForm-gradelevel"
                        onChange={this.handleFormChange}
                        placeholder={props.gradelevel} 
                    />
                
                    <Input 
                        type="text"
                        value={this.state.subject} 
                        name="subject" 
                        className="studentlistinput" 
                        id="updateForm-subject"
                        onChange={this.handleFormChange}
                        placeholder={props.subject} 
                    />
                
                    <Input 
                        type="text" 
                        value={this.state.BOYscore || ""} 
                        name="BOYscore" 
                        className="studentlistinput" 
                        id="updateForm-BOY"
                        onChange={this.handleFormChange}
                        placeholder={props.BOYscore} 
                    />
                
                    <Input 
                        type="text" 
                        value={this.state.EOYgoal || ""} 
                        name="EOYgoal" 
                        className="studentlistinput" 
                        id="updateForm-EOYgoal"
                        onChange={this.handleFormChange}
                        placeholder={props.EOYgoal} 
                    />
                
                    <Input 
                        type="text" 
                        value={this.state.MOYscore || ""} 
                        name="MOYscore"
                        className="studentlistinput" 
                        id="updateForm-MOY"
                        onChange={this.handleFormChange}
                        placeholder={props.MOYscore}
                    />
                
                    <Input 
                        type="text" 
                        value={this.state.EOYscore || ""} 
                        name="EOYscore" 
                        className="studentlistinput" 
                        id="updateForm-EOY"
                        onChange={this.handleFormChange}
                        placeholder={props.EOYscore} 
                    />
            
                
            
                    <Button className="studentlistbutton" id="updateForm-button" onClick={this.handleSubmit}>
                        <img 
                            src={Image1} 
                            alt="save" 
                            id="saveimage"
                        />
                    </Button>
                </Form>
            </Container>
        )
    }
}

UpdateForm.propTypes = {
    name: PropTypes.string.isRequired,
    gradelevel: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    BOYscore: PropTypes.number,
    EOYgoal: PropTypes.number,
    MOYscore: PropTypes.number,
    EOYscore: PropTypes.number
};
  

export default UpdateForm;
