import React from 'react';
import classes from './Modal.module.css';

const Modal = props => {
    return (
        <div className={classes.Modal}>
            <div>
                <span>{props.message}</span>
            </div>
            <div className="text-center">
                <button className="btn buyit-btn" onClick={props.close}>OK</button>
            </div>
        </div>
    )
};

export default Modal;