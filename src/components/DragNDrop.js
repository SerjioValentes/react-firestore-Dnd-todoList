import React, {useState, useEffect} from "react";
import {db} from "../components/firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import "../styles/app.css"

function DragNDrop() {
    const [taskList, setTaskList] = useState([])
    const [inputChanged, setInputChanged] = useState("")

    var tasksTodo = {
        wip: [],
        complete: [],
        WhatTodo: [],
    };

    const usersCollectionRef = collection(db, "todolist");

    const onDragStart = (ev, name, id) => {
        ev.dataTransfer.setData("name", name);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = async (ev) => {
        ev.preventDefault();
    }

    const onDrop = async (ev, cat) => {
        let name = ev.dataTransfer.getData("name");
        let id = ev.dataTransfer.getData("id");

        taskList.map((task) => {
            if (task.name === name) {
                task.category = cat
            }
            return task;
        });

        const listDoc = doc(db, "todolist", id);
        await updateDoc(listDoc, {
            category: cat
        });

        setTaskList([...taskList]);
    }
    //Добавляет новую задачу в список через State и fFirestore
    const handlerAdd = async () => {
        let tempTaskList = taskList.concat({
            name: inputChanged,
            category: "wip",
            id: new Date(),
        })

        setTaskList([...tempTaskList]) //Записывает новые значения из инпута в стайт
        console.log(tempTaskList)

        //  Запись нового task из инпута в лист firestore
        await addDoc(usersCollectionRef, {
            name: inputChanged,
            category: "wip",
            id: new Date(),
        })
    }

    const deleteTask = async (id) => {
        // const newDeleteList = taskList.filter(item => item.id !== id)
        // setTaskList(newDeleteList);
        const userDoc = doc(db, "todolist", id);
        await deleteDoc(userDoc);
        console.log(taskList)
    }

    taskList.map((t) => {
        tasksTodo[t.category].push(
            <div
                key={t.id}
                onDragStart={(e) => onDragStart(e, t.name, t.id)}
                draggable
                // style = {{backgroundColor: t.bgcolor}}
            >
                {t.name}
                <button className="tasksButton" onClick={() => {
                    deleteTask(t.id)
                }}
                >x
                </button>
            </div>
        );
    });

    const getData = async () => {
        const data = await getDocs(usersCollectionRef)
        setTaskList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    //  Не работает по нажатию Ентер

    // useEffect(() => {
    //     const listener = event => {
    //         if (event.code === "Enter" || event.code === "NumpadEnter") {
    //             handlerAdd();
    //         }
    //     };
    //     document.addEventListener("keydown", listener);
    //     return () => {
    //         document.removeEventListener("keydown", listener);
    //     };
    // }, []);

    useEffect(() => {
        getData();
    }, [tasksTodo]);

    return (
        <div className="wrapper-draggable">

            <div className="input-class-with-button">
                <input onChange={(event) => {

                    setInputChanged(event.target.value)
                }}
                placeholder="Нужно сделать.."
                />
                <button onClick={handlerAdd}>submit</button>
            </div>

            <div className="container-drag">
                <h2 className="header">TASKS DRAG AND DROP LIST</h2>
                <div className="container-drag-block">
                <div className="wip"
                     onDragOver={(e) => onDragOver(e, "wip")}
                     onDrop={(e) => {
                         onDrop(e, "wip")
                     }}>
                    <span className="task-header">Что нужно сделать</span>
                    {tasksTodo.wip}
                </div>

                <div className="droppable"
                     onDragOver={(e) => onDragOver(e, "complete")}
                     onDrop={(e) => onDrop(e, "complete")}>
                    <span className="task-header">В разработке</span>
                    {tasksTodo.complete}
                </div>

                <div className="droppable03"
                     onDragOver={(e) => onDragOver(e, "WhatTodo")}
                     onDrop={(e) => onDrop(e, "WhatTodo")}>
                    <span className="task-header">Сделано</span>
                    {tasksTodo.WhatTodo}
                </div>
                </div>
            </div>
        </div>
    )
}

export default DragNDrop;
