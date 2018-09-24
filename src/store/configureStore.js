import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import customersReducer from './../reducers/customer';

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
//store
const store=createStore(
    combineReducers({
      customers:customersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
);

return store;
}
