import { useState , useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import FormCrearUsuario from '../formCrear/formCrearUsuario';
import FormEditarUsuario from '../formEditar/formEditarUser';



const TablaUsuarios = () => {
  
  //const { data} = useFetch("http://localhost:8080/api/usuarios");

  const [data, setData] = useState([]);


  
 
  
 
  const [usuarioAEliminar, setUsuarioAEliminar] = useState();
  const [showModalDelUser, setShowModalDelUser] = useState(false);
  const handleCloseDelUser = () => {setShowModalDelUser(false)}
  const handleShowDelUser = (id) => {
    setUsuarioAEliminar(id);
    setShowModalDelUser(true);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8080/api/usuarios/${usuarioAEliminar}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Elemento eliminado con éxito');
          handleClose()
         
        } else {
          console.error('Error al eliminar el usuario');
          alert('Para eliminar el profesor primero debe borrar todos los datos relacionados al mismo.');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
   
  }

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const apellido = item.apellido;
     const searchTermLowerCase = searchTerm.toLowerCase();
    const apellidoLowerCase = apellido.toLowerCase();
     const apellidosSeparados = apellidoLowerCase.split(' ');
    return apellidosSeparados.some((part) => part.startsWith(searchTermLowerCase));
  });

  //Modal Crear Usuario
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleShowCreate = () => setShowModalCreate(true);

  //Modal Editar Usuario
  const [usuarioAEditar, setUsuarioAEditar] = useState(null); // Nuevo estado
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleShowEdit = (id) => {
    const usuarioParaEditar = data.find((usuario) => usuario.id_usuario === id);
    if (usuarioParaEditar) {
      setUsuarioAEditar(usuarioParaEditar);
      setShowModalEdit(true);
    }
  };

  const handleClose = () => {
    setShowModalCreate(false);
    setShowModalEdit(false);
    setShowModalDelUser(false);
    //window.location.reload()
  };

  useEffect(() => {
    
    // Opciones personalizadas para el fetch
    const requestOptions = {
      method: 'GET', // Método GET
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
     
    };
  

    fetch("http://localhost:8080/api/usuarios", requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {
         
        }
      })
     
  }, [showModalDelUser,showModalCreate,showModalEdit]);

  return (
    <>
    <div className="container">
        <div class="row justify-content-center align-items-center g-2">
        <h3>Administracion de Usuarios</h3>
          <div className="col-2 ">  <button onClick={handleShowCreate} className="btn btn-dark">
            Agregar Usuario
          </button></div>
      <div className="col-4 offset-4">
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Buscar por Apellido"
          onChange={handleSearch}
          value={searchTerm}
        />
       <span className="btn btn-dark">Buscar</span>
      </div>
      </div>
      </div>

      <br></br>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Dni</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
          
          </tr>
        </thead>
          <tbody>
          {filteredData.map((USUARIO, index) => (
            <tr key={index}>
              <th scope="row">{USUARIO.id_usuario}</th>
              <td>{USUARIO.nombre}</td>
              <td>{USUARIO.apellido}</td>
              <td>{USUARIO.dni}</td>
              <td>{USUARIO.email}</td>
              <td>{USUARIO.rol}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => handleShowEdit(USUARIO.id_usuario)} className="btn btn-dark">Editar</button>

                <button onClick={() => handleShowDelUser(USUARIO.id_usuario)} type="button" className="btn btn-dark">Borrar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <Modal show={showModalEdit || showModalCreate} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{showModalEdit ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showModalEdit ? <FormEditarUsuario user={usuarioAEditar} handleClose={handleClose} /> : <FormCrearUsuario handleClose={handleClose} />}
          </Modal.Body>
        </Modal>

        <Modal show={showModalDelUser} onHide={handleCloseDelUser}>

          <Modal.Body >
     

            <div className='container  text-center '>
              <strong>¿Está seguro que desea eliminar este usuario?</strong>
              <div className='row  '>
                <div className='col'> <button onClick={handleSubmit} className="btn btn-danger">Eliminar</button></div>
                <div className='col offset-1'> <button className="btn btn-dark" variant="secondary" onClick={handleCloseDelUser}>
                  Cancelar
                </button></div>
              </div>
            </div>
          </Modal.Body>

        </Modal>

    </div></>
  );
}

export default TablaUsuarios;
