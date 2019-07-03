import React from "react";
import PropTypes from "prop-types";
// import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";
import './SideNav.css';
const SideNav = props => {
  let whatToShow = "";

  if(props.showNavItems === false){
    whatToShow = "Sign In"
  } else {
    whatToShow = "Sign Out"
  }

  return(
    <Nav vertical className="navbar">
        <NavItem onClick={props.onSignOut} className="signoutButton">{whatToShow}</NavItem> <NavLink href="#">Home</NavLink> <NavLink href="#">Edit Scores</NavLink> <NavLink href="#">Arraynge</NavLink> <NavLink href="#">View Charts</NavLink>
    </Nav>
  )
  // return (
  //   <Navbar inverse bClass="navie">
  //       <Nav>
  //         <NavItem onClick={props.onSignOut} className="signoutButton">{whatToShow}</NavItem>
  //       </Nav>
  //       <Nav>
  //           <Link to="/" className="secret"><Navbar.Text>Home</Navbar.Text></Link>
  //       </Nav>
  //       <Nav>
  //           <Link to="/scores" className="secret"><Navbar.Text>Edit Scores</Navbar.Text></Link>
  //       </Nav>
  //       <Nav>
  //           <Link to="/arrayngement" id="longword" className="secret"><Navbar.Text>Arraynge</Navbar.Text></Link>
  //       </Nav>
  //       <Nav>
  //         <Link to="/charts" className="secret"><Navbar.Text>View Charts</Navbar.Text></Link>
  //       </Nav>
  //   </Navbar>
  // );
}


SideNav.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.string.isRequired
};

export default SideNav;

{/* <Nav vertical>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Another Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">Disabled Link</NavLink>
          </NavItem>
        </Nav> */}
