import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { PersonaService } from '../PersonaAPI';

function Login() {
  const [user, setAllUsers] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getUser().then(data =>  {
      setAllUsers(data);
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setAllUsers]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = user.find(user => user.username === email && user.password === password);
    
    if (users) {
      setSuccessMessage('Ingreso exitoso');
      setErrorMessage('');
      console.log(users);
      setTimeout(() => {
        navigate('admin/*'); // Navega a la página de inicio
      }, 1000);
    } else {
      setErrorMessage('Correo electrónico o contraseña incorrectos');
      setSuccessMessage('');
    }
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="nombre@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Tu Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login-options">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p className="signup-link">¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
