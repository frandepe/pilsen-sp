import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { usuariosAction } from "../../../redux/actionsABM/reducerUsuarios";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Spiner from "../../../shared/spiner";
import Addabm from "../../../shared/addABM/addabm";

const UsuariosList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { usuariosInfo, loading } = useSelector((store) => store.users);
  console.log(usuariosInfo);

  async function handleRemove(id, userName, email, rolName) {
    try {
      await privateDeleteRequest("users/delete", {
        id,
        userName,
        email,
        rolName,
      });
      showAlert({ type: "success", title: "Usuario eliminado correctamente" });
      setDeleted(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  useEffect(() => {
    dispatch(usuariosAction(usuariosInfo));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Usuarios</h1>
          <Addabm to="/PallasFront/usuarios-form" />
        </header>
        <table className="list_container-table list_grid_four">
          <tr>
            <th>Nombre:</th>
            <th>Email:</th>
            <th>Rol:</th>
          </tr>

          {!loading ? (
            <Spiner />
          ) : (
            usuariosInfo?.result?.map((element) => {
              return (
                <tr key={element.id}>
                  <td className="list_title">{element.userName}</td>
                  <td className="list_title">{element.email}</td>
                  <td className="list_title">{element.rolName}</td>

                  <td className="list_options">
                    <Link
                      className="list_options-edit"
                      to={{
                        pathname: "/PallasFront/usuarios-form",
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
                          element.userName,
                          element.email,
                          element.rolName
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

export default UsuariosList;
