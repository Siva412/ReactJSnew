import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Input from '../Input/Input';
import * as utility from '../../utility/utility';
import authContext from '../../context/context';

const Login = props => {
    let contextData = useContext(authContext);
    const [loginFormData, setLoginFormData] = useState({ uname: '', pwd: '' });
    const [loginFormDetails, setLoginFormDetails] = useState([
        {
            label: 'UserName',
            type: "text",
            placeholder: "Username",
            name: "uname",
            errMsg: "",
            validation: { required: true },
            touched: false
        },
        {
            label: 'Password',
            type: "password",
            placeholder: "Password",
            name: "pwd",
            errMsg: "",
            validation: { required: true },
            touched: false
        }
    ]);
    const onInputChanged = event => {
        let changedObj, changedIndex, modifiedObj, modifiedFormDetail;
        setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
        changedObj = {
            ...loginFormDetails.filter((a, i) => {
                if (a.name === event.target.name) {
                    changedIndex = i;
                    return true;
                }
                return false;
            })[0]
        };
        modifiedObj = utility.formValidation(changedObj, event.target.value);
        modifiedFormDetail = [...loginFormDetails];
        modifiedFormDetail[changedIndex] = modifiedObj;
        setLoginFormDetails(modifiedFormDetail);
    };
    const formSubmitted = () => {
        let formDet = [...loginFormDetails];
        for(let i = 0; i<loginFormDetails.length;i++){
            let modifiedObj = utility.formValidation(loginFormDetails[i], loginFormData[loginFormDetails[i].name]);
            formDet[i] = modifiedObj;
        }
        setLoginFormDetails(formDet);
        if (utility.formValid(loginFormDetails)) {
            contextData.setIsLoggedIn(true);
            props.history.push('/dashboard');
        }
    }
    const formEl = loginFormDetails.map(el => (<Input key={el.label} {...el} value={loginFormData[el.name]} changed={onInputChanged} />))
    return (
        <div className="login-form">
            {formEl}
            <div>
                <Link to="/signup">Sign up</Link>
            </div>
            <div className="text-center">
                <button className="btn buyit-btn" onClick={formSubmitted}>Login</button>
            </div>
        </div>
    );
};

export default Login;