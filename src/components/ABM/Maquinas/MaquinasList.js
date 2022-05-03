import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { maquinasAction } from "../../../redux/actionsABM/reducerMaquinas";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Spiner from "../../../shared/spiner";
import Addabm from "../../../shared/addABM/addabm";

const MaquinasList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { maquinasInfo, loading } = useSelector((store) => store.maquinas);
  console.log(maquinasInfo);

  async function handleRemove(id, nombre, uso, desperdicio) {
    try {
      await privateDeleteRequest("maquinas/delete", {
        id,
        nombre,
        uso,
        desperdicio,
      });
      showAlert({ type: "success", title: "Eliminado correctamente" });
      setDeleted(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  useEffect(() => {
    dispatch(maquinasAction(maquinasInfo));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Máquinas</h1>
          <Addabm to="/PallasFront/maquinas-form" />
        </header>
        <table className="list_container-table list_grid_four">
          <tr>
            <th>Nombre:</th>
            <th>Uso:</th>
            <th>Desperdicio:</th>
          </tr>

          {!loading ? (
            <Spiner />
          ) : (
            maquinasInfo?.result?.map((element) => {
              return (
                <tr key={element.id}>
                  <td className="list_title">{element.nombre}</td>
                  <td className="list_title">{element.uso}</td>
                  <td className="list_title">{element.desperdicio}</td>

                  <td className="list_options">
                    <Link
                      className="list_options-edit"
                      to={{
                        pathname: "/PallasFront/maquinas-form",
                        state: element,
                      }}
                    >
                      <MdModeEdit />
                    </Link>
                    <button
                      className="list_options-delete"
                      onClick={() =>
                        handleRemove(
                          element.id,
                          element.nombre,
                          element.uso,
                          element.desperdicio
                        )
                      }
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

export default MaquinasList;
