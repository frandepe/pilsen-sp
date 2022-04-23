import axios from "axios";

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
      const response = await axios.post(
        "http://26.204.148.246:9090/api/Auth/Login",
        {
          email,
          password,
        }
      );

      dispatch({
        type: LOGIN,
        payload: response.data,
        // token: localStorage.setItem("token", response.data.token),
      });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  };
