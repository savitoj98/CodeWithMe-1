import React, {Component} from "react" 
import axios from "axios"



class CodeOutput extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextState.update !== this.state.update
    }

    state = {
        stdout: null,
        time:null,
        description: null,
        error: null,
        code: this.props.code,
        language: this.props.language,
        update: false
    }

     codes = {
        "C": "4",
        "C++": "10",
        "C#": "16",
        "Java": "27",
        "Javascript": "29",
        "Python3": "34",
        "Python2": "36",
        "Ruby": "38"
    }

     

     compileHandler = () => {
        var data = {
            "source_code": this.props.code,
            "language_id": this.codes[this.props.language],
            "number_of_runs": "1",
            "stdin": this.props.stdin,
            // "expected_output": null,
            "cpu_time_limit": "2",
            "cpu_extra_time": "0.5",
            "wall_time_limit": "5",
            "memory_limit": "128000",
            "stack_limit": "64000",
            "max_processes_and_or_threads": "30",
            "enable_per_process_and_thread_time_limit": false,
            "enable_per_process_and_thread_memory_limit": true,
            "max_file_size": "1024"
        }; 
        console.log(data)
        axios.post('/run', data)
        .then( response => {
            this.setState({
                stdout: response.data.stdout||"Null",
                time: response.data.time||0,
                description: response.data.status.description,
                error: response.data.stderr||response.data.compile_output||"Null",
                update: !this.state.update
            })
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
    
    }
    
    render(){
        console.log("output area"+this.props.code)
        return(
            
          <div className="paddings">
            <button className="btn btn-primary" onClick={() => this.compileHandler()}>Compile</button>
            <div>Output : {this.state.stdout}</div>
            <div>time: {this.state.time}</div>
            <div>description:{this.state.description}</div>
            <div>error: {this.state.error}</div>
          </div>  
            
        );
    }

} 

export default CodeOutput