import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import SignUpSignInPage from './components/SignUpSignInPage/SignUpSignInPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { connect } from 'react-redux';
import { loadUserId, setCurrentUserId, setSignUpSignInError } from './store/actions';
// import WelcomeContainer from './containers/WelcomeContainer';
// import ScoresPageContainer from './containers/ScoresPageContainer';
// import ClassDataPageContainer from './containers/ClassDataPageContainer';
// import StudentDataPageContainer from './containers/StudentDataPageContainer';
// import ArrayngementPageContainer from './containers/ArrayngementPageContainer';
// import BarChartContainer from './containers/BarChartContainer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      authenticated: localStorage.getItem("token") || false,
      userId: ""
    };
  };

  
  handleSignUp = credentials => {
    const { username, password, confirmPassword } = credentials;
    console.log("credentials:", credentials)
    if(!username.trim() || !password.trim()){
      this.props.setSignUpSignInError("Must Provide All Fields")
    }else if(password !== confirmPassword){
      this.props.setSignUpSignInError("Passwords do not match")
    } else {
      fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then(res => {
        return res.json();
      }).then(data => {
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({
          authenticated: token
        });
        this.props.setSignUpSignInError("")
        this.props.loadUserId();
      });
    }
  }

  handleSignIn = credentials => {
    const { username, password } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.props.setSignUpSignInError("Must Provide All Fields")
    } else {
      fetch("/api/sessions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then(res => {
        return res.json();
      }).then(data => {
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({ authenticated: token });
        this.props.loadUserId();
        // this.props.loadClassData();
      });
    }  
  }

  handleSignOut = event => {
    localStorage.removeItem("token");
    this.setState({ authenticated: false });
    this.props.setCurrentUserId(null);
  }

  renderError = () => {
    return(
        <Alert bsStyle="warning">
            <strong className="signupsigninerr">{this.props.signUpSignInError}</strong>
        </Alert>
    )
  }
  renderSignUpSignIn = () => {
    return (
      <Switch>
        <Route
          path='/'
          render={(props)=> <SignUpSignInPage {...props} err={this.state.signUpSignInError} onSignUp={this.handleSignUp} onSignIn={this.handleSignIn} error={this.renderError}/>}
        />
      </Switch>
    );
  }

  renderApp = () => {
    return(
      <Switch>
        <Route exact path="/" component={WelcomePage}/>
        {/* <Route exact path="/" component={WelcomeContainer}/> */}
        {/* <Route path="/studentdata" component={StudentDataPageContainer}/>
        <Route path="/classdata" component={ClassDataPageContainer}/> */}
        {/* <Route exact path="/classdata" render={(props)=> <ClassDataPageContainer gradelevel={props.gradelevel} subject={props.subject} userId={props.userId} classdata={props.classdata}/>}/> */}
        {/* <Route path="/arrayngement" component={ArrayngementPageContainer}/>
        <Route exact path="/scores" component={ScoresPageContainer}/>
        <Route path="/charts" component={BarChartContainer}/> */}
        {/* <Route path="/charts" component={BarChart2}/> */}
      </Switch>
    )
  }
 
  render() {
    // console.log(this.props)
    let whatToShow = "";
    if(this.state.authenticated){
      whatToShow = this.renderApp();
    } else {
      whatToShow = this.renderSignUpSignIn();
    }
      return (
        <BrowserRouter>
          <div className="App">
            <Header/>
            <SideNav
              showNavItems={this.state.authenticated} 
              onSignOut={this.handleSignOut}
            />
            <div className="page">
              {whatToShow}
             </div>
          </div>
        </BrowserRouter>
      ); 
    }
  }

const mapStateToProps = state => {
  return {
    signUpSignInError: state.signUpSignInError
  }
  
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        setCurrentUserId: userId => dispatch(setCurrentUserId(userId)),
        setSignUpSignInError: error => dispatch(setSignUpSignInError(error))
    }
}

export default connect(null, mapDispatchToProps) (App);
