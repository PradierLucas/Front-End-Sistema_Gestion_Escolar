import { useState, useEffect } from 'react';

const FormEditMateria = ({ data, handleClose }) => {
    const [item, setItem] = useState({});
    const id_materia = data.id_materia;

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
        fetch('http://localhost:8080/api/curso/nombres', requestOptions)
            .then(response => response.json())
            .then(curso => {
                setCursos(curso); // Actualiza el estado con las opciones obtenidas del servidor
            })
            .catch(error => {
                console.error('Error al obtener las opciones de cursos:', error);
            });


        // Reemplaza la URL con la que corresponda a tu API
        fetch('http://localhost:8080/api/profesor', requestOptions)
            .then(response => response.json())
            .then(profes => {
                setProfe(profes); // Actualiza el estado con las opciones obtenidas del servidor
            })
            .catch(error => {
                console.error('Error al obtener profesores:', error);
            });

    }, []);

    useEffect(() => {
        if (data) {
            setItem({
                MATERIA: data.MATERIA || '',
                id_materia: data.id_materia || '',
                nombre: data.nombre || '',
                id_usuario: data.id_usuario || '',
                id_curso: data.id_curso || '',
            });
        }
    }, [data]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/materia/${id_materia}`, {
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
            <div className='container text-center'>
            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="MATERIA"><h4>Materia</h4></label>
                                <input
                                    type="text"
                                    id="MATERIA"
                                    name="MATERIA"
                                    className="form-control"
                                    value={item.MATERIA}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-floating">
                                <select
                                    required
                                    id="id_usuario"
                                    name='id_usuario'
                                    className="form-select"
                                    value={item.id_usuario}
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
                                    value={item.id_curso}
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

                            <button type="submit" className="btn btn-primary">Editar</button>
                        </form>
                    </div>
                </div>
            </div></>
    );
};

export default FormEditMateria;
