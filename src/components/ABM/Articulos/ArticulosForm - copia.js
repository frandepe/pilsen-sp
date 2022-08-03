import React, { useState, useEffect } from "react";
import Header from "../../LayoutPublic/Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import showAlert from "../../../shared/showAlert";
import { privatePostRequest } from "../../../services/privateApiServices";
// import { useHistory } from "react-router-dom";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import TableHead from "@mui/material/TableHead";
import Spiner from "../../../shared/spiner";
import { useSelector, useDispatch } from "react-redux";
import "../../shared.css";
import {
  articulosAction,
  tipoDeArticulosAction,
} from "../../../redux/actionsABM/reducerArticulos";
import { Alert } from "@mui/material";
// import RowInputs from "./RowInputs";
//import {produce} from "immer"

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
  const [selectInsumo, setSelectInsumo] = useState("insumo");
  const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
  );
  const [statusForm, setStatusForm] = useState(false);
  // Estado
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState("");
  const [detalle, setDetalle] = useState([]);

  const [luz, setLuz] = useState("");
  const [diametro, setDiametro] = useState("");
  const [paso, setPaso] = useState("");
  const [pasoEstampado, setPasoEstampado] = useState("");
  const [cantidadMl, setCantidadMl] = useState("");
  const [ancho, setAncho] = useState("");
  const [cola, setCola] = useState("");
  const [peso, setPeso] = useState("");

  useEffect(() => {
    dispatch(articulosAction(articulosInfo));
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheck = (element, index) => {
    console.log(element);
    const existe = detalle.some((el) => el.idArticuloDetalle === element.id);
    if (existe) {
      setDetalle(detalle.filter((el) => el.idArticuloDetalle !== element.id));
    } else {
      setDetalle([
        ...detalle,
        {
          idArticuloDetalle: element.id,
          nomenclatura: element.nombre,
          descripcion: element.descripcion,
        },
      ]);
    }
  };
  const setDatos = (element , atribute, index) => {
    console.log(index)
    const indiceTable = index - 2;
    setDetalle([
      ...detalle,
      detalle[indiceTable].luz = element
    ]);

    // switch(atribute) {
    //   case "luz":
    //     setDetalle([
    //       ...detalle,
    //       detalle[0].luz = element
    //     ]);
    //     break;
    //   case "paso":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].paso = element
    //     ]);
    //     break;
    //   case "peso":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].peso = element
    //     ]);
    //     break;
    //   case "pasoEstampado":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].pasoEstampado = element
    //     ]);
    //     break;
    //   case "cantidadMl":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].cantidadMl = element
    //     ]);
    //     break;
    //   case "ancho":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].ancho = element
    //     ]);
    //     break;
    //   case "cola":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].cola = element
    //     ]);
    //     break;
    //   case "diametro":
    //     setDetalle([
    //       ...detalle,
    //       detalle[indiceTable].diametro = element
    //     ]);
    //     break;
    // }
  };
  const sendABM = async (e) => {
    e.preventDefault();
    setStatusForm(true);

    try {
      const response = await privatePostRequest("articulos/save", {
        nombre,
        codigo,
        descripcion,
        tipoArticulo,
        detalle,
      });
      if (!response?.data?.status === 200) {
        showAlert({
          type: "success",
          title: patchData?.location?.state?.id
            ? "Editado correctamente"
            : "Creado correctamente",
        });
      }else{
        showAlert({
          type: "error",
          title: patchData?.location?.state?.id
            ? "Algo fallo"
            : "Articulo existente",
        });
      }
      // && history.push("/PallasFront/articulos");
    } catch (err) {
      console.log("Error catch:", err);
    } finally {
      setStatusForm(false);
    }
  };

  return (
    <div>
      <Header>
        <Typography className={classes.title} component="h1" variant="h4">
          Artículos
        </Typography>
        <div className="abm_container">
          <form className="formabm_container" onSubmit={sendABM}>
            <label htmlFor="titulo">Nombre</label>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="titulo">Código</label>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Codigo"
              onChange={(e) => setCodigo(e.target.value)}
            />

            <label htmlFor="titulo">Descripción</label>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Descripcion"
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <div className="input__container">
              <label htmlFor="titulo">Tipo Artículo</label>
              <select
                className="select-field"
                onClick={(e) => setSelectInsumo(e.target.value)}
                onChange={(e) => setTipoArticulo(e.target.value)}
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
            </div>
            {selectInsumo !== "insumo" && (
              <Table sx={{ minWidth: 750 }} className="Table" aria-label="simple table">
                <TableHead>
                  <TableRow className="list_titulos">
                    <TableCell>✓</TableCell>
                    <TableCell>Nomenclatura</TableCell>
                    <TableCell>CódigoId</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Luz</TableCell>
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
                        element.detalle.length === 0 && (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <input
                                type="checkbox"
                                onChange={() => handleCheck(element, index)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField value={element.nombre} />
                            </TableCell>
                            <TableCell>
                              <TextField value={element.id} />
                            </TableCell>
                            <TableCell>
                              <TextField value={element.descripcion} />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="luz"
                                type="text"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <TextField
                                id="paso"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="ancho"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="cola"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="peso"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="diametro"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="pasoEstampado"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="cantidadMl"
                                onChange={(e) => {
                                  setDatos(e.target.value, e.target.id, index);
                                }}
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
            <Button type="submit" className={classes.btn} disabled={statusForm}>
              {patchData?.location?.state?.id ? "Editar" : "Crear"}
            </Button>
            <pre>{JSON.stringify(detalle, null, 2)}</pre>
          </form>
        </div>
      </Header>
    </div>
  );
};

export default ArticulosForm;
