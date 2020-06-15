export const formValidation = (obj, value) => {
    let tempObj = {...obj};
    tempObj.errMsg = '';
    !tempObj.touched && (tempObj.touched = true);
    if(tempObj.validation.required){
        if(!value){
            tempObj.errMsg = "Please enter "+obj.placeholder;
        }
    }
    return tempObj;
}

export const formValid = (formArr) => {
    let isValid = true;
    for(let i=0; i<formArr.length;i++){
        if(formArr[i].errMsg || !formArr[i].touched){
            isValid = false;
            break;
        }
    }
    return isValid;
}