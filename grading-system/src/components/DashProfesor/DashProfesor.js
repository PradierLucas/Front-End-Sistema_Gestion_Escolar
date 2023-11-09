import React from 'react';
import { useState } from 'react';
import { Modal } from "react-bootstrap";
import { useFetch } from '../../useFetch';

import TablaAlumnos from './TablaAlumnos';

import DataUser from '../datosUser';
import FormEditarNota from '../formEditar/formEditarNota';

const DashProfesor = () => {
  // const token = sessionStorage.getItem('token');

  // const decodedToken = jwtDecode(token);


 

  const {data} = DataUser()
  const id_user = data.id_usuario;

const { data: nota } = useFetch(`http://localhost:8080/api/nota/${id_user}`);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermApellido, setSearchTermApellido] = useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleApellidoSearch = (e) => {
    setSearchTermApellido(e.target.value);
  };
  const filteredData = nota.filter((item) => {
    const materia = item.materia[0];
    const apellido = item.apellido[0];
    const searchTermMateriaLowerCase = searchTerm.toLowerCase();
    const searchTermApellidoLowerCase = searchTermApellido.toLowerCase();
    const notaMateriaLowerCase = materia.toLowerCase();
    const notaApellidoLowerCase = apellido.toLowerCase();

  const materiaMatches = notaMateriaLowerCase.includes(searchTermMateriaLowerCase);
    const apellidoMatches = notaApellidoLowerCase.includes(searchTermApellidoLowerCase);
  
    return materiaMatches && apellidoMatches;
  });
      
  
  const [Eliminar, setEliminar] = useState({
    id_materia:null,
    id_usuario:null
  }


  );
  const [showModalDel, setShowModalDel] = useState(false);
  const handleCloseDel = () => setShowModalDel(false);
  const handleShowDel = (id_materia,id_usuario) => {
    let data = {id_materia,id_usuario}
    setEliminar(data);

    setShowModalDel(true);

  };
  const [usuarioAEditar, setUsuarioAEditar] = useState({ 
    id_materia:null,
    id_usuario:null}); // Nuevo estado
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleShowEdit = (id_materia,id_usuario) => {
    let data = {id_materia,id_usuario}
      setUsuarioAEditar(data);
      setShowModalEdit(true);
    }
  

  const handleClose = () => {
  
    setShowModalEdit(false);
  };


  const handleSubmit = () => {
    
    fetch(`http://localhost:8080/api/nota/${Eliminar.id_materia}/${Eliminar.id_usuario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      },
    })
      .then((response) => {
        if (response.ok) {
         
          setShowModalDel(false);
          
        
        } else {
          console.error('Error al eliminar la nota');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
  }
    

    const promedioColumna = filteredData.map(datos => {
      // Filtrar las notas no nulas ni 0
      const notasValidas = [datos.periodo_1, datos.periodo_2, datos.periodo_3].filter(nota => nota !== 0 && nota !== null);
  
      // Calcular el promedio solo con las notas válidas
      const promedio = (notasValidas.reduce((total, nota) => total + nota, 0) / notasValidas.length).toFixed(2);
  
      return {
        id_materia:datos.id_materia,
        id_usuario:datos.id_usuario,
        apellido:datos.apellido,
        nombre:datos.nombre,
        materia: datos.materia,
          nota1: datos.periodo_1,
          nota2: datos.periodo_2,
          nota3: datos.periodo_3,
          promedio: promedio
      };
  });


    return (

      <>

            <div>
          <h2>DASHBOARD PROFESOR </h2>

                <div>
                <TablaAlumnos />
            </div>
        </div>

        <br></br>
    <h2>Notas de los Alumnos </h2>
    <br></br>
            <div className="container ">
                <div class="row ">

                    <div class="col-4 "><div className="container-fluid">
                        <form className="d-flex" role="search">

                            <input className="form-control me-2"
                                type="text"
                                placeholder="Buscar por Materia"

                                onChange={handleSearch}
                                value={searchTerm}
                            />
                            <span className="btn btn-dark" >Buscar</span>
                        </form>
                    </div></div>

                    <div class="col-4 "><div className="container-fluid">
                        <form className="d-flex" role="search">

                            <input className="form-control me-2"
                                type="text"
                                placeholder="Buscar por Apellido del alumno"

                                onChange={handleApellidoSearch}
                                value={searchTermApellido}
                            />
                            <span className="btn btn-dark" >Buscar</span>
                        </form>
                    </div></div>

                </div>

                <Modal show={showModalDel} onHide={handleCloseDel}>

<Modal.Body >


  <div className='container  text-center '>
    <strong>¿Está seguro que desea eliminar esta nota?</strong>
    <div className='row  '>
      <div className='col'> <button onClick={handleSubmit} className="btn btn-danger">Eliminar</button></div>
      <div className='col offset-1'> <button className="btn btn-dark" variant="secondary" onClick={handleCloseDel}>
        Cancelar
      </button></div>
    </div>




  </div>

</Modal.Body>

</Modal>
<Modal show={showModalEdit } onHide={handleClose}>
          <Modal.Header closeButton>
         
          </Modal.Header>
          <Modal.Body>
          <FormEditarNota notas={usuarioAEditar} handleClose={handleClose} /> 
          </Modal.Body>
        </Modal>

            </div>
            <br></br> <br></br>


            <div className="container item">

                <table class="table table-striped-columns">
                    <thead>
                        <tr>
                         
                            <th scope="col">Alumno</th>
                        
                            <th scope="col">Materia</th>
                            <th scope="col">1° Trimestre</th>
                            <th scope="col">2° Trimestre</th>
                            <th scope="col">3° Trimestre</th>
                            <th scope="col">Promedio</th>

                        </tr>
                    </thead>
                    {promedioColumna.map(nota => (
                        <tbody>
                            <tr >
                            
                        
                                <td>{nota.apellido} {nota.nombre}</td>
                                <td>{nota.materia}</td>
                                <td>{nota.nota1}</td>
                                <td>{nota.nota2}</td>
                                <td>{nota.nota3}</td>
                                <td>{nota.promedio}</td>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                {/* <Link  to={`/dashboard/editarNota/${nota.id_materia}/${nota.id_usuario}`} type="button" class="btn btn-dark">Editar Nota </Link> */}
                                <button onClick={() => handleShowDel(nota.id_materia,nota.id_usuario)} type="button" className="btn btn-dark">Borrar Nota</button>
                                <button onClick={() => handleShowEdit(nota.id_materia,nota.id_usuario)} type="button" className="btn btn-dark">Editar Nota</button>

                                </div>
                            </tr>

                        </tbody>))}
          </table>
            </div>
        </>
    );
                    }



export default DashProfesor;
