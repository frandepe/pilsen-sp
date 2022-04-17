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
// import axios from 'axios';

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

// const APIurl= 'http://localhost:3001/api/auth/login';

export default function SignIn() {
  const classes = useStyles();

  const formSchema = yup.object().shape({
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
      .required("Por favor, ingrese su contraseña")
      .max(50, "La contraseña es demasiado larga"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          try {
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
                  Inicia sesión
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} Validate>
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
                    autoFocus
                    value={values.email}
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
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="input-error"
                  />
                  <FormControlLabel
                    control={<Checkbox value="true" color="primary" />}
                    label="Recuerdame"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submit}
                  >
                    Acceder
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"No tienes cuenta? Registrate"}
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
