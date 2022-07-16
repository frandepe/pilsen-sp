import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage, getIn, FieldArray, Field, Form } from "formik";
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

const Input = ({ field, form: { errors } }) => {
  const errorMessage = getIn(errors, field.name);

  return (
    <>
      <TextField {...field} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};

const ArticulosForm = (patchData) => {
  // const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
  );
  const [statusForm, setStatusForm] = useState(false);
  // const digitsOnly = (value) => /^\d+$/.test(value);

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

  // video de referencia https://www.youtube.com/watch?v=Dm0TXbGvgvo&t=664s
  // github de referencia https://github.com/benawad/formik-field-arry/blob/0_field_array/src/App.tsx
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
              detalle: patchData?.location?.state?.detalle || [
                {
                  idArticulo: "",
                  idArticuloDetalle: "",
                  luz: "",
                  diametro: "",
                  nomenclatura: "",
                  codigoProducto: "",
                  nombreProducto: "",
                  paso: "",
                  pasoEstampado: "",
                  cantidadMl: "",
                  ancho: "",
                  cola: "",
                  peso: "",
                },
              ],
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...formData }) => {
              setStatusForm(true);
              // const resp = formData.detalle.filter((e) => e !== null);
              // const newArray = resp.filter(function (el) {
              //   return el.descripcion !== "";
              // });
              try {
                const response = await privatePostRequest("articulos/save", {
                  ...formData,
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
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
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
                <FieldArray name="detalle">
                  {({ remove }) => (
                    <Table sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className="list_titulos">
                          <TableCell>add</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Código</TableCell>
                          <TableCell>Luz</TableCell>
                          <TableCell>Nomenclatura</TableCell>
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
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    // id={element.detalle.idArticulo}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => {
                                        //   push({
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
                                        //   });

                                        setFieldValue(
                                          `detalle[${index}].nombreProducto`,
                                          `${element.nombre}`
                                        );
                                        setFieldValue(
                                          `detalle[${index}].codigoProducto`,
                                          `${element.codigo}`
                                        );
                                        // setFieldValue(
                                        //   `detalle[${index}].luz`,
                                        //   `${values.detalle.luz}`
                                        // );
                                      }}
                                    >
                                      add
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      delete
                                    </button>
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      name={`detalle[${index}].descripcion`}
                                      value={element.nombre}
                                      component={Input}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <input
                                      name="codigo"
                                      value={element.codigo}
                                      component={Input}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].luz`}
                                      component={Input}
                                      value={values.detalle.luz}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].nomenclatura`}
                                      component={Input}
                                      value={values.detalle.nomenclatura}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].paso`}
                                      component={Input}
                                      value={values.detalle.paso}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].ancho`}
                                      component={Input}
                                      value={values.detalle.ancho}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].cola`}
                                      component={Input}
                                      value={values.detalle.cola}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].peso`}
                                      component={Input}
                                      value={values.detalle.peso}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].diametro`}
                                      component={Input}
                                      value={values.detalle.diametro}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].pasoEstampado`}
                                      component={Input}
                                      value={values.detalle.pasoEstampado}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`detalle[${index}].cantidadMl`}
                                      component={Input}
                                      value={values.detalle.cantidadMl}
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
                </FieldArray>
                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={statusForm}
                >
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
