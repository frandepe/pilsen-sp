import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { tiposDeMedidasAction } from "../../../redux/actionsABM/reducerTiposDeMedidas";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";

const TiposDeMedidasList = () => {
  const dispatch = useDispatch();
  const [deletedNew, setDeletedNew] = useState(false);
  const { tiposDeMedidasInfo } = useSelector((store) => store.tiposDeMedidas);
  console.log(tiposDeMedidasInfo);

  async function handleRemove(id, nombre) {
    try {
      await privateDeleteRequest("tiposmedidas/delete", {
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
    dispatch(tiposDeMedidasAction(tiposDeMedidasInfo));
    if (deletedNew) {
      setDeletedNew(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedNew, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Tipos de medidas</h1>
          <Link
            to="/PallasFront/tipos-de-medidas-form"
            className="list_primary-button"
            role="button"
          >
            Agregar tipo de medida
          </Link>
        </header>
        <table className="list_container-table list_grid_two">
          <tr>
            <th>Nombre:</th>
          </tr>

          {tiposDeMedidasInfo?.result?.map((element) => {
            return (
              <tr key={element.id}>
                <td className="list_title">{element.nombre}</td>

                <td className="list_options">
                  <Link
                    className="list_options-edit"
                    to={{
                      pathname: "/PallasFront/tipos-de-medidas-form",
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
        </table>
      </Header>
    </div>
  );
};

export default TiposDeMedidasList;
