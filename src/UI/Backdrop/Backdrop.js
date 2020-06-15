import React from 'react';

const Backdrop = props => {
    return (
        <div onClick={props.clicked} style={{
            position: "fixed",
            left: "0",
            top: "0",
            zIndex: "9",
            height: "100vw",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.5)"
        }}>

        </div>
    )
};

export default Backdrop;