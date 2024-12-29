import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeTraining = () => {
    const tokenData = localStorage.getItem('token');
    const token = tokenData ? JSON.parse(tokenData).token : null;
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/treinamento/`, {
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
        navigate('/admin/modules/training/insert');
    };

    return (
        <div>
            <h1>Home Training</h1>
            <button onClick={handleCreateTraining}>Cadastrar Treinamento</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
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
                                <td>{training.descricao}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HomeTraining;
