import { useFetch } from "../../useFetch";

const TablaPrueba = () => {

  const { data } = useFetch("http://localhost:8080/api/materia");


  return (
    <>
      <h2>Tabla de prueba</h2>
      <ul>
        {data?.map((materia) => (
          <li key={materia.id}>
            {materia.nombre}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TablaPrueba;
