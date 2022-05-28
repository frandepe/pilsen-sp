import { getDataMethodPrivate } from "../../services/privateApiServices";

const defaultValue = {
  articulosInfo: [],
  loading: false,
};

const ARTICULOS = "ARTICULOS";
const LOADING = "LOADING";

export default function ArticulosReducer(
  state = defaultValue,
  { type, payload }
) {
  switch (type) {
    case ARTICULOS:
      return {
        ...state,
        articulosInfo: payload.articulosInfo,
        error: false,
        loading: false,
      };
    case LOADING:
      return { ...state, loading: true };
    default:
      return defaultValue;
  }
}

export const articulosAction = () => async (dispatch) => {
  try {
    const response = await getDataMethodPrivate("articulos");
    const data = response?.data;
    console.log(data);
    dispatch({
      type: ARTICULOS,
      payload: { articulosInfo: data },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: LOADING,
    });
  }
};
