// Create user with email and password =======================================

export const createUserWithEmail = ({ email, password, nickName }) => {
  return (dispatch, state, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    const db = getFirestore();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user != null) {
            //verify email
            user.sendEmailVerification().then(() => {});

            const userRef = db.collection("users").doc(user.uid);
            userRef
              .set({
                displayName: nickName,
                email: email,
                favorites: [],
                search: [],
              })
              .then(() => {})
              .catch((error) => {
                // alert(error.message);
              });
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const loginUser = (email, password) => {
  return (dispatch, useState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Logged in");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const signOut = () => {
  return (dispatch, state, { getFirebase }) => {
    const auth = getFirebase().auth();
    auth
      .signOut()
      .then(() => {
        alert("Sign out");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};
