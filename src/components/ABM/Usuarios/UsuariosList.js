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
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ButtonsNavigation from "../../ButtonsNavigation/ButtonsNavigation";
import { MdSecurity } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { GiSecurityGate } from "react-icons/gi";

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, usuariosInfo?.result?.length - page * rowsPerPage);

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
        <ButtonsNavigation
          label1="Dashboard"
          label2="Seguridad"
          label3="Usuarios"
          icon1={<AiFillDashboard />}
          icon2={<GiSecurityGate />}
          icon3={<MdSecurity />}
          link2="/PallasFront/Seguridad"
          link1="/PallasFront"
        />
        <TableContainer component={Paper} className="container-abm">
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow className="list_titulos">
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading ? (
                <Spiner />
              ) : (
                usuariosInfo?.result
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((element) => {
                    return (
                      <TableRow
                        key={element.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        className="list_data"
                      >
                        <TableCell component="th" scope="row">
                          {element.userName}
                        </TableCell>
                        <TableCell>{element.email}</TableCell>
                        <TableCell>{element.rolName}</TableCell>
                        <TableCell>
                          <div className="list_container-buttons">
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
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage={"Filas por páginas"}
            className="list_pagination"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usuariosInfo?.result?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Header>
    </div>
  );
};

export default UsuariosList;
