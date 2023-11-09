
import './Dashboard.css';
import DashboardAlumno from '../DashboardAlumno/DashboardAlumno';
import DashProfesor from '../DashProfesor/DashProfesor';
import Header from '../Header/header';
import TablaUsuarios from '../Tablas/TablaUsuarios';
import Footer from '../footer/footer';
import TablaMaterias from '../Tablas/TablaMaterias';
import TablaCursos from '../Tablas/TablaCursos';
import DataUser from '../datosUser';


const DashboardUser = () => {

//Obtenemos la informacion del usuario a traves del token
const {data} = DataUser()


  let rol = data.id_rol

  console.log('Rol:', rol);

  const userName = [data.nombre , " ", data.apellido];

 if(rol===1){

  return (
    <>
      <Header></Header>

      <br></br><h3>Bienvenid@ {userName} !</h3><br></br>
      <div class="container text-center ">
        <h3>Seleccione que desea administrar</h3>
      <br></br>
        <div class="row justify-content-center align-items-center g-2">
          <div class="col">
            <a href="#usuarios" class="btn btn-dark">Usuarios</a>
          </div>
          <div class="col">
            <a href='#materias' class="btn btn-dark">Materias</a></div>
          <div class="col"><a href='#cursos' type="button" class="btn btn-dark">Cursos</a></div>
        </div>
      </div>
      <div className='titulo'>
      </div>
<br></br>
      <div className="container ">
        

  
      <div className="container" id="usuarios">
      <TablaUsuarios/>
      </div>
     <div className='container'  id="materias">
     <TablaMaterias/>
     </div>
      <div className='container' id="cursos">
      <TablaCursos/>
      </div>
      </div>
      






      <Footer></Footer>



    </>
  );}
 else if(rol ===2){
     return (
      <>
        <Header></Header>
        <br></br><h3>Bienvenid@ {userName} !</h3><br></br>
  
  
       <DashboardAlumno></DashboardAlumno>
    
  
  
  
     <Footer></Footer>
  
  
  
    </>
   );

}
  else if(rol===3){
    return (
      <>
       <Header></Header>
       
        
       <br></br><h3>Bienvenid@ {userName}  !</h3><br></br>
  
       
        <DashProfesor></DashProfesor>
  
  
  
         <Footer></Footer>
  
  
     </>
     );
  }else {return("Usuario incorrecto")}
}





export default DashboardUser;
