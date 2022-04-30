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
        <h2>Lista de los Tipos de medidas</h2>
        {tiposDeMedidasInfo?.result?.map((element) => {
          return (
            <tr key={element.id}>
              <td className="title">{element.nombre}</td>

              <td className="options">
                <Link
                  className="options__edit"
                  to={{
                    pathname: "/tipos-de-medidas-form",
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
              pathname: "/tipos-de-medidas-form",
            }}
          >
            Agregar tipo de articulo
          </Link>
        </button>
      </Header>
    </div>
  );
};

export default TiposDeMedidasList;
