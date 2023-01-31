import React from 'react';
import ReactDOM from 'react-dom/client';
import './estilos.css'
import './firebase.js';
import 'bootswatch/dist/lux/bootstrap.min.css';
import ListaTareas from './tareas';
import 'boxicons/css/boxicons.min.css';
import 'sweetalert2/dist/sweetalert2.all.min.js'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ListaTareas></ListaTareas>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
