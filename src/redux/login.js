import { privatePostRequest } from "../services/privateApiServices";
import showAlert from "../shared/showAlert";

const defaultValue = {
  userInfo: {},
  token: null,
  error: false,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ERROR = "ERROR";

export default function LoginReducer(state = defaultValue, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { ...state, infoUser: payload, error: false };
    case LOGOUT:
      return defaultValue;
    case ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await privatePostRequest("auth/login", {
        email,
        password,
      });

      if (response.login) {
        showAlert({ type: "success", title: "Login exitoso" });
      }

      dispatch({
        type: LOGIN,
        payload: response,
        // token: localStorage.setItem("token", response.data.token),
      });
    } catch (error) {
      showAlert({
        type: "error",
        title: "Ha habido un error",
        message: "Email o contraseña incorrecta",
      });

      dispatch({
        type: ERROR,
      });
    }
  };
