import { useState, useEffect } from 'react';
import DataUser from '../datosUser';

function EditUserAlumno({  handleClose }) {

  const {data:user}=DataUser()
  const [item, setItem] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  useEffect(() => {
    if (user) {
      setItem({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email ,
        password: user.password,
        dni: user.dni ,
        id_rol: user.id_rol ,
        id_curso: user.curso ,
      });
    }
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/usuarios/editar/${user.id_usuario}`, {
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
          window.location.reload()
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
          <div className=' container text-center'><h3>Editar Información</h3></div>
          <br></br>
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
    <button type='button' className='btn '  onClick={() => setPasswordVisible(!passwordVisible)}>
    {passwordVisible ? <span class="material-symbols-outlined">
visibility_off
</span> : <span class="material-symbols-outlined">
visibility
</span>} 
  </button>
  </div>
  </div>


  
              
               
  
                <button type="submit" className="btn btn-primary">Editar</button>
              </form>
            </div>
          </div>
        </div>
        </>
    );}

;

export default EditUserAlumno;     


