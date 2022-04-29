import React, { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { tipoDeArticulosAction } from "../../../redux/actionsABM/reducerTipoDeArticulos";
import showAlert from "../../../shared/showAlert";
import axios from "axios";
// import { getDataMethodPrivate } from "../../../services/privateApiServices";
// falta actualizar la lista al momento de eliminar
// falta obtener el metodo desde service (el token ya esta ahi configurado)

const TipoDeArticulosGet = () => {
  const dispatch = useDispatch();
  const { tipoDeArticulosInfo } = useSelector((store) => store.tipoDeArticulos);
  console.log(tipoDeArticulosInfo);

  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImZjYTAwMDc0LTU0Y2EtNGU4Yi05YzMyLTM0MGE3MTZlODcxMyIsInN1YiI6InNpc3RlbWFzQHBpbHNlbmRpZ2l0YWwuY29tIiwiZW1haWwiOiJzaXN0ZW1hc0BwaWxzZW5kaWdpdGFsLmNvbSIsIm5iZiI6MTY1MTEyMDE1MywiZXhwIjoxNjUxMTQxNzUzLCJpYXQiOjE2NTExMjAxNTN9.Of50-bQbUJBQBPtvsPeZqNFufDEwWDodLtAeKWEq6w5THBMeqdEnW7NZk4vDtADCkuv67Tsq2bukd0Sd_bXiaw";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function handleRemove(id, nombre) {
    try {
      await axios.post(
        "http://26.204.148.246:9090/api/tiposarticulo/delete",
        {
          id,
          nombre,
        },
        config
      );
      showAlert({ type: "success", title: "Eliminado correctamente" });
    } catch (error) {
      showAlert({
        type: "error",
        title: "Ups! No se pudo eliminar la novedad",
      });
    }
  }

  useEffect(() => {
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header>
        <h2>Lista de los Tipos de articulos</h2>
        {tipoDeArticulosInfo?.result?.map((element) => {
          return (
            <tr key={element.id}>
              <td className="title">{element.nombre}</td>

              <td className="options">
                <Link
                  className="options__edit"
                  to={{
                    pathname: "/tipo-de-articulos-form",
                    state: element,
                  }}
                >
                  <MdModeEdit />
                </Link>
                <button
                  onClick={() => handleRemove(element.id, element.nombre)}
                >
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          );
        })}
        <button>
          <Link
            to={{
              pathname: "/tipo-de-articulos-form",
            }}
          >
            Agregar tipo de articulo
          </Link>
        </button>
      </Header>
    </div>
  );
};

export default TipoDeArticulosGet;
