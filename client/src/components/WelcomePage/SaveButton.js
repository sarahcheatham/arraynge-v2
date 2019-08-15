import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SaveButton = (props) => {
    return (
        <Button className={props.className} onClick={props.show}>
            Save
        </Button>
    )
}

SaveButton.propTypes ={
    show: PropTypes.func.isRequired
};
 

export default SaveButton;