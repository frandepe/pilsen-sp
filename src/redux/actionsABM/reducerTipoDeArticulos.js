import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  tipoDeArticulosInfo: [],
  loading: false,
};

const TIPO_DE_ARTICULOS = "TIPO_DE_ARTICULOS";
const LOADING = "LOADING";

export default function TipoDeArticulosReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case TIPO_DE_ARTICULOS:
      return {
        ...state,
        tipoDeArticulosInfo: payload.tipoDeArticulosInfo,
        error: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return defaultValue;
  }
}

export const tipoDeArticulosAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("tiposarticulo/get");
    console.log(response);
    const data = response?.data;
    dispatch({
      type: TIPO_DE_ARTICULOS,
      payload: { tipoDeArticulosInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};
