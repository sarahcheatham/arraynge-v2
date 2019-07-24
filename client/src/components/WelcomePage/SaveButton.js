import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SaveButton = (props) => {
    return (
        <Button style={props.style} onClick={props.show}>
            <span>Save</span>
        </Button>
    )
}

SaveButton.propTypes ={
    show: PropTypes.func.isRequired
};
 

export default SaveButton;