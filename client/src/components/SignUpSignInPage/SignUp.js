import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import { FormControl, Button } from 'react-bootstrap';
import Star from './Star';
// import NewUserButton from './NewUserButton';
// import Required from './Required';

class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        };
    }
    // checkPasswordsMatch(value){
    //     let match = this.state.password === this.state.confirmPassword;
    //     if(!match){
    //         this.setState({checkPasswordsMatch: false})
    //     }
    //     this.setState({checkPasswordsMatch: true})
    // }
    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSignUp({
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });  
    }

    render(){
        return(
            // <div className="signup">
            <Container className="signup">
                <Form className="signupForm" onSubmit={this.handleSubmit}>
                    <legend className="signupLegend">CREATE AN ACCOUNT</legend>
                    <FormGroup className="formGroup">
                        <Label className="signup-label">First Name<Star/></Label>
                        <Input
                            type="text"
                            name="firstName"
                            onChange={this.handleFormChange}
                            placeholder="Enter First Name"
                            value={this.state.firstName}
                            id="firstName"
                        />
                    </FormGroup>
                    <FormGroup className="formGroup">
                        <Label className="signup-label">Last Name<Star/></Label>
                        <Input
                            type="text"
                            name="lastName"
                            onChange={this.handleFormChange}
                            placeholder="Enter Last Name"
                            value={this.state.lastName}
                            id="lastName"
                        />
                    </FormGroup>
                    <FormGroup className="formGroup">
                        <Label className="signup-label">Email Address<Star/></Label>
                        <Input
                            type="email"
                            name="username"
                            onChange={this.handleFormChange}
                            placeholder="Enter Email Address"
                            value={this.state.username}
                            id="signup-email"
                        />
                    </FormGroup>
                    <FormGroup className="formGroup">
                        <Label className="signup-label">Password<Star/></Label>
                        <Input
                            type="password"
                            name="password"
                            onChange={this.handleFormChange}
                            placeholder="Enter Password"
                            value={this.state.password} 
                            id="signup-password"  
                        />
                    </FormGroup>
                    <FormGroup className="formGroup">
                        <Label className="signup-label">Confirm Password<Star/></Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            onChange={this.handleFormChange}
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            id="signup-confirm-password"
                        />
                    </FormGroup>
                    <Button type="submit" className="signupButton">
                        CREATE AN ACCOUNT
                    </Button>
                </Form>
            </Container>
        );
    }
}

SignUp.propTypes = {
    onSignUp: PropTypes.func.isRequired
};
export default SignUp
