import { makeStyles } from "@material-ui/core";
// import backgraund_image from "./image/Monterey.jpg";
import mockData from "./utils/mockdata";
import { useState } from "react";
import ContextAPI from "./utils/contextAPI";
import uuid from "react-uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tablero from "./components/Tablero/Tablero";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import "./App.css";
import TipoDeArticulosGet from "./components/ABM/TipoDeArticulos/TipoDeArticulosGet";
import TipoDeArticulos from "./components/ABM/TipoDeArticulos/TipoDeArticulos";

function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);

  const updateListTitle = (newTitle, listId) => {
    const list = data.lists[listId];
    list.title = newTitle;
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };
  const updateTitleCard = (newTitle, listId, cardId) => {
    const list = data.lists["list-1"];
    const card = list.cards["card-1"];

    card.title = newTitle;
    console.log(card.title);

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };
  const addCard = (title, listId) => {
    const newCardId = uuid();

    const newCard = {
      id: newCardId,
      title: title,
    };
    // añadimos el newCard al array
    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    });
  };
  const addList = (title) => {
    // generar un id para la lista
    const newListId = uuid();
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: {
          id: newListId,
          title: title,
          cards: [],
        },
      },
    });
  };
  return (
    <ContextAPI.Provider
      value={{ updateListTitle, addCard, addList, updateTitleCard }}
    >
      <Router>
        <div className={classes.root}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/tablero" component={Tablero} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/tipo-de-articulos" component={TipoDeArticulosGet} />
            <Route path="/tipo-de-articulos-form" component={TipoDeArticulos} />
          </Switch>
        </div>
      </Router>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   minHeight: "100vh",
  //   overflowX: "auto",
  //   background: "#4c9aff",
  //   backgroundImage: `url(${backgraund_image})`,
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  // },
  // container: {
  //   display: "flex",
  //   justifiContent: "center",
  //   alingItem: "center",
  //   margin: "auto",
  // },
}));

export default App;
