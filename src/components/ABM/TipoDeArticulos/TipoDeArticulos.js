import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
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

export default function TipoDeArticulos({ patchData }) {
  const classes = useStyles();
  // const [categories, setCategories] = useState([]);
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImMyODIzNzEyLWVhY2ItNDlhMy1hYjMwLTVlMjhjODI2NWRkYiIsInN1YiI6Ik1hcmlhbm8yMjIiLCJlbWFpbCI6Ik1hcmlhbm8yMjIiLCJuYmYiOjE2NTA5MDUyNzYsImV4cCI6MTY1MDkyNjg3NiwiaWF0IjoxNjUwOTA1Mjc2fQ.9auOOHCMbQRxoDvH6q1sJPs6vPqmbUyDf0UATthv-E8Ir7ZpDdGCYF6htNfatIg02V3IpzQpe9YzUB2Z6Y22wg";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const formSchema = yup.object().shape({
    nombre: yup
      .string()
      .required("El campo es requerido")
      .max(100, "No puede ingresar más de 100 caracteres"),
  });
  console.log(patchData);
  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Tipo de Articulo
        </Typography>
        <div className="abm_container">
          <Formik
            initialValues={{
              id: patchData?.id || null,
              nombre: patchData?.nombre || "",
            }}
            validationSchema={formSchema}
            onSubmit={async ({ nombre, id }, { resetForm }) => {
              resetForm();
              try {
                const response = await axios.post(
                  "http://26.204.148.246:9090/api/tiposarticulo/save",
                  {
                    id,
                    nombre,
                  },
                  config
                );

                console.log(response);
              } catch (err) {
                console.log("Error catch:", err);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, handleBlur }) => (
              <form className="formabm_container" onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  name="nombre"
                  id="outlined-basic"
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
                <Button type="submit" className={classes.btn}>
                  Actualizar
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Header>
    </div>
  );
}
