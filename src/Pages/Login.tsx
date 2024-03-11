import React, { useState } from 'react';
import firebase from '../Config/firebase';
import { login } from '../Services/authServices';
import Home from '../Pages/Home';

function Login() {
  const [formData, setFormData] = useState({ correo: '', clave: '' });
  const [errors, setErrors] = useState({ correo: '', clave: '' });
  const [loginSuccess, setLoginSuccess] = useState(false); // State for tracking login success

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
      email
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation
    let errorsObj = {};
    if (!formData.correo.trim()) {
      errorsObj.correo = 'El campo es obligatorio';
    } else if (!validateEmail(formData.correo)) {
      errorsObj.correo = 'Formato de correo no válido';
    }
    if (!formData.clave.trim()) {
      errorsObj.clave = 'El campo es obligatorio';
    }

    if (Object.keys(errorsObj).length === 0) {
      // No errors, attempt login
      firebase.auth().signInWithEmailAndPassword(formData.correo, formData.clave)
        .then((userCredential) => {
          // Signed in successfully
          console.log(userCredential.user);
          setLoginSuccess(true); // Set login success state to true
        })
        .catch((error) => {
          // Handle errors
          console.error(error.message);
          setErrors({ clave: 'La contraseña es incorrecta' }); // Display error message
        });
    } else {
      setErrors(errorsObj);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Render Home component if login is successful
  if (loginSuccess) {
    return <Home />;
  }

  // Render the login form otherwise
  return (
    <>
        <h2 className={login.title}>Ingresar</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="correo" className="form-label">
                Email
            </label>
            <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Enter email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
            />
        
            </div>

            <div className="mb-3">
            <label htmlFor="clave" className="form-label">
                Password
            </label>
            <input
                type="password"
                className="form-control"
                id="clave"
                placeholder="Password"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
            />
            </div>
            <button type="submit" className="btn btn-primary">
            Ingresar
            </button>
            {errors.clave && <p className="text-danger">{errors.clave}</p>}
        </form>
    </>
  );
}

export default Login;
