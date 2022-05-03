import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../../LayoutPublic/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { rolesAction } from "../../../redux/actionsABM/reducerRoles";
import showAlert from "../../../shared/showAlert";
import { privateDeleteRequest } from "../../../services/privateApiServices";
import Spiner from "../../../shared/spiner";
import Addabm from "../../../shared/addABM/addabm";

const RolesList = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { rolesInfo, loading } = useSelector((store) => store.roles);
  console.log(rolesInfo);

  async function handleRemove(id, name) {
    try {
      await privateDeleteRequest("roles/delete", {
        id,
        name,
      });
      showAlert({ type: "success", title: "Rol eliminado correctamente" });
      setDeleted(true);
    } catch (error) {
      showAlert({
        type: "error",
        title: "No se pudo eliminar",
      });
    }
  }

  useEffect(() => {
    dispatch(rolesAction(rolesInfo));
    if (deleted) {
      setDeleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted, dispatch]);

  return (
    <div>
      <Header>
        <header className="list_header">
          <h1>Roles</h1>
          <Addabm to="/PallasFront/roles-form" />
        </header>
        <table className="list_container-table list_grid_two">
          <tr>
            <th>Nombre:</th>
          </tr>

          {!loading ? (
            <Spiner />
          ) : (
            rolesInfo?.result?.map((element) => {
              return (
                <tr key={element.id}>
                  <td className="list_title">{element.name}</td>

                  <td className="list_options">
                    <Link
                      className="list_options-edit"
                      to={{
                        pathname: "/PallasFront/roles-form",
                        state: element,
                      }}
                    >
                      <MdModeEdit />
                    </Link>
                    <button
                      className="list_options-delete"
                      onClick={() => handleRemove(element.id, element.name)}
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

export default RolesList;
