import React, { useState, useEffect } from 'react';
import classes from './Toast.module.css';

const Toast = props => {
    const [showToast, setToast] = useState(false);
    const [msg, setMsg] = useState('');
    let timer = null;
    useEffect(() => {        
        if (props.show) {
            setMsg(props.show);
            setToast(true);
            timer = setTimeout(() => {
                setToast(false);
                setMsg('');
            }, 1000);
        }
        
    }, [props.show]);
    useEffect(() => {
        return () => {
            timer && clearTimeout(timer);
        }
    }, []);
    return showToast ? <div className={classes.Toast}>{msg}</div> : null;
};

export default Toast;