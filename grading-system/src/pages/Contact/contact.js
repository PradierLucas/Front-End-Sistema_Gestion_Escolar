import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/footer/footer';


const Contact = () => {
    return (
<>
<Header></Header>
<br></br><hr></hr>
<div className='container'>
<h1>Contacto</h1>
<hr></hr><br></br>

      <p>Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros:</p>
      <br></br>
      <ul>
        <li>Correo Electrónico: info@tuempresa.com</li>
        <li>Teléfono: +123 456 789</li>
      </ul>
</div>
<br></br><br></br><br></br><br></br><br></br>
<Footer></Footer>
</>  )
}

export default Contact;