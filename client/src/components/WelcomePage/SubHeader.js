import React from "react";

const SubHeader = props => {
    return(
        <div className={props.className}>
           {props.text}
        </div>
    )
}

export default SubHeader;