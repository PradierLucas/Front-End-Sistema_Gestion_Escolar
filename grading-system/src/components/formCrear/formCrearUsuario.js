import React, { useState, useEffect } from "react";



function FormCrearUsuario({ handleClose }) {


  const [options, setOptions] = useState([]);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    dni: null,
    id_rol: "",
    id_curso: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };



  useEffect(() => {
    // Reemplaza la URL con la que corresponda a tu API
    fetch('http://localhost:8080/api/curso/nombres')
      .then(response => response.json())
      .then(data => {
        setOptions(data); // Actualiza el estado con las opciones obtenidas del servidor
      })
      .catch(error => {
        console.error('Error al obtener las opciones de cursos:', error);
      });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': sessionStorage.getItem('token')
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al crear el usuario");
        }
      })
      .then((data) => {
        console.log("Usuario creado:", data);
        handleClose();
        window.location.reaload();

      })
      .catch((error) => console.error("Error al crear el usuario: ", error));

  };
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
                  id="floatingNickname"
                  placeholder='nombre'
                  value={user.nombre}
                  onChange={handleInputChange}
                  name='nombre'
                  required
                />
                <label htmlFor="nombre"><h4>Nombre</h4></label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  id="floatingLastName"
                  className="form-control"
                  name='apellido'
                  value={user.apellido}
                  placeholder='Apellido'
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingLastName"><h4>Apellido</h4></label>
              </div>
              <div className="form-floating">

                <input
                  type="number"
                  id="floatingdni"
                  name='dni'
                  className="form-control"
                  value={user.dni}
                  onChange={handleInputChange}
                  placeholder='Dni'
                  required
                />
                <label htmlFor="floatingdni"><h4>DNI</h4></label>
              </div>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  name='email'
                  value={user.email}
                  placeholder='Email'
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingEmail"><h4>Email</h4></label>
              </div>
              <div className="form-floating password">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder='Password'
                  value={user.password}
                  name='password'
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingPassword"><h4>Password</h4></label>
              </div>

              <div className="form-floating">
                <select
                  required
                  placeholder="Rol"
                  id="id_rol"
                  name='id_rol'
                  className="form-select"
                  value={user.id_rol}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione un Rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Alumno</option>
                  <option value="3">Profesor</option>

                </select>
                <label htmlFor="id_rol"><h4>Rol</h4></label>
              </div>


              <div className="form-floating">
                <select
                  required
                  id="id_curso"
                  name='id_curso'
                  className="form-select"
                  value={user.id_curso}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione un curso</option>
                  {options.map(option => (
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
      </div>
    </>
  );
};

export default FormCrearUsuario;