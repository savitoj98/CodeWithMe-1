import React, {Component} from "react"
import RoomOptions from "../../components/HomeComponents/RoomOptions/RoomOptions"
import axios from "axios"
import {Redirect} from "react-router-dom"
import "./home.css"

class Home extends Component{

    state = {
        roomId: null
    }

    newRoomHandler = () => {
        axios.get("http://localhost:5000/new_room")
        .then(data => {
            // window.location.href = `/rooms/${data.data}`
            this.setState({roomId: data.data})
        }).catch(e => console.log(e))
    }

    renderRedirect = () => {
        if(this.state.roomId) {
            return <Redirect push to={"/rooms/"+this.state.roomId}/>   
        }
        return null;
    }

    render(){

     return(
        <div className="main">
         <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href={" "}>CodeWithMe</a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li className="active"><a href={" "}>Home</a></li>
            <li><a href={"https://github.com/flaredragon/CodeWithMe"}>Source Code</a></li>
            <li><a href={"https://api.judge0.com"}>Judge</a></li>
          </ul>
        </div>
      </div>
    </nav>
        <div className ="divs2">
            <h1 className="mainhead">Welcome to, CodeWithMe</h1>
            <h2>Create a new room or join an existing one</h2>
            <RoomOptions newRoomClicked = {this.newRoomHandler}></RoomOptions>
            {this.renderRedirect()}
        </div>
        </div>
     );   
       
    }
}

export default Home