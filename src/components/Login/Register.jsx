import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../LayoutPublic/Header/Header";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import "../shared.css";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Pilsen Digital
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    borderRadius: "5px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const APIurl = "http://localhost:3001/api/auth/register";

export default function SignIn() {
  const classes = useStyles();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Por favor, ingrese su nombre")
      .matches(/^[A-Za-z ]*$/, "Por favor, ingrese un nombre válido"),
    email: yup
      .string()
      .required("El email es requerido")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Escriba un correo válido"
      )
      .max(50, "El email es demasiado largo"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "La contraseña debe contener 8 caracteres, uno en mayúscula, uno en minúscula, un número y un carácter especial"
      )
      .max(50, "La contraseña es demasiado larga"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          resetForm();
          try {
            // recordarme que el name cambio a username
            try {
              const response = await axios.post(
                "http://26.204.148.246:9090/api/Auth/Register",

                values
                // { "Access-Control-Allow-Origin": "*" }
                // {
                //   headers: {
                //     "Access-Control-Allow-Methods": " POST, GET, OPTIONS",
                //     "Content-Type": "application/json",
                //   },
                // }
              );
              console.log("Nodata", response);

              return response;
            } catch (err) {
              console.log("Error catch:", err);
            }
            console.log(values);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <Header>
            <Container component="main" maxWidth="xs" className={classes.root}>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Registrate
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} Validate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoComplete="nombre"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    autoFocus
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="input-error"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    autoFocus
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="input-error"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    id="password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="input-error"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recuerdame"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                  >
                    Acceder
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/login" variant="body2">
                        {"Ya tienes cuenta? Inicia sesion"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8} mb={8}>
                <Copyright />
              </Box>
            </Container>
          </Header>
        )}
      </Formik>
    </div>
  );
}
