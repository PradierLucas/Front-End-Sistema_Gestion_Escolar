import { useState, useEffect } from 'react';

function EditUser({ user, handleClose }) {



  const [options, setOptions] = useState([]);
  
  const [item, setItem] = useState({});

  const [passwordVisible, setPasswordVisible] = useState(false);

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

  useEffect(() => {
    if (user) {
      setItem({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        password: user.password || '',
        dni: user.dni || null,
        id_rol: user.id_rol || null,
        id_curso: user.curso || null,
      });
    }
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/usuarios/${user.id_usuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Elemento actualizado con éxito');
          handleClose();

         
          
        } else {
          console.error('Error al actualizar el elemento');
          alert('Error al actualizar el elemento, Intente nuevamente');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
        error('Error de red:', error);
      });
  };


  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <form onSubmit={handleSubmit}>
             
              <label htmlFor="nombre"><h4>Nombre</h4></label>
              <div className="form-group">
                <input
                placeholder='nombre'
                  type="text"
                  id="nombre"
                  name='nombre'
                  className="form-control"
                  value={item.nombre}
            onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido"><h4>Apellido</h4></label>
                <input
                  type="text"
                  id="apellido"
                  name='apellido'
                  className="form-control"
                  value={item.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dni"><h4>DNI</h4></label>
                <input
                  type="number"
                  id="dni"
                  name='dni'
                  className="form-control"
                  value={item.dni}
            onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"><h4>Email</h4></label>
                <input
                  type="email"
                  id="email"
                  name='email'
                  className="form-control"
                  value={item.email}
            onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className=" row">

                <label htmlFor="password"><h4>Contraseña</h4></label>
                <div className='col'><input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name='password'
                  className="form-control"
                  value={item.password}
                  onChange={handleInputChange}
                  required

                /></div>
                <div className='col'>
                  <button type='button' className='btn ' onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <span class="material-symbols-outlined">
                      visibility_off
                    </span> : <span class="material-symbols-outlined">
                      visibility
                    </span>}
                  </button>
                </div>
              </div>

             

              <div className="form-floating">
                <select
                  required
                  placeholder="Rol"
                  id="id_rol"
                  name='id_rol'
                  className="form-select"
                  value={item.id_rol}
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
                  value={item.id_curso}
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

              <button type="submit" className="btn btn-primary">Editar</button>
            </form>
          </div>
        </div>
      </div>
      </>
  );
};

export default EditUser;     


