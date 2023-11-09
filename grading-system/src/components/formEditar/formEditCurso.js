import React, { useState, useEffect} from 'react';

const FormEditCurso = ({curso, handleClose }) => {
    const [item, setItem] = useState({});
    const id_curso = curso.id_curso;

    useEffect(() => {
        if (curso) {
            setItem({
                id_curso: curso.id_curso || '',
                nombre: curso.nombre || '',
            });
        }
    }
    , [curso]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
        
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/curso/${id_curso}`, {
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
                }
            })
            .catch((error) => {
                console.error('Error de red:', error);
            });
    };


    return (
        <>

<div className='container text-center'><h3>Editar Curso</h3></div> 
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">

                        <form onSubmit={handleSubmit}>
             

                              <div className="form-group">
                                <label htmlFor="Nombre"><h4>Nombre</h4></label>
                                <input
                                    type="text"
                                    id="Nombre"
                                    name="nombre"
                                    className="form-control"
                                    value={item.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
            
                            <button type="submit" className="btn btn-primary">Editar</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
    );
};

export default FormEditCurso
