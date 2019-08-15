import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Container, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { connect } from 'react-redux';
import { setSortBy } from '../../store/actions';

class ArrayngementDropMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            sortBy: ""
        }
    }

    scoreClick = event => {
        event.preventDefault();
        this.props.setSortBy(event.target.innerHTML)
    }

    toggle = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }))
    }

    render(){
        console.log("DROPMENU PROPS:", this.props)
        let whatToShow = "";
        this.props.sortBy === "" ? whatToShow = "Scores" : whatToShow = this.props.sortBy;
        return(

            <Container className={this.props.className}>
                <Label className="scoresLabel">Sort By:</Label>{' '}
                <Dropdown group isOpen={this.state.showMenu} toggle={this.toggle}>
                    <DropdownToggle className="arraynge-menu-btn" caret>
                        {whatToShow}
                    </DropdownToggle>
                        <DropdownMenu className="arrayngementDropMenu">
                            <DropdownItem className="arraynge-menu-item" onClick={this.scoreClick}>BOY score</DropdownItem>
                            <DropdownItem className="arraynge-menu-item" onClick={this.scoreClick}>EOY goal</DropdownItem>
                            <DropdownItem className="arraynge-menu-item" onClick={this.scoreClick}>MOY score</DropdownItem>
                            <DropdownItem className="arraynge-menu-item" onClick={this.scoreClick}>EOY score</DropdownItem>
                        </DropdownMenu>
                </Dropdown>
            </Container>  
        );
    }
}

const mapStateToProps = state => {
    return {
        currentClass: state.currentClass,
        sortBy: state.sortBy
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSortBy: sortBy => dispatch(setSortBy(sortBy))
    }
}

ArrayngementDropMenu.propTypes ={
    onSortBy: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArrayngementDropMenu);
