import firebase from "../../firebase/firebase";

export const deleteSearch = (filteredData) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    // Get current user
    const userId = getFirebase().auth().currentUser.uid;
    // Firestore
    const db = getFirestore();
    db.collection("users").doc(userId).update({ search: filteredData });
  };
};

export const updateSearch = (text) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    // Get current user
    const userId = getFirebase().auth().currentUser.uid;
    // Firestore
    const db = getFirestore();
    db.collection("users")
      .doc(userId)
      .update({ search: firebase.firestore.FieldValue.arrayUnion(text) });
  };
};

export const addToFav = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
     // Get current user
     const userId = getFirebase().auth().currentUser.uid;
     // Firestore
     const db = getFirestore();
     db.collection("users")
       .doc(userId)
       .update({ favorites: firebase.firestore.FieldValue.arrayUnion(data) })
       .then(() => {
         alert("Added to fav")
       })
  };
};


export const removeFromFav = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
     // Get current user
     const userId = getFirebase().auth().currentUser.uid;
     // Firestore
     const db = getFirestore();
     db.collection("users")
       .doc(userId)
       .update({ favorites: firebase.firestore.FieldValue.arrayRemove(data) });
  };
};

export const getAllUserData = () => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    // Get current user
    const userId = getFirebase().auth().currentUser.uid;

    // Firestore
    const db = getFirestore();

    // Get data from database
    db.collection("users")
      .doc(userId)
      .onSnapshot(
        (querySnapshot) => {
          // array to store returned data
          // let userData = [];

          // push returned data from database to trans array
          // userData.push(querySnapshot.data());

          // make data available for redux state
          dispatch({
            type: "GET_USER_DATA",
            payload: querySnapshot.data(),
          });
        },
        (error) => {
          alert(error.message);
        }
      );
  };
};
