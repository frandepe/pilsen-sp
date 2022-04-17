import { makeStyles } from "@material-ui/core";
import backgraund_image from "./image/Monterey.jpg";
import mockData from "./utils/mockdata";
import { useState } from "react";
import ContextAPI from "./utils/contextAPI";
import uuid from "react-uuid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tablero from "./components/Tablero/Tablero";
// import Profile from "./components/SideMenu/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
// import Header from "./components/LayoutPublic/Header/Header";
import "./App.css";

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
          {/* <div className={classes.sideMenu}>
            <Profile />
            <Link className={classes.link} to="/home">
              <Button className={classes.btn}>Inicio</Button>
            </Link>
            <Link className={classes.link} to="/tablero">
              <Button className={classes.btn}>Tablero</Button>
            </Link>
            <Link className={classes.link} to="/login">
              <Button className={classes.btn}>Login</Button>
            </Link>
            <Link className={classes.link} to="/register">
              <Button className={classes.btn}>Register</Button>
            </Link>
          </div> */}

          <Switch>
            <Route exact path="/" />
            <Route path="/tablero" component={Tablero} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexDirection:"column",

    minHeight: "100vh",
    overflowX: "auto",
    background: "#4c9aff",
    backgroundImage: `url(${backgraund_image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    display: "flex",
    justifiContent: "center",
    alingItem: "center",
    margin: "auto",
  },
  // sideMenu: {
  //   width: "15%",
  //   display: "flex",
  //   flexDirection: "column",
  //   background: "rgba(255, 255, 255, 0.2)",
  //   padding: theme.spacing(1),
  //   margin: theme.spacing(1),
  //   borderRadius: "5px",
  //   transitionDuration: "500ms",
  // },
  // btn: {
  //   width: "110px",
  //   margin: theme.spacing(1),
  //   padding: theme.spacing(1),
  //   background: "rgba(255, 255, 255, 0.2)",
  // },
  // link: {
  //   textDecoration: "none",
  // },
}));

export default App;
