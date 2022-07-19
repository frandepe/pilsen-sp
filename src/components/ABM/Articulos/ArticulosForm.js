import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Header from "../../LayoutPublic/Header/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
  const [selectInsumo, setSelectInsumo] = useState(null);
  const { articulosInfo, loading, tipoDeArticulosInfo } = useSelector(
    (store) => store.articulos
  );
  const [statusForm, setStatusForm] = useState(false);
  // Estado
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoArticulo, setTipoArticulo] = useState("");
  // const [luz, setLuz] = useState("");
  const [detalle, setDetalle] = useState([
    // {
    //   idArticulo: "",
    //   idArticuloDetalle: "",
    //   luz: "",
    //   diametro: "",
    //   nomenclatura: "",
    //   descripcion: "",
    //   paso: "",
    //   pasoEstampado: "",
    //   cantidadMl: "",
    //   ancho: "",
    //   cola: "",
    //   peso: "",
    // },
  ]);

  useEffect(() => {
    dispatch(articulosAction(articulosInfo));
    dispatch(tipoDeArticulosAction(tipoDeArticulosInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendABM = async (e) => {
    e.preventDefault();
    setStatusForm(true);
    // formData.detalle.push(detalleProducto);
    // const resp = formData.detalle.filter((e) => e !== null);
    // const newArray = resp.filter(function (el) {
    //   return el.descripcion !== "";
    // });
    try {
      const response = await privatePostRequest("articulos/save", {
        nombre,
        codigo,
        descripcion,
        tipoArticulo,
        detalle,
      });
      console.log(response);
      if (!response?.data?.status === 200) throw new Error("Algo falló");
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
            <input label="Nombre" onChange={(e) => setNombre(e.target.value)} />

            <label htmlFor="titulo">Código</label>
            <input label="Codigo" onChange={(e) => setCodigo(e.target.value)} />

            <label htmlFor="titulo">Descripción</label>
            <input
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
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
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
                        !element.detalle[0] && (
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
                                onChange={() => {
                                  setDetalle([
                                    ...detalle,
                                    {
                                      idArticulo: "",
                                      idArticuloDetalle: element.id,
                                      luz: element.luz,
                                      // luz: detalle?.luz,
                                      diametro: "",
                                      nomenclatura: element.nombre,
                                      descripcion: element.descripcion,
                                      paso: "",
                                      pasoEstampado: "",
                                      cantidadMl: "",
                                      ancho: "",
                                      cola: "",
                                      peso: "",
                                    },
                                  ]);

                                  // const existe = detalle.some(
                                  //   (el) => (el.idArticuloDetalle = element.id)
                                  // );

                                  // console.log(existe);
                                  // if (existe) {
                                  //   setDetalle(
                                  //     detalle.filter(
                                  //       (el) => el.id !== element.id
                                  //     )
                                  //   );
                                  // } else {
                                  //   setDetalle([
                                  //     ...detalle,
                                  //     {
                                  //       idArticulo: "",
                                  //       idArticuloDetalle: element.id,
                                  //       luz: setLuz(luz),
                                  //       // luz: detalle?.luz,
                                  //       diametro: "",
                                  //       nomenclatura: element.nombre,
                                  //       descripcion: element.descripcion,
                                  //       paso: "",
                                  //       pasoEstampado: "",
                                  //       cantidadMl: "",
                                  //       ancho: "",
                                  //       cola: "",
                                  //       peso: "",
                                  //     },
                                  //   ]);
                                  // }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].nomenclatura`}
                                value={element.nombre}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].idArticuloDetalle`}
                                value={element.id}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].descripcion`}
                                value={element.descripcion}
                              />
                            </TableCell>

                            <TableCell>
                              <input
                                // name={detalle[index]?.luz}
                                // onChange={(e) => setDetalle({luz: e.target.value})}
                                value={detalle.luz}
                              />
                            </TableCell>

                            <TableCell>
                              <input
                                name={`${detalle[index]}.paso`}
                                value={detalle?.paso}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].ancho`}
                                value={detalle?.ancho}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                name={detalle[index]?.cola}
                                value={detalle?.cola}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].peso`}
                                value={detalle?.peso}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].diametro`}
                                value={detalle?.diametro}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].pasoEstampado`}
                                value={detalle?.pasoEstampado}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                // name={`detalle[${index}].cantidadMl`}
                                value={detalle?.cantidadMl}
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
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </form>
        </div>
      </Header>
    </div>
  );
};

export default ArticulosForm;
