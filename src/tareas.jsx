import React, { useEffect, useState } from "react";
import Formulario from "./Formulario";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query, setDoc
} from "firebase/firestore";
import { map } from "@firebase/util";
import Swal from 'sweetalert2';

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [idactual,setidactual]=useState("");

  const addoredit = async (taskobj) => {

    if(taskobj.nombretarea==='' || taskobj.descripciontarea==='')
    {
      Swal.fire(
        'Error!',
        'Ingrese un nombre y una descripción para la tarea',
        'error'
      )
    }
    else
    {  

      if(idactual==='')
      {
       try {
         const docRef = await addDoc(collection(db, "tasks"), taskobj);
         Swal.fire(
           'Registrada correctamente!',
           'la tarea ha sido registrada',
           'success'
         )
       } catch (e) {
         console.error("Error adding document: ", e);
       }
      }else
      {
       await setDoc(doc(db, "tasks",idactual), taskobj);
       setidactual("");
       Swal.fire(
         'Actualizado correctamente!',
         'la tarea ha sido actualizada',
         'success'
       )
      }

    }

  };


  useEffect(() => {
     const q = query(collection(db, "tasks"));
  const obtenertareas = onSnapshot(q, (querySnapshot) => {
    const documentos = [];
    querySnapshot.forEach((doc) => {
      documentos.push({ ...doc.data(), id: doc.id });
    });
    setTareas(documentos);
  })
  }, []);
    
  const borrartarea= id=>
  {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText:'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "tasks",id));
        Swal.fire(
          'Eliminada!',
          'la tarea ha sido eliminada',
          'success'
        )
      }
    })
  }

  return (
    <div>
      <Formulario {...{addoredit,idactual,tareas}}></Formulario>
      <h1 className="text-center m-5">Lista de tareas</h1>
        <h1>{tareas.length}</h1>
      <div className="contenedor d-flex flex-row flex-wrap">
        {tareas.map((tarea) => (
          <div className="card cardw m-4 p-3 div-shadow rounded-2 d-flex justify-content-around" key={tarea.id}>
            <h5>{tarea.nombretarea}</h5>
            <p>{tarea.descripciontarea}</p>
            <button className="btn btn-light border-0 p-2 m-2 rounded-2" onClick={()=>setidactual(tarea.id)}><i className='bx bx-edit'></i> Editar</button>
            <button className="btn btn-danger border-0 p-2 m-2 rounded-2" onClick={()=>borrartarea(tarea.id)}><i className='bx bx-trash'></i> Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaTareas;
