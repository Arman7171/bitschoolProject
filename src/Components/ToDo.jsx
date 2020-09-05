import React, {Component} from 'react'
import Task from './Task'

export default class ToDo extends Component{
    state = {
        text: '',
        tasks: []
    };

    writeTask = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    addTask = () => {
        let {tasks,text} = this.state;
        this.setState({
            tasks: [...tasks, text],
            text: ''
        });
    };
    
    render(){
        let {tasks,text} = this.state;
        
        return(
            <>
                <input value={text} onChange={this.writeTask} type="text"/>
                <button onClick={this.addTask}>add task</button>
                {tasks.map((task, index) =>{
                    return(
                    <Task 
                    task = {task} 
                    index={index} 
                    key={index} 
                    />
                    );
                })}
            </>
        );
    }
}