import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/index";
import thunk from "redux-thunk";

//ARCHIVO CREA STORE CON COMPOSE ENHANCERS

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

// const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(thunk),
// );

export default store;