import React, { useState, useEffect } from 'react';



const FormCrearMateria = ({ handleClose }) => {


  const [profe, setProfe] = useState([])
  const [cursos, setCursos] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: 'GET', // Método GET
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
     
    };
    // Reemplaza la URL con la que corresponda a tu API
    fetch('http://localhost:8080/api/curso/nombres',requestOptions)
      .then(response => response.json())
      .then(curso => {
        setCursos(curso); // Actualiza el estado con las opciones obtenidas del servidor
      })
      .catch(error => {
        console.error('Error al obtener las opciones de cursos:', error);
      });
 
 
    // Reemplaza la URL con la que corresponda a tu API
    fetch('http://localhost:8080/api/profesor',requestOptions)
      .then(response => response.json())
      .then(profes => {
        setProfe(profes); // Actualiza el estado con las opciones obtenidas del servidor
      })
      .catch(error => {
        console.error('Error al obtener profesores:', error);
      });

    }, []);

  const [data, setData] = useState({
    nombre: "",
    id_usuario: "",
    id_curso: ""
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/materia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify(data),
      })
      .then((response) => {

        response.json()
      }

      )

      .then((data) => {
        console.log("Usuario creado:", data);
        alert('Materia creado con exito');
        handleClose();





      })
      .catch((error) => console.error("Error al crear el usuario: ", error));
  }



  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingMateria"
                  value={data.nombre}
                  placeholder='Materia'
                  onChange={handleInputChange}
                  name='nombre'
                  required
                />
                <label htmlFor="floatingMateria" ><h4>Materia</h4></label>
              </div>
              <div className="form-floating">
                <select
                required
                  id="id_usuario"
                  name='id_usuario'
                  className="form-select"
                  value={data.id_usuario}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione un Profesor</option>
                  {profe.map(option => (
                    <option key={option.id_usuario} value={option.id_usuario}>
                      {option.nombre} {option.apellido}
                    </option>
                  ))}
                </select>
                <label htmlFor="id_usuario"><h4>Profesor</h4></label>
              </div>
              <div className="form-floating">
                <select
                required
                  id="id_curso"
                  name='id_curso'
                  className="form-select"
                  value={data.id_curso}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map(option => (
                    <option key={option.id_curso} value={option.id_curso}>
                      {option.nombre}
                    </option>
                  ))}
                </select>
                <label htmlFor="id_curso"><h4>Curso</h4></label>
              </div>
              <button type="submit" className="btn btn-primary">Crear</button>
            </form>
          </div>
        </div>
      </div></>
  );
};

export default FormCrearMateria
