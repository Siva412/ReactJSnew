import React, { useState } from 'react';
import Input from '../Input/Input';
import * as utility from '../../utility/utility';

const SignUp = props => {
    const [signUpFormDetails, setSignUpFormDetails] = useState([
        {
            label: 'Name',
            type: "text",
            placeholder: "Name",
            name: "name",
            errMsg: "",
            validation: { required: true },
            touched: false,
            classes: ['signup-el']
        },
        {
            label: 'Gender',
            type: "radio",
            name: "gender",
            list: [
                {label: "Male", value: "male"},
                {label: "Female", value: "female"}
            ],
            errMsg: "",
            validation: { required: true },
            touched: true,
            classes: ['signup-el', 'signup-radio']
        },
        {
            label: 'Country',
            type: "dropdown",
            placeholder: "Country",
            name: "country",
            list: ["India", "USA"],
            errMsg: "",
            validation: { required: true },
            touched: true,
            classes: ['signup-el']
        },
        {
            label: 'Email',
            type: "text",
            placeholder: "Email",
            name: "email",
            errMsg: "",
            validation: { required: true },
            touched: false,
            classes: ['signup-el']
        },
        {
            label: 'Password',
            type: "password",
            placeholder: "password",
            name: "pwd",
            errMsg: "",
            validation: { required: true },
            touched: false,
            classes: ['signup-el']
        }
    ]);
    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        pwd: '',
        country: '',
        gender: 'male'
    });
    const onInputChanged = event => {
        let changedObj, changedIndex, modifiedObj, modifiedFormDetail;
        setSignUpFormData({ ...signUpFormData, [event.target.name]: event.target.value });
        changedObj = {
            ...signUpFormDetails.filter((a, i) => {
                if (a.name === event.target.name) {
                    changedIndex = i;
                    return true;
                }
                return false;
            })[0]
        };
        modifiedObj = utility.formValidation(changedObj, event.target.value);
        modifiedFormDetail = [...signUpFormDetails];
        modifiedFormDetail[changedIndex] = modifiedObj;
        setSignUpFormDetails(modifiedFormDetail);
    };
    const formEl = signUpFormDetails.map(el => (
        <Input key={el.label} {...el} value={signUpFormData[el.name]} changed={onInputChanged} />
    ));
    const formSubmitted = () => {
        let formDet = [...signUpFormDetails];
        for(let i = 0; i<signUpFormDetails.length;i++){
            let modifiedObj = utility.formValidation(signUpFormDetails[i], signUpFormData[signUpFormDetails[i].name]);
            formDet[i] = modifiedObj;
        }
        setSignUpFormDetails(formDet);
        if(utility.formValid(signUpFormDetails)){
            props.history.push('/dashboard');
        }
    };
    return (
        <div className="signup-form">
            <div>
                <form>
                    {formEl}
                </form>
            </div>
            <div>
                <button className="btn buyit-btn" onClick={formSubmitted}>Submit</button>
            </div>
        </div>
    )
};

export default SignUp;