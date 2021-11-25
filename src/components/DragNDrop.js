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
import "../styles/app.css";

function DragNDrop() {
    const [taskList, setTaskList] = useState([]);
    const [inputChanged, setInputChanged] = useState("");

//---------Чтобы useEffect рендерила страницу только по значению true
    const [isFalse, setIsFalse] = useState(true);

    var tasksTodo = {
        wip: [],
        complete: [],
        WhatTodo: [],
    };

    const usersCollectionRef = collection(db, "todolist");

    const onDragStart = (ev, name, id) => {
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = async (ev) => {
        ev.preventDefault();
    }

    const onDrop = async (ev, cat) => {
        let id = ev.dataTransfer.getData("id");

        taskList.map((task) => {
            if (task.id === id) {
                task.category = cat;
            }
            return task;
        });

        setTaskList([...taskList]);

//------------Меняет в БД категорию по которой распреляются таски в колоннах - через  id перемещаемого элемента
        const listDoc = doc(db, "todolist", id);
        await updateDoc(listDoc, {
            category: cat,
        });

    };

//--------------------Добавляет новую задачу в список через State и fFirestore--------------------
    const handlerAdd = async () => {
        //  Запись нового task из инпута в лист firestore
        await addDoc(usersCollectionRef, {
            name: inputChanged,
            category: "wip",
            id: new Date(),
        })
        setIsFalse(true);
        setInputChanged("")
    }
//END--------------------Добавляет новую задачу в список через State и fFirestore--------------------

    const deleteTask = async (id) => {
        const userDoc = doc(db, "todolist", id);
        await deleteDoc(userDoc);
        setIsFalse(true);
    }

    taskList.map((t) => {
        tasksTodo[t.category].push(
            <div
                key={t.id}
                onDragStart={(e) => onDragStart(e, t.name, t.id)}
                draggable
                // style = {{backgroundColor: t.bgcolor}}
                className="box-for-task"
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

// -------------Запись в локальный стэйт из Firestore-------------
    const getData = async () => {
        const data = await getDocs(usersCollectionRef);
        setTaskList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    useEffect(() => {
        if (isFalse) getData();
        setIsFalse(false);
    }, [tasksTodo]);
//END -------------Запись в локальный стэйт из Firestore-------------

// --------------------------handler по нажатию enter---------------
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                handlerAdd();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [tasksTodo]);
// END-----------------------handler по нажатию enter-------------

    return (
        <div className="wrapper-draggable-elements">

            <div className="draggable-elements__input-button">
                <input value={inputChanged}
                    onChange={(event) => {
                    setInputChanged(event.target.value)
                }}
                       placeholder="Нужно сделать.."
                />
                <button onClick={handlerAdd}>submit</button>
            </div>

            <div className="drag-and-drop">

                <h2 className="drag-and-drop__header">TASKS DRAG AND DROP LIST</h2>

                <div className="drag-and-drop-container">

                    <div className="drag-and-drop-container__item-1"
                         onDragOver={(e) => onDragOver(e, "wip")}
                         onDrop={(e) => {
                             onDrop(e, "wip")
                         }}>
                        <span className="task-header">Ideas</span>
                        {tasksTodo.wip}
                    </div>

                    <div className="drag-and-drop-container__item-2"
                         onDragOver={(e) => onDragOver(e, "complete")}
                         onDrop={(e) => onDrop(e, "complete")}>
                        <span className="task-header">In developing</span>
                        {tasksTodo.complete}
                    </div>

                    <div className="drag-and-drop-container__item-3"
                         onDragOver={(e) => onDragOver(e, "WhatTodo")}
                         onDrop={(e) => onDrop(e, "WhatTodo")}>
                        <span className="task-header">Finished</span>
                        {tasksTodo.WhatTodo}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DragNDrop;
