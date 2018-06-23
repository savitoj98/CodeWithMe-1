import React from "react" 
import Aux from "../../../hoc/aux"
import {Button} from 'react-bootstrap'

const roomOptions = (props) => {

    return (
    <Aux>    
        <div className='paddings'>
            For a New Room 
            <br/>
            <Button className="btn-lg" bsStyle="primary" onClick={props.newRoomClicked}>Get Room Id</Button>
            {/* <Link to='/new_room'>new room</Link> */}
        </div>
        <h3>OR</h3>
        <div className="paddings">
            Enter Existing Rooms
            <form>
                <input className="rounding selectingmore2" type="text"/>
                <button type="submit" className="btn btn-lg btn-primary">Enter Room</button>
            </form>
        </div>
    </Aux>    
    );

} 


export default roomOptions