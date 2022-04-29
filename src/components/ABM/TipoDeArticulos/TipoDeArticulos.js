import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import showAlert from "../../../shared/showAlert";
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
const TipoDeArticulos = (patchData) => {
  const classes = useStyles();
  const [statusForm, setStatusForm] = useState(false);
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImZjYTAwMDc0LTU0Y2EtNGU4Yi05YzMyLTM0MGE3MTZlODcxMyIsInN1YiI6InNpc3RlbWFzQHBpbHNlbmRpZ2l0YWwuY29tIiwiZW1haWwiOiJzaXN0ZW1hc0BwaWxzZW5kaWdpdGFsLmNvbSIsIm5iZiI6MTY1MTE5ODg2OSwiZXhwIjoxNjUxMjIwNDY5LCJpYXQiOjE2NTExOTg4Njl9.ErzsTgIW2jLd6CKmc2B5D1R_nFfqmi0yMOyTd-RNwQ8oVCPj7gJ9nIjToJDBiMK1tXRqhmz7ClwOZJrxPVDrbA";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
  });
  console.log("PatchData:", patchData);

  // Si paso el id en el onSubmit rompe 400
  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Tipo de Articulo
        </Typography>
        <div className="abm_container">
          <Formik
            initialValues={{
              id: patchData?.location?.state?.id,
              nombre: patchData?.location?.state?.nombre || "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ ...newsFormData }) => {
              setStatusForm(true);
              try {
                const response = await axios.post(
                  "http://26.204.148.246:9090/api/tiposarticulo/save",
                  {
                    ...newsFormData,
                  },
                  config
                );
                console.log(response);
                if (!response.data.status === 200)
                  throw new Error("Algo falló");
                showAlert({
                  type: "success",
                  title: "Actualizado correctamente",
                });
              } catch (err) {
                console.log("Error catch:", err);
              } finally {
                setStatusForm(false);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <form className="formabm_container" onSubmit={handleSubmit}>
                <label htmlFor="titulo">Titulo</label>
                <TextField
                  data-testid="titulo"
                  required
                  fullWidth
                  margin="normal"
                  name="nombre"
                  id="titulo"
                  label="Nombre del Tipo de Articulo"
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
                <Button
                  type="submit"
                  className={classes.btn}
                  disabled={statusForm}
                >
                  Actualizar
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Header>
    </div>
  );
};

export default TipoDeArticulos;
