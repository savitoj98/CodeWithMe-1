import React from 'react';
import Aux from '../../hoc/aux';

const codeInput = (props) => {
    return (
        <div className="inputs" >
        <Aux>
            <p className="paddings">Input (optional):</p>
            <textarea className="rounding" rows="8" cols="50" onChange={(e) => {console.log(e);props.change(e.target.value)}} ></textarea>
            <br /><br />
        </Aux>
        </div>
    );
};

export default codeInput;