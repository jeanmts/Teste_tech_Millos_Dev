import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();


  const handleModuleClick = (moduleName) => {

    navigate(`${moduleName}`);
  };

  return (
    <div className="modules-container">
      <h1>Módulos</h1>
      <div className="module" onClick={() => handleModuleClick('/admin/modules/training/')}>
        <p>Treinamento</p>
      </div>
      <div className="module" onClick={() => handleModuleClick('/admin/modules/turma/')}>
        <p>Turmas</p>
      </div>
      <div className="module" onClick={() => handleModuleClick('Recursos')}>
        <p>Recursos</p>
      </div>
      <div className="module" onClick={() => handleModuleClick('Aluno')}>
        <p>Aluno</p>
      </div>
    </div>
  );
};

export default Home;