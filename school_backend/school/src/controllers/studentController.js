const pool = require("../services/connection");


const listTrainingAndClasses = async (req, res) => {
    const { nome } = req.body; 
  
    try {
      const queryStudent = `
      SELECT id 
      FROM alunos 
      WHERE TRIM(LOWER(nome)) = TRIM(LOWER($1))
    `;
    
      const paramsStudent = [nome];
      const { rows: studentRows } = await pool.query(queryStudent, paramsStudent);
  
      if (studentRows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado." });
      }

      const id_aluno = studentRows[0].id;
  
      const query = `
        SELECT 
          t.nome AS treinamento,
          t.descricao AS treinamento_descricao,
          turma.nome AS turma,
          turma.data_inicio,
          turma.data_conclusao,
          turma.link_acesso,
          r.nome AS recurso,
          r.descricao AS recurso_descricao,
          r.tipo_recurso,
          r.acesso_previo,
          r.draft
        FROM 
          matriculas m
        INNER JOIN 
          turmas turma ON m.id_turma = turma.id
        INNER JOIN 
          treinamentos t ON turma.id_treinamento = t.id
        LEFT JOIN 
          recursos r ON r.id_turma = turma.id
        WHERE 
          m.id_aluno = $1
      `;
  
      const params = [id_aluno];
      const { rows } = await pool.query(query, params);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Nenhuma turma ou treinamento encontrado para este aluno." });
      }
  
      const dataAtual = new Date();
  
      const recursosFiltrados = rows.map((item) => {
        const recursoPermitido =
          dataAtual < new Date(item.data_inicio) ? item.acesso_previo : !item.draft;
  
        if (recursoPermitido) {
          return {
            treinamento: item.treinamento,
            treinamento_descricao: item.treinamento_descricao,
            turma: item.turma,
            data_inicio: item.data_inicio,
            data_conclusao: item.data_conclusao,
            link_acesso: item.link_acesso,
            recurso: item.recurso,
            recurso_descricao: item.recurso_descricao,
            tipo_recurso: item.tipo_recurso,
          };
        }
        return null;
      }).filter(Boolean);
  
      res.status(200).json(recursosFiltrados);
    } catch (error) {
      console.error("Erro ao listar treinamentos e turmas:", error.message);
      res.status(500).json({ message: "Erro ao listar treinamentos e turmas.", error: error.message });
    }
  };
  

module.exports = { listTrainingAndClasses };


