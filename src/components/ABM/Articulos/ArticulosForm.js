import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
import { useHistory } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import Spiner from "../../../shared/spiner";
import { useSelector } from "react-redux";
import "../../shared.css";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: "2%",
  },
  btn: {
    margin: "15px 0 15px 0",
    backgroundColor: "var(--primary)",
    "&:hover": {
      background: "var(--hoverPrimary)",
    },
    color: "white",
  },
}));
const ArticulosForm = (patchData) => {
  const history = useHistory();
  const classes = useStyles();
  const { articulosInfo, loading } = useSelector((store) => store.articulos);
  const [statusForm, setStatusForm] = useState(false);

  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
    codigo: yup
      .number()
      .required("El campo es requerido")
      .test(
        "maxDigitsAfterDecimal",
        "El número no puede contener más de dos decimales",
        (number) => Number.isInteger(number * 10 ** 2)
      ),
    descripcion: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
    tipoArticulo: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
  });
  console.log("PatchData:", patchData);

  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Artículos
        </Typography>
        <div className="abm_container">
          <Formik
            initialValues={{
              id: patchData?.location?.state?.id,
              nombre: patchData?.location?.state?.codigo || "",
              descripcion: patchData?.location?.state?.descripcion || "",
              tipoArticulo: patchData?.location?.state?.tipoArticulo || "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...formData }) => {
              setStatusForm(true);
              try {
                const response = await privatePostRequest("articulos/save", {
                  ...formData,
                });
                console.log(response);
                if (!response?.data?.status === 200)
                  throw new Error("Algo falló");
                showAlert({
                  type: "success",
                  title: patchData?.location?.state?.id
                    ? "Editado correctamente"
                    : "Creado correctamente",
                }) && history.push("/PallasFront/articulos");
              } catch (err) {
                console.log("Error catch:", err);
              } finally {
                setStatusForm(false);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <form className="formabm_container" onSubmit={handleSubmit}>
                <label htmlFor="titulo">Nombre</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="nombre"
                  id="titulo"
                  label="Nombre"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nombre}
                />
                <ErrorMessage
                  name="nombre"
                  component="p"
                  className="input-error"
                />
                <label htmlFor="codigo">Código</label>
                <TextField
                  type="number"
                  data-testid="codigo"
                  required
                  fullWidth
                  margin="normal"
                  name="uso"
                  id="codigo"
                  label="Código"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.codigo}
                />
                <ErrorMessage
                  name="codigo"
                  component="p"
                  className="input-error"
                />
                <label htmlFor="titulo">Descripción</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="descripcion"
                  id="titulo"
                  label="Descripción"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.descripcion}
                />
                <ErrorMessage
                  name="descripcion"
                  component="p"
                  className="input-error"
                />

                <div className="input__container">
                  <label htmlFor="tipoArticulo">Tipo Artículo</label>
                  <select
                    className="select-field"
                    name="tipoArticulo"
                    data-testid="tipoArticulo"
                    value={values.tipoArticulo}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Selecciona categoria
                    </option>

                    <option>Articulo</option>
                    <option>Insumo</option>
                  </select>
                  <ErrorMessage
                    name="tipoArticulo"
                    component="p"
                    className="input-error"
                  />
                </div>

                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableHead>
                    <TableRow className="list_titulos">
                      <TableCell>✔</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Código</TableCell>
                      <TableCell>Luz</TableCell>
                      <TableCell>Nomenclatura</TableCell>
                      <TableCell>Paso</TableCell>
                      <TableCell>Desp. Ancho</TableCell>
                      <TableCell>Desp. Cola</TableCell>
                      <TableCell>Peso x Mt2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!loading ? (
                      <Spiner />
                    ) : (
                      articulosInfo?.result?.map((element) => {
                        return (
                          <TableRow
                            key={element.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <input type="checkbox" />
                            </TableCell>
                            <TableCell>{element.nombre}</TableCell>
                            <TableCell>{element.codigo}</TableCell>
                            <TableCell>{element.detalle[0]?.luz}</TableCell>
                            <TableCell>
                              {element.detalle[0]?.nomenclatura}
                            </TableCell>
                            <TableCell>{element.detalle[0]?.paso}</TableCell>
                            <TableCell>{element.detalle[0]?.ancho}</TableCell>
                            <TableCell>{element.detalle[0]?.cola}</TableCell>
                            <TableCell>{element.detalle[0]?.luz}</TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>

                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={statusForm}
                >
                  {patchData?.location?.state?.id ? "Editar" : "Crear"}
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Header>
    </div>
  );
};

export default ArticulosForm;
