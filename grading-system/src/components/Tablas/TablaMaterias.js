import { useState ,useEffect} from "react";
import { Modal } from "react-bootstrap";
import FormCrearMateria from "../formCrear/formCrearMateria";
import FormEditMateria from "../formEditar/formEditMateria";



const TablaMaterias = () => {

 // const { data: materia } = useFetch("http://localhost:8080/api/materia");
 const [materia, setData] = useState([]);
  const [Eliminar, setEliminar] = useState();
  const [showModalDel, setShowModalDel] = useState(false);
  const handleCloseDel = () => {setShowModalDel(false)}
  const handleShowDel = (id) => {
    setEliminar(id);

    setShowModalDel(true);

  };

  const handleSubmit = () => {
    
    fetch(`http://localhost:8080/api/materia/${Eliminar}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Elemento eliminado con éxito');
          setShowModalDel(false);
          
        
        } else {
          console.error('Error al eliminar la materia');
          alert('Para eliminar la materia primero debe borrar todos los datos relacionados a la misma.');
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
      const filteredData = materia.filter((item) => {
        const materia = item.MATERIA;
        const searchTermLowerCase = searchTerm.toLowerCase();
        const materiaLowerCase = materia.toLowerCase();
        const materiaSeparados = materiaLowerCase.split(' ');
        return materiaSeparados.some((part) => part.startsWith(searchTermLowerCase));
      }); 

  //Modal Crear Materia
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleShowCreate = () => setShowModalCreate(true);

  //Modal Editar Materia
  const [materiaAEditar, setMateriaAEditar] = useState(null); // Nuevo estado
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleShowEdit = (id) => {
    const materiaParaEditar = materia.find((materia) => materia.id_materia === id);
    if (materiaParaEditar) {
      setMateriaAEditar(materiaParaEditar);
      setShowModalEdit(true);
    }
  };

  const handleClose = () => {
    setShowModalCreate(false);
    setShowModalEdit(false);
    
 
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
  

    fetch("http://localhost:8080/api/materia", requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {
         
        }
      })
     
  }, [showModalDel,showModalCreate,showModalEdit]);
    return(
        <>
        <div className="container">
            <div class="row justify-content-center align-items-center g-2">
            <h3>Administracion de Materias</h3>
                <div className="col-2 ">  
                  <button onClick={handleShowCreate} className="btn btn-dark"  >Agregar Materia
                  </button>
                </div>
                <div className="col-4 offset-4">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Buscar por Materia"
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                        <span className="btn btn-dark">Buscar</span>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col-2">ID</th>
                        <th scope="col-2">Materia</th>
                        <th scope="col-2">Profesor</th>
                        <th scope="col-2">Curso</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((materia, index) => (
                        <tr key={index}>
                            <td>{materia.id_materia}</td>
                            <td>{materia.MATERIA}</td>
                            <td>{materia.nombre}, {materia.apellido}</td>
                            <td>{materia.CURSO}</td>
                            <td>
                              <div className="btn-group" role="group" aria-label="Basic example">
                              <button type="button" onClick={() => handleShowEdit(materia.id_materia)} className="btn btn-dark">Editar</button>
       
                                          <button onClick={() => handleShowDel(materia.id_materia)} type="button" className="btn btn-dark">Borrar</button>
                                          </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModalEdit || showModalCreate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showModalEdit ? 'Editar Materia' : 'Crear Materia' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {showModalEdit ? <FormEditMateria data={materiaAEditar} handleClose={handleClose} /> : <FormCrearMateria handleClose={handleClose} />}
                </Modal.Body>
            </Modal>

            <Modal show={showModalDel} onHide={handleCloseDel}>

          <Modal.Body >
     

            <div className='container  text-center '>
              <strong>¿Está seguro que desea eliminar esta materia?</strong>
              <div className='row  '>
                <div className='col'> <button onClick={handleSubmit} className="btn btn-danger">Eliminar</button></div>
                <div className='col offset-1'> <button className="btn btn-dark" variant="secondary" onClick={handleCloseDel}>
                  Cancelar
                </button></div>
              </div>




            </div>

          </Modal.Body>

        </Modal>

        </div>
        </>
    )


}
export default TablaMaterias;