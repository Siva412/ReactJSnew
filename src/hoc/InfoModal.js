import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

/*const infoModal = (Component, showModal, modalClosed) => {
    const ModComp = props => {
        return (
            <React.Fragment>
                {showModal ? <Backdrop /> : null}
                {showModal?<Modal close={modalClosed}/>:null}
                <Component {...props} />
            </React.Fragment>
        );
    };
    return ModComp;
};*/
const InfoModal = props => {
    return (
        <React.Fragment>
            {props.showModal.flag ? <Backdrop clicked={props.modalClosed} /> : null}
            {props.showModal.flag?<Modal close={props.modalClosed} message={props.showModal.message}/>:null}
            {props.children}
        </React.Fragment>
    );
}

export default InfoModal;

