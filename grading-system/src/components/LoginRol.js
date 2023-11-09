import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconAlumno from '../Assets/icons/icon-alumno-128px.png';
import iconAdmin from '../Assets/icons/icon-administracion-128px.png';
import iconDocente from '../Assets/icons/id-card-128px.png';
import './loginRol.css';

export const rol = [
  { id: 1, name: 'Docentes', descripcion: 'Gestione las calificaciones de los alumnos', imageID: iconDocente },
  { id: 2, name: 'Alumnos', descripcion: 'Vea sus calificaciones', imageID: iconAlumno },
  { id: 3, name: 'Administracion', descripcion: 'Gestione usuarios, cursos y materias de la institución', imageID: iconAdmin }
];

const LoginRol = () => {
  const [isCardFlipped, setCardFlipped] = useState(false);

  const handleCardMouseEnter = () => {
    setCardFlipped(true);
  };

  const handleCardMouseLeave = () => {
    setCardFlipped(false);
  };

  return (
    <div className="justify-content-between">
      <h2>Ingresá según corresponda</h2>
      <div className="rol">
        <ul>
          <div className="row justify-content-center align-items-center g-2">
            {rol.map((rol) => (
              <div className="col" key={rol.id}>
                <div
                  className={`custom-card ${isCardFlipped ? 'flipped' : ''}`}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="card-inner">
                    <div className="front">
                      <img src={rol.imageID} alt={rol.name} id="card-img" />
                      <h4 className="title">{rol.name}</h4>
                    </div>
                    <div className="back">
                      <p>{rol.descripcion}</p>
                      <Link id="btn-card" to={`/login/${rol.name}`}>
                        Ingresar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default LoginRol;
