import React from 'react';
import './Home.css';
import LoginRol from '../../components/LoginRol';
import Header from '../../components/Header/header';
import Footer from '../../components/footer/footer';
import { Button } from 'react-bootstrap';
import { Typewriter} from 'react-simple-typewriter'; 

const Home = () => {
    return (
        <>
    <Header className="header" />
            <div className="hero container-fluid text-align-start justify-content-round" >
            
            <h1 id='title'>Sistema de Gestión Académica</h1>
            <div className='text'>
               <spam className='welcome'>
            {'¡Bienvenidos '}
            
               <Typewriter
                  words = {['Docentes!', 'Alumnos!', 'Administradores!']}
                    cursor
                    cursorStyle='_<'
                    cursorColor='black'
                    typeSpeed={150}
                    deleteSpeed={50}
                    delaySpeed={3000}
                    loop
                    id='typewriter'
                    />
               </spam>

                    <p>Una nueva experiencia en autogestión educativa, donde padres, alumnos y docentes pueden acceder a la información del alumno en tiempo real</p>
            </div>
           
           
            <Button className='btn-secondary ' href='#login'>Get Started!</Button>
            </div>
            <section className="container-fluid" id="login">
            <LoginRol />
            </section>
        <Footer/>
</>
            
    )
}

export default Home;