import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  tiposDeMedidasInfo: [],
};

const TIPOS_DE_MEDIDAS = "TIPOS_DE_MEDIDAS";

export default function TiposDeMedidasReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case TIPOS_DE_MEDIDAS:
      return {
        ...state,
        tiposDeMedidasInfo: payload.tiposDeMedidasInfo,
        error: false,
      };
    default:
      return defaultValue;
  }
}

export const tiposDeMedidasAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("tiposmedidas/get");
    console.log(response);
    const data = response?.data;
    dispatch({
      type: TIPOS_DE_MEDIDAS,
      payload: { tiposDeMedidasInfo: data },
    });
  } catch (error) {
    console.log(error);
  }
};
