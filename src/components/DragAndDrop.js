import React, { Component } from 'react';
import '../styles/app.css';


export default class AppDragDropDemo extends Component {
    constructor() {
        super();
        this.handlerAdd = this.handlerAdd.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }
    state = {
        tasks: [
            {name:"task01",category:"wip", bgcolor: "yellow", width: "class100px", id: "hh434"},
            {name:"task02", category:"wip", bgcolor:"pink", width: "class110px", id: "hh4342"},
            {name:"Line03", category:"wip", bgcolor:"skyblue", width: "class120px", id: "hh4343"},
            {name:"Line05", category:"wip", bgcolor:"skyblue", width: "class140px", id: "hh4344"},
            {name:"Line04", category:"wip", bgcolor:"skyblue", width: "class130px", id: "hh4345"},
        ],
        inputChanged: "",
    }

    onDragStart = (ev, name) => {
        console.log('dragstart:',name);
        ev.dataTransfer.setData("name", name);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }
    onDrop = (ev, cat) => {
        let name = ev.dataTransfer.getData("name");
        this.state.tasks.map((task) => {
            if (task.name === name) {
                task.category = cat;
            }
            return task;

        });

        this.setState({
            ...this.state
        });
    }

    handlerAdd(){
        let newList = this.state.tasks.concat({
            name: this.state.inputChanged,
            category: "wip",
            bgcolor: "skyblue",
            width: "class130px",
            id: new Date})
        this.setState({tasks: newList})
    }

    deleteTask(id){
        const newDeleteList = this.state.tasks.filter(item => item.id !== id)
        this.setState({tasks: newDeleteList});
    }

    render() {
        var tasks = {
            wip: [],
            complete: [],
            WhatTodo: [],
        }

        this.state.tasks.map((t) => {
            tasks[t.category].push(
                <div
                    key={t.id}
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className={t.width}
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                    <button className="tasksButton" onClick={() => {
                        this.deleteTask(t.id)
                    }}
                    >x</button>
                </div>
            );
        });


        return (
            <div>
                <div>
                <input onChange={(event) => {this.setState({inputChanged: event.target.value})}}/>
                <button onClick={this.handlerAdd}>submit</button>
                </div>
            <div className="container-drag">
                <h2 className="header">TASKS DRAG AND DROP LIST</h2>
                <div className="wip"
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">What i need to do</span>
                    {tasks.wip}
                </div>
                <div className="droppable"
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>this.onDrop(e, "complete")}>
                    <span className="task-header">Complete</span>
                    {tasks.complete}
                </div>
                <div className="droppable03"
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>this.onDrop(e, "WhatTodo")}>
                    <span className="task-header">Now do</span>
                    {tasks.WhatTodo}
                </div>

            </div>
            </div>
        );
    }
}
