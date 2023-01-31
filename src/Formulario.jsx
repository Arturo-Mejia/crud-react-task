import React, {useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function Formulario(props) {
  
    const valoresiniciales=
    {
        nombretarea:"",
        descripciontarea:""
    };

    const [valores,setValores]= useState(valoresiniciales);

    const handlersubmit= e =>
    {
        e.preventDefault();
        props.addoredit(valores); 
        setValores({...valoresiniciales});
    }

   const handlerinput= (e)=>
    {
        const{name,value} = e.target;
        setValores({...valores,[name]:value});
       
    }
  
    useEffect(() => {
      if(props.idactual==='')
      {
        setValores({...valoresiniciales})
      }else
      {
        obtenertareaporid(props.idactual)
      }
      },[props.idactual]);
  
      const obtenertareaporid=async id=>
      {
        const docRef = doc(db, "tasks",id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
           setValores({...docSnap.data()});
        } 
      }


  return (
    <div className='mt-3'>
    <form onSubmit={handlersubmit}>
<div className="card m-3 p-3 rounded-2 mw50r m-auto">
<h1 className='text-center m-3'>Formulario tarea</h1>

<div className="input-group mb-3">
  <input type="text" name='nombretarea' className="form-control" placeholder="Nombre de la tarea" aria-label="Username" aria-describedby="basic-addon1" onChange={handlerinput} value={valores.nombretarea}></input>
</div>
  
<div className="mb-3">
  <textarea className="form-control" name="descripciontarea" placeholder="desccripcion de la tarea" rows="3"  onChange={handlerinput} value={valores.descripciontarea}></textarea>
</div> 

<button className='btn-grad m-3 border-0' type='submit'>{props.idactual==='' ? 'Agregar tarea': 'Actualizar tarea'}</button>
</div>
</form>
</div>
  )
}

export default Formulario
