import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import TipoDeArticulosReducer from "./actionsABM/reducerTipoDeArticulos";
import TiposDeMedidasReducer from "./actionsABM/reducerTiposDeMedidas";
import MaquinasReducer from "./actionsABM/reducerMaquinas";
import UsuariosReducer from "./actionsABM/reducerUsuarios";
import RolesReducer from "./actionsABM/reducerRoles";
import DepositosReducer from "./actionsABM/reducerDepositos";
import LoginReducer from "./login";
import RegisterReducer from "./register";

const rootReducer = combineReducers({
  user: LoginReducer,
  register: RegisterReducer,
  tipoDeArticulos: TipoDeArticulosReducer,
  tiposDeMedidas: TiposDeMedidasReducer,
  maquinas: MaquinasReducer,
  users: UsuariosReducer,
  roles: RolesReducer,
  depositos: DepositosReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function genereteStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
