import React, { useState, useEffect } from 'react';

const HomeGradeInsert = () => {
    const tokenData = localStorage.getItem('token');
    const token = tokenData ? JSON.parse(tokenData).token : null;

    const [formData, setFormData] = useState({
        nome: '',
        data_inicio: '',
        data_conclusao: '',
        link_acesso: '',
        treinamento_id: '',
    });

    const [treinamentos, setTreinamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [noTreinamentos, setNoTreinamentos] = useState(false);

    useEffect(() => {
        const fetchTreinamentos = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/treinamento/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar treinamentos');
                }

                const data = await response.json();
                if (data.length === 0) {
                    setNoTreinamentos(true);
                } else {
                    setTreinamentos(data);
                    setNoTreinamentos(false);
                }
            } catch (error) {
                console.error('Erro ao buscar treinamentos:', error);
            }
        };

        fetchTreinamentos();
    }, [token]);

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/turma`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
    
            
            const responseText = await response.text(); 
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (error) {
                throw new Error('Resposta do servidor não é um JSON válido');
            }
            if (!response.ok) {

                if (response.status === 500) {
                    throw new Error('Erro no servidor');
                } else if (response.status === 400 && responseData.error) {

                    throw new Error(responseData.error);
                } else {
                    throw new Error('Erro desconhecido ao salvar a turma');
                }
            }
    
            setMessage('Turma salva com sucesso!');
            setFormData({
                nome: '',
                descricao: '',
                data_inicio: '',
                data_conclusao: '',
                link_acesso: '',
                treinamento_id: '',
            });
        } catch (error) {
            console.log(error)
            console.error('Erro ao salvar a turma:', error);
            setMessage('Falha ao salvar a turma: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Inserir Turma</h1>
            {noTreinamentos ? (
                <p>Não há treinamentos disponíveis. Por favor, inclua novos treinamentos para continuar o procedimento.</p>
            ) : (
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
                        <label htmlFor="data_inicio">Data Início:</label>
                        <input
                            type="date"
                            id="data_inicio"
                            name="data_inicio"
                            value={formData.data_inicio}
                            onChange={handleChange}
                            required
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                    <div>
                        <label htmlFor="data_conclusao">Data Conclusão:</label>
                        <input
                            type="date"
                            id="data_conclusao"
                            name="data_conclusao"
                            value={formData.data_conclusao}
                            onChange={handleChange}
                            required
                            placeholder="YYYY-MM-DD"
                        />
                    </div>
                    <div>
                        <label htmlFor="link_acesso">Link Acesso:</label>
                        <input
                            type="text"
                            id="link_acesso"
                            name="link_acesso"
                            value={formData.link_acesso}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="treinamento_id">Treinamento:</label>
                        <select
                            id="treinamento_id"
                            name="treinamento_id"
                            value={formData.treinamento_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione um treinamento</option>
                            {treinamentos.map((treinamento) => (
                                <option key={treinamento.id} value={treinamento.id}>
                                    {treinamento.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default HomeGradeInsert;
