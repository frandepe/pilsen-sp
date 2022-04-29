import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import genereteStore from "./redux/store";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCmZLdpCC1tbAdubhCloGGF3Zwncwh0_bI",
//   authDomain: "appsantiagopallas.firebaseapp.com",
//   projectId: "appsantiagopallas",
//   storageBucket: "appsantiagopallas.appspot.com",
//   messagingSenderId: "609327140376",
//   appId: "1:609327140376:web:528c3c480bfbdddf5b3d6d",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

const store = genereteStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
