import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/Header/header';



const About = () => {
    return (
        <>
        <Header></Header>
        <br></br><hr></hr>
              <div className='container  '>
      <h2 className=' ' >Sobre Nosotros</h2>
      <br></br>
      <p className='fw-light'>
        Somos un equipo apasionado por la educación y la mejora continua. Nuestro sistema de calificaciones está diseñado para ayudar a los estudiantes a alcanzar su máximo potencial.
      </p>
      <p className='fw-light'>
        Nos enorgullece ofrecer una plataforma fácil de usar que brinda retroalimentación valiosa a estudiantes y profesores, fomentando un ambiente de aprendizaje positivo.
      </p>
      <br></br>
      <hr></hr>
      <br></br>
      <h3>Nuestra Misión</h3>
      <br></br>
      <p className='fw-light'>
        Nuestra misión es promover la excelencia académica al proporcionar un sistema de calificaciones transparente y justo que motive a los estudiantes a esforzarse por mejorar continuamente.
      </p>
      <br></br>
      <hr></hr>
      <br></br>
      <h3>Características Clave</h3>
      <br></br>
      <ul className='fw-light'>
        <li>Calificaciones precisas y transparentes</li>
        <li>Retroalimentación personalizada para cada estudiante</li>
        <li>Facilidad de uso para profesores y estudiantes</li>
        <li>Seguridad de datos y privacidad</li>
        <li>Soporte técnico dedicado</li>
      </ul>
      
    </div>
            <Footer></Footer>
        </>
    )
}
export default About;