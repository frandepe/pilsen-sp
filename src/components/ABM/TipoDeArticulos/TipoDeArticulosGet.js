import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../LayoutPublic/Header/Header";

const TipoDeArticulosGet = () => {
  const [articulos, setArticulos] = useState([]);
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImMyODIzNzEyLWVhY2ItNDlhMy1hYjMwLTVlMjhjODI2NWRkYiIsInN1YiI6Ik1hcmlhbm8yMjIiLCJlbWFpbCI6Ik1hcmlhbm8yMjIiLCJuYmYiOjE2NTEwMDQ5MjIsImV4cCI6MTY1MTAyNjUyMiwiaWF0IjoxNjUxMDA0OTIyfQ._K_fLXzghsMEkJyaTd9r7tYJKsGfJrYuV9MCYYwJdTv7QNEr547qQj57MTII5_r1O6Oca6XWhA68mQxN37dpzA";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getTipoDeArticulos = async () => {
    try {
      const response = await axios.get(
        "http://26.204.148.246:9090/api/tiposarticulo/get",
        config
      );
      console.log(response.data.result);
      setArticulos(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTipoDeArticulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header>
        <h2>Lista de los Tipos de articulos</h2>
        {articulos.map((element) => {
          return (
            <tr key={element.id}>
              <td className="title">{element.nombre}</td>

              <td className="options">
                <Link
                  className="options__edit"
                  to={{
                    pathname: "/tipo-de-articulos-form",
                  }}
                >
                  <MdModeEdit />
                </Link>
                <button onClick="">
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          );
        })}
        <button>
          <Link
            to={{
              pathname: "/tipo-de-articulos-form",
            }}
          >
            Agregar tipo de articulo
          </Link>
        </button>
      </Header>
    </div>
  );
};

export default TipoDeArticulosGet;
