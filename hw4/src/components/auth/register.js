import React from 'react'
import { connect } from 'react-redux'

import InfoSignOn from './infoSignOn'
import RegisterLine from './registerLine'
import { signOnFunc } from './registerAction'

const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear() - 18;
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

const Register = ({ signOn }) => {
    let todayDate = getTodayDate();
    return(
        <form name="accountRegisteration" className="form-horizontal" id="signOnForm" onSubmit={ signOn }>
            <h2 className="form-signup-heading col-sm-offset-3">Please sign up!</h2>
            <RegisterLine labelName="UserName:" inputType="text" inputName="accountName" 
                inputPattern='^[A-Za-z][A-Za-z0-9]*$' 
                inputPlaceholder="Letters and numbers, but may not start with a number"
                inputTitle="Letters and numbers only, and may not start with a number" mustRequired={true}/>
            <RegisterLine labelName="Display name:" inputType="text" inputName="displayName" 
                inputPattern='^.*$' inputPlaceholder="(Optional) please enter a name to display"
                inputTitle="" mustRequired={false} />
            <RegisterLine labelName="Email address:" inputType="email" inputName="emailAddr" inputPattern='^.*$' 
                inputPlaceholder="Please enter an email address"
                inputTitle="" mustRequired={true} />
            <RegisterLine labelName="Phone Number:" inputType="text" inputName="phoneNumber" 
                inputPattern='^\d{3}-\d{3}-\d{4}$'inputPlaceholder="e.g. 713-111-6666"
                inputTitle="Numbers[0-9] and - only, e.g. 713-111-6666" mustRequired={true} />
            <RegisterLine labelName="Date of Birth:" inputType="date" inputName="dateOfBirth" inputPattern='^.*$' 
                inputPlaceholder="Only 18 years or older can register"
                inputTitle="Only 18 years or older can register" mustRequired={true} maxDate={todayDate}/>
            <RegisterLine labelName="Zip code:" inputType="text" inputName="zipCode" inputPattern='^\d{5}$'
                inputPlaceholder="e.g. 77030"
                inputTitle="5 digit number e.g. 77030" mustRequired={true} />
            <RegisterLine labelName="Password:" inputType="password" inputName="password" inputPattern='^.*$' 
                inputPlaceholder="Please set an password"
                inputTitle="" mustRequired={true} />
            <RegisterLine labelName="Confirm Password:" inputType="password" inputName="passwordConf" 
                inputPattern='^.*$' inputPlaceholder="Please re-enter the password "
                inputTitle="" mustRequired={true} />
            <div><InfoSignOn/></div>
            <button type="submit" className="btn btn-primary col-sm-offset-4" value="Register" 
                id="signOn">Register</button>
            <input type="reset" className="btn btn-primary col-sm-offset-1" value = "Clear"></input>
            <p><input type="hidden" name="Timestamp" id="timestamp"></input></p> 
            <div className="col-sm-2"></div>
        </form>
    );
}

const mapDispatchToProps = dispatch => ({ signOn: (event) => dispatch(signOnFunc(event))});

export default connect(null, mapDispatchToProps)(Register);
