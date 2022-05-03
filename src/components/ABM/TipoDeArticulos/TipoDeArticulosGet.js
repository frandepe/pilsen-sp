import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { tipoDeArticulosAction } from "../../../redux/actionsABM/reducerTipoDeArticulos";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Spiner from "../../../shared/spiner";
import Addabm from "../../../shared/addABM/addabm";
// falta estilos

const TipoDeArticulosGet = () => {
  const dispatch = useDispatch();
  const [deletedNew, setDeletedNew] = useState(false);
  const { tipoDeArticulosInfo, loading } = useSelector(
    (store) => store.tipoDeArticulos
  );
  console.log(tipoDeArticulosInfo);

  async function handleRemove(id, nombre) {
    try {
      await privateDeleteRequest("tiposarticulo/delete", {
        id,
        nombre,
      });
      showAlert({ type: "success", title: "Eliminado correctamente" });
      setDeletedNew(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  useEffect(() => {
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    if (deletedNew) {
      setDeletedNew(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedNew, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Tipos de articulos</h1>
          <Addabm to="/PallasFront/tipo-de-articulos-form" />
        </header>
        <table className="list_container-table list_grid_two">
          <tr>
            <th>Nombre:</th>
          </tr>

          {!loading ? (
            <Spiner />
          ) : (
            tipoDeArticulosInfo?.result?.map((element) => {
              return (
                <tr key={element.id}>
                  <td className="list_title">{element.nombre}</td>

                  <td className="list_options">
                    <Link
                      className="list_options-edit"
                      to={{
                        pathname: "/PallasFront/tipo-de-articulos-form",
                        state: element,
                      }}
                    >
                      <MdModeEdit />
                    </Link>
                    <button
                      className="list_options-delete"
                      onClick={() => handleRemove(element.id, element.nombre)}
                    >
                      <IoMdTrash />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </table>
      </Header>
    </div>
  );
};

export default TipoDeArticulosGet;
