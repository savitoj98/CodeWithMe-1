import React from "react" 


const fileUpload = (props) => {

    return(
        <div className="form-group">
        <span className="selectingmore">
            <input className="form-control" type="file"
            name="myFile"
            onChange={(e)=>props.uploadFile(e)} />
        </span>
        </div>
    );

} 


export default fileUpload