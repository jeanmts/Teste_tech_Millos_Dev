import React, { useState } from 'react';

const HomeTrainingInsert = () => {
    const tokenData = localStorage.getItem('token');
    const token = tokenData ? JSON.parse(tokenData).token : null;
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/treinamento/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar o treinamento');
            }

            const data = await response.json();
            setMessage('Treinamento salvo com sucesso!');

            setFormData({ nome: '', descricao: '' });
        } catch (error) {
            console.error('Erro ao salvar o treinamento:', error);
            setMessage('Falha ao salvar o treinamento. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Inserir Treinamento</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default HomeTrainingInsert;
