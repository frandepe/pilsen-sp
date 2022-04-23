import axios from "axios";

const BASE_URL = "http://26.204.148.246:9090/api";

const headers = {
  Autorizacion: tokenFromLocalStorage(),
};

/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "/maquinas"
 * @param {Object} postData Object with the post data
 * @returns {Promise}
 */

export const privatePostRequest = async (route, postData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/${route}`,
      postData,
      headers
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Function to generate a PUT request
 * @param {string} url  Endpoint's url. Example: "/maquinas"
 * @param {Object} putData Object with the post data
 * @returns {Promise}
 */

export const privatePutRequest = async ({ route, putData }) => {
  try {
    const res = await axios.put(`${BASE_URL}/${route}`, putData, headers);
    return res;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Function to generate a DELETE request
 * @param {string} url  Endpoint's url. Example: "/maquinas"
 * @param {Object} deleteData Object with the post data
 * @returns {Promise}
 */

export const privateDeleteRequest = async ({ route }) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${route}`, headers);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Function to generate a POST request
 * @param {string} route  Endpoint's route. Example: "/testimonials"
 * @param {Object} patchData Object with the post data
 * @returns {Promise}
 */

export async function privatePatchRequest(route, patchData) {
  const headers = { ...tokenFromLocalStorage() };
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/${route}`,
      patchData,
      headers
    );
    return data;
  } catch (error) {
    return error;
  }
}

/**
 * Function to generate a GET request
 * @param {string} sector  Endpoint's sector. Example: "/maquinas". Si el valor de "sector" es auth va a realizar una peticion distinta relacionada a la utentificacion
 * @param {number} id  El id seria un dato en especifico que se quiera devolver. Puede ir null
 * @returns {Promise}
 */

export const getDataMethodPrivate = async (sector, id = null) => {
  if (sector !== "auth") {
    try {
      const result = await axios.get(
        id ? `${BASE_URL}/${sector}/${id}` : `${BASE_URL}/${sector}`,
        headers
      );
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const result = await axios.get(`${BASE_URL}/auth/register`, headers);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
};

function tokenFromLocalStorage() {
  const token = window.localStorage.getItem("token");
  if (!token || token === "undefined") {
    console.log("No token in local storage");
    return null;
  }
  return `Bearer ${token}`;
}
