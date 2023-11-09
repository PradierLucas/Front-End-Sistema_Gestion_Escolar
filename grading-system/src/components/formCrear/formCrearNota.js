import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';


const FormCrearNota = () => {
  const {id_materia, id_usuario,apellido} = useParams();
  const navigate = useNavigate()

  const [data , setData] = useState({
    id_usuario: id_usuario,
    id_materia: id_materia,
    periodo_1: null,
    periodo_2: null,
    periodo_3: null
  });

const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value >= 0 && value <= 10) {
      setData({
        ...data,
        [name]: value,
      });
    } else {
     alert('El valor debe estar entre 1 y 10')
      console.error('El valor debe estar entre 1 y 10');
    }
    
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/nota",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(data),
  
  })
  .then((response) => {
    if (response.ok) {
        console.log('Elemento actualizado con éxito');
     navigate('/dashboard')
       

    } else {
        console.error('Error al actualizar el elemento');
    }
})
.catch((error) => {
    console.error('Error de red:', error);
});
};
  return (
    <>
   

      <div className="container mt-5  ">
      <h4>Crear Nota </h4>
      <br></br>
    <h4>Alumno: {apellido}</h4>
    <br></br>
        <div className="row justify-content-center">

          <div className="col-md-6">

            <form onSubmit={handleSubmit}>
        
              <div className="form-group">
                <label htmlFor="periodo_1"><h4>Periodo 1</h4></label>
                <input
                  type="float"
                  id="periodo_1"
                  name='periodo_1'
                  className="form-control"
                  value={data.periodo_1}
                  onChange={handleInputChange}
                
                />
              </div>
              <div className="form-group">
                <label htmlFor="periodo_2"><h4>Periodo 2</h4></label>
                <input

                  type="float"
                  id="periodo_2"
                  name='periodo_2'
                  className="form-control"
                  value={data.periodo_2}
                  onChange={handleInputChange}
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="periodo_3"><h4>Periodo 3</h4></label>
                <input

                  type="float"
                  id="periodo_3"
                  name='periodo_3'
                  className="form-control"
                  value={data.periodo_3}
                  onChange={handleInputChange}
                 
                />
              </div>
              <button type="submit" className="btn btn-primary">Crear</button>
            </form>
          </div>
        </div>
      </div></>
  );
};

export default FormCrearNota      