import React, {Component} from "react";
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';
// import { Alert } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import './SignUpSignIn.css';


class SignUpSignInPage extends Component{
    constructor(props){
        super(props)
    }
    // renderError(){
    //     return(
    //         <Alert bsStyle="warning">
    //             <strong className="signupsigninerr">{this.props.err}</strong>
    //         </Alert>
    //     )
    // }
    render(){
        return(
            <Container className="loginPage">
                    <SignIn onSignIn={this.props.onSignIn} err={this.renderError}/>
                    <SignUp onSignUp={this.props.onSignUp} err={this.renderError}/>
                {/* {this.props.err && this.renderError()} */}
            </Container>
        )
    }
}

Container.propTypes = {
    fluid:  PropTypes.bool
    // applies .container-fluid class
}

Row.propTypes = {
    noGutters: PropTypes.bool,
}

const stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const columnProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
  PropTypes.shape({
    size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    // example size values:
    // 12 || "12" => col-12 or col-`width`-12
    // auto => col-auto or col-`width`-auto
    // true => col or col-`width`
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })
]);

Col.propTypes = {
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    xl: columnProps,
    // override the predefined width (the ones above) with your own custom widths.
    // see https://github.com/reactstrap/reactstrap/issues/297#issuecomment-273556116
    // widths: PropTypes.array,
}

SignUpSignInPage.propTypes = {
    // err: PropTypes.string,
    onSignUp: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired
}

export default SignUpSignInPage;