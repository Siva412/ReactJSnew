import React from 'react';

const Input = props => {
    let classes = ["form-group"];
    if (props.classes && props.classes.length > 0) {
        classes = classes.concat(props.classes);
    }
    let inputEl = '';
    if (props.type === 'dropdown') {
        inputEl = (
            <select name={props.name} value={props.value} placeholder={props.placeholder} onChange={e => (props.changed(e))} className="form-control">
                {props.list.map(obj => (<option key={obj} value={obj}>{obj}</option>))}
            </select>
        )
    }
    else if (props.type === 'radio') {
        inputEl = (
            props.list.map(obj => {
                let propObj = {};
                if (obj.value === 'male') {
                    propObj.checked = 'checked';
                }
                return <label key={obj.value}><input type={props.type} name={props.name} value={obj.value} onChange={e => (props.changed(e))} {...propObj} />{obj.label}</label>
            })
        )
        inputEl = <div>{inputEl}</div>;
    }
    else {
        inputEl = <input type={props.type} value={props.value} placeholder={props.placeholder} name={props.name} onChange={e => (props.changed(e))} className="form-control" />;
    }
    return (
        <div className={classes.join(' ')}>
            {props.label ? <label>{props.label}</label> : null}
            {inputEl}
            <span className="err-msg">{props.errMsg}</span>
        </div>
    );
};

export default Input;