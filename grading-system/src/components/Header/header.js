import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import './header.css'
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import FormEditarUserAlumno from '../formEditar/formEditarUserAlumno';

function Header() {

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
   const handleShow = () => setShowModal(true);

const navigate = useNavigate();



    function logout() {
        sessionStorage.removeItem('token');
    
        navigate('/')
    }

    const token = sessionStorage.getItem('token')
    
    if (token !== "" && token !== null) {
        return (

        <>

            <Navbar collapseOnSelect expand="lg">  
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
                    <Nav >

                        <ul className="nav nav-underline ul ">
                            <NavDropdown title="Usuario" id="basic-nav-dropdown">
                                 <NavDropdown.Item href="#action/3.2"><button onClick={handleShow} className="  btn btn-light" to="/">Editar información</button> 

                                </NavDropdown.Item> 
                                <NavDropdown.Item href="#action/3.1"><button onClick={logout} className="  btn  btn-light " to="/">Cerrar Sesión</button></NavDropdown.Item>


                            </NavDropdown>


                        </ul>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            <Modal show={showModal} onHide={handleClose}>

                <Modal.Body>

                <FormEditarUserAlumno handleClose={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>

         </>
    )}
    else{
        return (

            <div className="container-fluid header">
    
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Toggle aria-controls="r1onsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
                        <Nav >
    
                            <ul className="nav nav-underline ul ">
                                <li className="nav-item"><NavLink className="nav-link " to="/">Inicio</NavLink></li>
                           
                                <li className="nav-item"><NavLink className="nav-link " to="/About">Sobre Nosotros</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link " to="/Contact">Contacto</NavLink></li>
                               
    
    
    
    
    
                            </ul>
    
                        </Nav>
    
                    </Navbar.Collapse>
                </Navbar>
               
    
              </div>
              );
    }


}

export default Header






