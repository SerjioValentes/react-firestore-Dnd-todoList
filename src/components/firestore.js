import React, {useState, useEffect} from "react";
import {db} from "../components/firebase";
import {
    collection,
    getDocs,
    addDoc,
    // updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";


function DataFire(){
    const [data, setData] = useState([]);
    const usersCollectionRef = collection(db, "todolist");

    const deleteTask = async (id) => {
        const userDoc = doc(db, "todolist", id);
        await deleteDoc(userDoc);
    };

    const createRecipe = async () => {
        await addDoc(usersCollectionRef, { todo:  // тут записать state с состоянием переданного инпута задачи
        });
    };

    useEffect(() => {
        getData();
    }, [data]);


    return(
        <>


        </>
    )
}
