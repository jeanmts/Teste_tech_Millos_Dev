import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeGrade = () => {
    const tokenData = localStorage.getItem('token');
    const token = tokenData ? JSON.parse(tokenData).token : null;
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/turma/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();
            setTrainings(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchTrainings();
    }, [fetchTrainings]);

    const handleCreateTraining = () => {
        navigate('/admin/modules/turma/insert');
    };

    return (
        <div>
            <h1>Home Turma</h1>
            <button onClick={handleCreateTraining}>Cadastrar Turma</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data Inicio</th>
                        <th>Data Conclusão</th>
                        <th>Link Acesso</th>
                        <th>Treinamento</th>
                    </tr>
                </thead>
                <tbody>
                    {trainings.length === 0 ? (
                        <tr>
                            <td colSpan="2">Nenhum treinamento encontrado</td>
                        </tr>
                    ) : (
                        trainings.map((training) => (
                            <tr key={training.id}>
                                <td>{training.nome}</td>
                                <td>{training.data_inicio}</td>
                                <td>{training.data_conclusao}</td>
                                <td> <a href={training.link_acesso} target="_blank" rel="noopener noreferrer">
                                    {training.link_acesso ? training.link_acesso : "Acessar"}
                                </a></td>
                                <td>{training.nome}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HomeGrade;
