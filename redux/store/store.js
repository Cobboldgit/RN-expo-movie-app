import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {
  getFirebase,
  reduxReactFirebase,
  firebaseReducer,
} from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import firebase from "../../firebase/firebase"
import userReducers from "../reducers/userReducers";

const rootReducers = combineReducers({
  userReducers,
});

// Create store
export const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxReactFirebase(firebase),
    reduxFirestore(firebase)
  )
);
