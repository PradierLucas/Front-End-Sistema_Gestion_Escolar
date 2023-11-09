import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './pages/Contact/contact';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormCrearUsuario from './components/formCrear/formCrearUsuario';
import EditUser from './components/formEditar/formEditarUser';
import FormEditMateria from './components/formEditar/formEditMateria';
import FormEditCurso from './components/formEditar/formEditCurso';
import FormEditarNota from './components/formEditar/formEditarNota';
import FormCrearNota from './components/formCrear/formCrearNota';
//import Dashboard2 from './components/Dashboard/Dashboard2'
//import Usuarios from './components/Dashboard/Usuarios';
//import Cursos from './components/Dashboard/Cursos';


function App() {

 
  return (
    <div className="App container">
     
    <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/login/:rol`}  element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/cursos" element={<Cursos/>} /> */}
        {/* <Route path="/dashboard2" element={<Dashboard2 />} /> */}
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/not-found" element={<h1>Not Found</h1>} />
        <Route path="/crearUsuario" element={<FormCrearUsuario />} />
        <Route path={`/dashboard/editUser/:id_usuario`} element={<EditUser />} />
        <Route path={`/dashboard/editMateria/:id_materia`} element={<FormEditMateria />} />
        <Route path={`/dashboard/editCurso/:id_curso`} element={<FormEditCurso />} />
        <Route path={`/dashboard/editarNota/:id_materia/:id_usuario`} element={<FormEditarNota />} />
        <Route path={`/dashboard/crearNota/:id_materia/:id_usuario/:apellido`} element={<FormCrearNota />} />
      </Routes>
    </div>
  );
}

export default App;
