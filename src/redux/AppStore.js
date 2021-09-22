import { createStore } from "redux";
import { myReducer } from "./AppReducers";

export default createStore(myReducer);
