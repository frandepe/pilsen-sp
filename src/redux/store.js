import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import TipoDeArticulosReducer from "./actionsABM/reducerTipoDeArticulos";
import LoginReducer from "./login";
import RegisterReducer from "./register";

const rootReducer = combineReducers({
  user: LoginReducer,
  register: RegisterReducer,
  tipoDeArticulos: TipoDeArticulosReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function genereteStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
