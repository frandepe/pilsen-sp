import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { depositosAction } from "../../../redux/actionsABM/reducerDepositos";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";

const DepositosList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { depositosInfo } = useSelector((store) => store.depositos);
  console.log(depositosInfo);

  async function handleRemove(id, nombre, direccion, oculto, activo) {
    try {
      await privateDeleteRequest("depositos/delete", {
        id,
        nombre,
        direccion,
        oculto,
        activo,
      });
      showAlert({ type: "success", title: "Deposito eliminado correctamente" });
      setDeleted(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  useEffect(() => {
    dispatch(depositosAction(depositosInfo));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Depósitos</h1>
          <Link
            to="/PallasFront/depositos-form"
            className="list_primary-button"
            role="button"
          >
            Agregar depósito
          </Link>
        </header>
        <table className="list_container-table">
          <tr>
            <th>Nombre:</th>
            <th>Dirección:</th>
          </tr>
          {depositosInfo?.result?.map((element) => {
            return (
              <tr key={element.id}>
                <td className="list_title">{element.nombre}</td>
                <td className="list_title">{element.direccion}</td>

                <td className="list_options">
                  <Link
                    className="list_options-edit"
                    to={{
                      pathname: "/PallasFront/depositos-form",
                      state: element,
                    }}
                  >
                    <MdModeEdit />
                  </Link>
                  <button
                    onClick={() =>
                      handleRemove(
                        element.id,
                        element.nombre,
                        element.direccion,
                        element.oculto,
                        element.activo
                      )
                    }
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

export default DepositosList;
