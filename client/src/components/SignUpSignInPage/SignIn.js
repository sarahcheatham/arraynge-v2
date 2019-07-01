import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Star from './Star';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        };
    }

    handleFormChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSignIn({
            username: this.state.username,
            password: this.state.password
        });
    }

    render(){
        return(
            <Container className="login">
                <Form className="loginForm" onSubmit={this.handleSubmit}>
                    <legend className="loginLegend">SIGN IN</legend>
                    <FormGroup row className="email-container">
                        <Label for="email" className="signin-label">Email Address<Star/></Label>
                        <Input
                            type="email"
                            name="username"
                            onChange={this.handleFormChange}
                            placeholder="Enter Username"
                            value={this.state.username}
                            id="email"
                        />
                    </FormGroup>
                    <FormGroup row className="password-container">
                        <Label for="password" className="signin-label">Password<Star/></Label>
                        <Input
                            type="password"
                            name="password"
                            onChange={this.handleFormChange}
                            placeholder="Enter Password"
                            value={this.state.password}
                            id="password"
                        />
                    </FormGroup>
                    <Button type="submit" className="signinButton">
                        SIGN IN
                    </Button>
                </Form>
            </Container>
        );
    }
}

SignIn.propTypes ={
    onSignIn: PropTypes.func.isRequired
};

export default SignIn;