import React, { useEffect } from 'react';
import { useState } from 'react';

import DataUser from '../datosUser';



const DashboardAlumno = () => {




 

  const {data} = DataUser()
  const id_user = data.id_usuario;

  const [nota, setNota] = useState([]);

  useEffect(function () {

    let parametros = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
    }



    fetch(`http://localhost:8080/api/nota/alumno/${id_user}`, parametros)
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json()
      .then(body => {
        setNota(body);
      });
  })
  .catch(error => {
    console.log('Fetch error:', error);
  });



  },[id_user])


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = nota.filter((item) =>
    item.nombre[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const promedioColumna = filteredData.map(datos => {
    // Filtrar las notas no nulas ni 0
    const notasValidas = [datos.periodo_1, datos.periodo_2, datos.periodo_3].filter(nota => nota !== 0 && nota !== null);

    // Calcular el promedio solo con las notas válidas
    const promedio = (notasValidas.reduce((total, nota) => total + nota, 0) / notasValidas.length).toFixed(2);

    return {
        materia: datos.nombre,
        nota1: datos.periodo_1,
        nota2: datos.periodo_2,
        nota3: datos.periodo_3,
        promedio: promedio
    };
});




  return (
    <>
      <hr></hr>
      <div>
        <h2>DASHBOARD ALUMNO</h2>

      </div>
      <br></br>

      <br></br> <br></br>

      <p>Escriba el nombre de la materia que desea informarse</p>
      <div className="container col-6">
        <form className="d-flex" role="search">

          <input className="form-control me-2"
            type="text"
            placeholder="Materia"

            onChange={handleSearch}
            value={searchTerm}
          />
          <span className="btn btn-dark" >Buscar</span>
        </form>
      </div>
      <br></br>
      <div className="container item">

        <table class="table table-striped">
          <thead>

            <tr>
              <th scope="col">Materia</th>
              <th scope="col">1° Trimetre</th>
              <th scope="col">2° Trimestre</th>
              <th scope="col">3° Trimestre</th>
              <th scope="col">Promedio</th>
            </tr>

          </thead>

          {promedioColumna.map(datos => (
            <tbody>
              <tr >

                <td>{datos.materia}</td>
                <td>{datos.nota1}</td>
                <td>{datos.nota2}</td>
                <td>{datos.nota3}</td>
                <td>{datos.promedio}</td>


              </tr>

            </tbody>))}
        </table>


      </div>


      <br></br>





    </>
  );
}



export default DashboardAlumno;






 
