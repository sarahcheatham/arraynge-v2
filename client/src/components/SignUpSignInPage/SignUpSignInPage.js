import React from "react";
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Container, Row, Col, Alert } from 'reactstrap';
import './SignUpSignIn.css';


const SignUpSignInPage = props => {
    const renderError = () => {
        return(
            <Alert bsStyle="warning">
                <strong className="signupsigninerr">{props.err}</strong>
            </Alert>
        )
    }
    return(
        <Container className="loginPage">
                <SignIn onSignIn={props.onSignIn} err={renderError}/>
                <SignUp onSignUp={props.onSignUp} err={renderError}/>
            {props.err && this.renderError()}
        </Container>
    )
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