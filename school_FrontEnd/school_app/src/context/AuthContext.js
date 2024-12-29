import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    const checkSession = async () => {
      const tokenData = localStorage.getItem('token');
      const token = tokenData ? JSON.parse(tokenData).token : null;
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/validate-jwt/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); 
        } else {
          setUser(null);
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setUser(null);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};