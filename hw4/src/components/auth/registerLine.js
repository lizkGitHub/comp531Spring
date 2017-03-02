import React from 'react'
import { connect } from 'react-redux'

const RegusterLine = ({labelName, inputType, inputName, inputPattern,
     inputPlaceholder, inputTitle, mustRequired, maxDate}) => (
    <div className="form-group">
        <label className="control-label col-sm-4">{labelName}</label>
        <div className="col-sm-6">
            <input type={inputType} name={inputName} className="form-control"  pattern={inputPattern}  
            placeholder={inputPlaceholder} title={inputTitle} required={mustRequired} max={maxDate}></input>
        </div>
    </div>
)

export default RegusterLine;