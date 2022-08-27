import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { privatePostRequest } from "../../../services/privateApiServices";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectInsumo, setSelectInsumo] = useState(null);
  const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
  );
  const [statusForm, setStatusForm] = useState(false);

  const [detalleProducto, setDetalleProducto] = useState([]);

  const handleRowClick = (element) => {
    console.log(element);
  };

  const formSchema = yup.object().shape({
    nombre: yup.string().max(100, "No puede ingresar más de 100 caracteres"),
    codigo: yup.string(),
    descripcion: yup
      .string()
      .max(100, "No puede ingresar más de 100 caracteres"),
    tipoArticulo: yup
      .string()
      .max(100, "No puede ingresar más de 100 caracteres"),
  });

  useEffect(() => {
    dispatch(articulosAction(articulosInfo));
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              detalle: detalleProducto,
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...formData }) => {
              setStatusForm(true);
              const resp = detalleProducto.forEach((e) => {
                return formData.detalle.push(e);
              });
              try {
                const response = await privatePostRequest("articulos/save", {
                  ...formData,
                  ...resp,
                });
                console.log(response);
                if (!response?.data?.status === 200)
                  throw new Error("Algo falló");
              } catch (err) {
                console.log("Error catch:", err);
              } finally {
                setStatusForm(false);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <Form className="formabm_container" onSubmit={handleSubmit}>
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
                    onClick={(e) => setSelectInsumo(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecciona categoria
                    </option>
                    <optgroup label="Insumo:">
                      <option value="insumo">Insumo</option>
                    </optgroup>
                    <optgroup label="Producto:">
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
                {selectInsumo !== "insumo" && (
                  <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="list_titulos">
                        <TableCell>✓</TableCell>
                        <TableCell>Nomenclatura</TableCell>
                        <TableCell>CódigoId</TableCell>
                        <TableCell>Luz</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Paso</TableCell>
                        <TableCell>Desp. Ancho</TableCell>
                        <TableCell>Desp. Cola</TableCell>
                        <TableCell>Peso x Mt2</TableCell>
                        <TableCell>Diametro</TableCell>
                        <TableCell>Paso estampado</TableCell>
                        <TableCell>Cantidad Ml</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!loading ? (
                        <Spiner />
                      ) : (
                        articulosInfo?.result?.map((element, index) => {
                          return (
                            !element.detalle[0] && (
                              <TableRow
                                onClick={() => handleRowClick(element)}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      const existe = detalleProducto.some(
                                        (el) =>
                                          (el.idArticuloDetalle = element.id)
                                      );
                                      console.log(existe);
                                      if (existe) {
                                        setDetalleProducto(
                                          detalleProducto.filter(
                                            (el) => el.id !== element.id
                                          )
                                        );
                                      } else {
                                        setDetalleProducto([
                                          ...detalleProducto,
                                          {
                                            idArticulo: "",
                                            idArticuloDetalle: element.id,
                                            luz: "",
                                            diametro: "",
                                            nomenclatura: element.nombre,
                                            descripcion: element.descripcion,
                                            paso: values?.detalle?.paso,
                                            pasoEstampado: "",
                                            cantidadMl: "",
                                            ancho: "",
                                            cola: "",
                                            peso: "",
                                          },
                                        ]);
                                      }
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    name={`detalle[${index}].nomenclatura`}
                                    value={element.nombre}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    name={`detalle[${index}].idArticuloDetalle`}
                                    value={element.id}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field name={`detalle[${index}].luz`} />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].descripcion`}
                                    value={element.descripcion}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].paso`}
                                    value={values?.detalle?.paso}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].ancho`}
                                    value={values?.detalle?.ancho}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].cola`}
                                    value={values?.detalle?.cola}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].peso`}
                                    value={values?.detalle?.peso}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].diametro`}
                                    value={values?.detalle?.diametro}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].pasoEstampado`}
                                    value={values?.detalle?.pasoEstampado}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Field
                                    name={`detalle[${index}].cantidadMl`}
                                    value={values?.detalle?.cantidadMl}
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                )}
                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={statusForm}
                >
                  {console.log(values)}
                  {patchData?.location?.state?.id ? "Editar" : "Crear"}
                </Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>
        </div>
      </Header>
    </div>
  );
};

export default ArticulosForm;
