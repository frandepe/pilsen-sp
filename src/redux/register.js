import axios from "axios";

const defaultValue = {
  registerInfo: {},
  error: false,
};

const REGISTER = "LOGIN";
const ERROR = "ERROR";

export default function RegisterReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case REGISTER:
      return { ...state, infoRegister: payload, error: false };
    case ERROR:
      return { ...state, error: true };
    default:
      return state;
  }
}

export const registerAction =
  ({ UserName, email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        "http://26.204.148.246:9090/api/auth/register",
        {
          UserName,
          email,
          password,
        }
      );

      dispatch({
        type: REGISTER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  };
