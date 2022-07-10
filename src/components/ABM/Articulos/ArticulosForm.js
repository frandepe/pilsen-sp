import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
// import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
// import { useHistory } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@mui/material/TableHead";
import Spiner from "../../../shared/spiner";
import { useSelector, useDispatch } from "react-redux";
import "../../shared.css";
import {
  articulosAction,
  tipoDeArticulosAction,
} from "../../../redux/actionsABM/reducerArticulos";

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
  // const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const idRef = useRef();
  const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
  );
  const [statusForm, setStatusForm] = useState(false);
  const [pushDetalles, setPushDetalles] = useState([]);
  const digitsOnly = (value) => /^\d+$/.test(value);

  console.log("useRef del id:", idRef);

  const handleRowClick = (element) => {
    return setPushDetalles(element.detalle);
  };
  console.log("pushDetalles", pushDetalles);
  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
    codigo: yup
      .string()
      .test("Digits only", "Este campo solo puede contener números", digitsOnly)
      .required("El campo es requerido"),
    descripcion: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
    tipoArticulo: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
  });

  useEffect(() => {
    dispatch(articulosAction(articulosInfo));
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logica de meter los insumos podria meter los insumos
  // luz: patchData?.location?.state?.detalle[0]?.luz || "",
  // nomenclatura:
  //   patchData?.location?.state?.detalle[0]?.nomenclatura || "",
  // paso: patchData?.location?.state?.detalle[0]?.paso || "",
  // ancho: patchData?.location?.state?.detalle[0]?.ancho || "",
  // cola: patchData?.location?.state?.detalle[0]?.cola || "",
  // peso: patchData?.location?.state?.detalle[0]?.peso || "",
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
              activo: true,
              nombre: patchData?.location?.state?.nombre || "",
              codigo: patchData?.location?.state?.codigo || "",
              descripcion: patchData?.location?.state?.descripcion || "",
              tipoArticulo: patchData?.location?.state?.tipoArticulo || "",
              detalle: pushDetalles,
              // detalle: patchData?.location?.state?.detalle || [
              //   {
              //     idArticulo: "",
              //     idArticuloDetalle: "",
              //     luz: "",
              //     diametro: "",
              //     nomenclatura: "",
              //     descripcion: "",
              //     paso: "",
              //     pasoEstampado: "",
              //     cantidadMl: "",
              //     ancho: "",
              //     cola: "",
              //     peso: "",
              //   },
              // ],
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...formData }) => {
              setStatusForm(true);

              const resp = pushDetalles.forEach((e) => {
                return formData.detalle.push(e);
              });

              try {
                const response = await privatePostRequest("articulos/save", {
                  ...formData,
                  resp,
                });
                console.log(response);
                if (!response?.data?.status === 200)
                  throw new Error("Algo falló");
                // showAlert({
                //   type: "success",
                //   title: patchData?.location?.state?.id
                //     ? "Editado correctamente"
                //     : "Creado correctamente",
                // }) && history.push("/PallasFront/articulos");
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
                <label htmlFor="titulo">Código</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="codigo"
                  id="titulo"
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
                  <label htmlFor="titulo">Tipo Artículo</label>
                  <select
                    className="select-field"
                    name="tipoArticulo"
                    id="titulo"
                    data-testid="tipoArticulo"
                    value={values.tipoArticulo}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Selecciona categoria
                    </option>
                    <optgroup label="Insumo:">
                      <option value="insumo">Insumo</option>
                    </optgroup>
                    <optgroup label="Tipo de artículo:">
                      {tipoDeArticulosInfo?.result?.map((e) => {
                        return (
                          <option key={e.id} value={e.nombre}>
                            {e.nombre}
                          </option>
                        );
                      })}
                    </optgroup>
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
                          element.detalle[0] && (
                            <TableRow
                              key={element.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                id={element.id}
                                // id={element.detalle.idArticulo}
                                onClick={() => handleRowClick(element)}
                              >
                                {/* <input
                                  type="checkbox"
                                  value={values.detalle[0].idArticulo}
                                  name="id"
                                  id="id"
                                  onChange={handleChange}
                                /> */}

                                <input
                                  type="checkbox"
                                  data-testid="detalle"
                                  name="detalle"
                                  onChange={handleChange}
                                  value={values.detalle}
                                  // margin="normal"
                                  // ref={idRef}
                                  // id="detalle[0].idArticulo"
                                  // label="detalle[0].idArticulo"
                                />
                              </TableCell>
                              <TableCell>{element.nombre}</TableCell>
                              <TableCell>{element.codigo}</TableCell>
                              <TableCell>{element.detalle[0]?.luz}</TableCell>
                              <TableCell name="nomenclatura">
                                {element.detalle[0]?.nomenclatura}
                              </TableCell>
                              <TableCell>{element.detalle[0]?.paso}</TableCell>
                              <TableCell>{element.detalle[0]?.ancho}</TableCell>
                              <TableCell>{element.detalle[0]?.cola}</TableCell>
                              <TableCell>{element.detalle[0]?.peso}</TableCell>
                              {/* {element.detalle.map((elemento) => {
                                return (
                                  <div>
                                    <TableCell>{elemento.luz}</TableCell>
                                    <TableCell>
                                      {elemento.nomenclatura}
                                    </TableCell>
                                    <TableCell>{elemento.paso}</TableCell>
                                    <TableCell>{elemento.ancho}</TableCell>
                                    <TableCell>{elemento.cola}</TableCell>
                                    <TableCell>{elemento.peso}</TableCell>
                                  </div>
                                );
                              })} */}
                            </TableRow>
                          )
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
