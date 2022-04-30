import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { maquinasAction } from "../../../redux/actionsABM/reducerMaquinas";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";

const MaquinasList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { maquinasInfo } = useSelector((store) => store.maquinas);
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
        <h2>Lista de los Máquinas</h2>
        {maquinasInfo?.result?.map((element) => {
          return (
            <tr key={element.id}>
              <td className="title">{element.nombre}</td>
              <td className="title">{element.uso}</td>
              <td className="title">{element.desperdicio}</td>

              <td className="options">
                <Link
                  className="options__edit"
                  to={{
                    pathname: "/maquinas-form",
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
        })}
        <button>
          <Link
            to={{
              pathname: "/maquinas-form",
            }}
          >
            Agregar máquina
          </Link>
        </button>
      </Header>
    </div>
  );
};

export default MaquinasList;
