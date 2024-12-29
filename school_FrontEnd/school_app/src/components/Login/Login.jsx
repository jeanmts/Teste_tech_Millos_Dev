import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', JSON.stringify({token: data.token}));
        if(data.role === "aluno"){
          
        }else{
          navigate('/admin/');
        }
      
      } else {
        setErrorMessage(data.message || 'Erro no login');
        alert("Atenção: " + data.error);
      }
    } catch (error) {
      setErrorMessage('Falha na comunicação com o servidor.');
      console.error('Erro de conexão:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div>
        <label htmlFor="login">Login:</label> {}
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </div>
  );
};

export default Login;
