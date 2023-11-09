import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { rol } = useParams();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("http://localhost:8080/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then(res => {
        return res.json()
          .then(body => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body
            };
          })

      }).then(
        (result) => {
          if (result.ok) {
            sessionStorage.setItem('token', result.body.accessToken);

            navigate('/dashboard')
            toast.success("Bienvenido", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

          } else {
            toast.error('Email o Password incorrectos', {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      ).catch(
        (error) => {
          toast.error('Email o Password incorrectos', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
  }



  return (
    <>
      <br></br>
      <div className='container text-center'>
        <h2>Iniciar Sesión {rol}</h2>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingrese su email"
                  value={user.email}
                  onChange={handleInputChange}
                  name="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingrese su contraseña"
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
