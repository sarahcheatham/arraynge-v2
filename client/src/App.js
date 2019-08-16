import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
// import Username from './components/Username/Username';
import SignUpSignInPage from './components/SignUpSignInPage/SignUpSignInPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import ClassDataPage from './components/ClassDataPage/ClassDataPage';
import StudentDataPage from './components/StudentDataPage/StudentDataPage';
import Arraynge from './components/ArrayngementPage/Arraynge';
import { connect } from 'react-redux';
import { loadUserId, setCurrentUserId, setUsername, setSignUpSignInError, loadClassData } from './store/actions';
// import { withRouter } from 'react-router-dom';
import EditDataPage from './components/EditDataPage/EditDataPage';
// import ClassDataPageContainer from './containers/ClassDataPageContainer';

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

  componentDidMount(){
    console.log("history:", this.props.history)
  }

  
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
        console.log("token:", token)
        localStorage.setItem("token", token);
        this.setState({ authenticated: token });
        this.props.loadUserId();
        this.props.loadClassData();
        // this.props.loadLastClass();
      });
    }  
  }

  handleSignOut = event => {
    localStorage.removeItem("token");
    this.setState({ authenticated: false });
    this.props.setCurrentUserId(null);
    // this.props.setUsername("Sign In");
    localStorage.clear();
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
        <Route path="/classdata" component={ClassDataPage}/>
        <Route path="/studentdata" component={StudentDataPage}/>
        <Route path="/scores" component={EditDataPage}/>
        <Route path="/arraynge" component={Arraynge}/>
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
            {/* <Username /> */}
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
    signUpSignInError: state.signUpSignInError,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserId: () => dispatch(loadUserId()),
        setCurrentUserId: userId => dispatch(setCurrentUserId(userId)),
        setSignUpSignInError: error => dispatch(setSignUpSignInError(error)),
        setUsername: username => dispatch(setUsername(username)),
        loadClassData: () => dispatch(loadClassData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
