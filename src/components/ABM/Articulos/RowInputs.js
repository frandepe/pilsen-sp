import { TableCell, TableRow, TextField } from "@material-ui/core";

const RowInputs = ({
  handleCheck,
  element,
  setLuz,
  setPaso,
  setAncho,
  setCola,
  setPeso,
  setDiametro,
  setPasoEstampado,
  setCantidadMl,
}) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell component="th" scope="row">
        <input type="checkbox" onChange={() => handleCheck(element)} />
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
          type="text"
          onChange={(e) => {
            setLuz(e.target.value);
          }}
        />
      </TableCell>

      <TableCell>
        <TextField
          onChange={(e) => {
            setPaso(e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => {
            setAncho(e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => {
            setCola(e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => {
            setPeso(e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => {
            setDiametro(e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => {
            setPasoEstampado(e.target.value);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => {
            setCantidadMl(e.target.value);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default RowInputs;
