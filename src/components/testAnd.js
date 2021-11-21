// const updateUser = async (id, age) => {
//     const userDoc = doc(db, "recipe", id);
// const newFields = { age: age + 1 };
// await updateDoc(userDoc, newFields);
// };

// const data = await getDocs(usersCollectionRef)
// setTaskList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

// const usersCollectionRef = collection(db, "todolist");

// const res = await db.collection('data').doc('one').set(data);
// const cityRef = db.collection('cities').doc('DC');
//
// // Set the 'capital' field of the city
// const res = await cityRef.update({capital: true});


// String id = db.collection("collection_name").document().getId();
// db.collection("collection_name").document(id).set(object);


function dateStr(a, b) {
    let result = new Date(a) - new Date(b)



    console.log(result)
}


let a = "Sun Nov 21 2021 14:05:43 GMT+0300 (Moscow Standard Time)0"
let b = "Sun Nov 17 2021 18:05:43 GMT+0300 (Moscow Standard Time)0"

dateStr(a, b)
