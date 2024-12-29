const pool = require("../services/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordJwt = require("../services/passwordJWT");




const registerAdmin = async(req, res) => {
    const { adminUser, password } = req.body;

    try {
        const passwordEncrypted = await bcrypt.hash(password, 10);
        const params = [adminUser, passwordEncrypted];

        const newAdmin ="insert into administrators (userAdmin, password) values ($1,$2)"
        const response = await pool.query(newAdmin, params); 

        return res.status(200).json({message: "Admin cadastrado com sucesso!"}); 
    } catch (error) {
     return   res.status(500).json({message:error.message})
    }

};

const loginAdmin = async(req, res) => {
    const { login, senha } = req.body;

    try {
        const queryAdmin = " select * from administrators where userAdmin = $1" 
        const params = [login];
        const responseAdmin = await pool.query(queryAdmin, params);

        if(responseAdmin.rowCount < 1) {
            return res.status(404).json({ message: "Usuário ou senha inválidos!" });
        }

        const passwordIsValid = await bcrypt.compare(senha, responseAdmin.rows[0].password);

        if(!passwordIsValid) {
            return res.status(404).json({ message: "Usuário ou senha inválidos!" });
  
        }
        const token = jwt.sign({ id: responseAdmin.rows[0].id }, passwordJwt, { expiresIn: "8h" });

        const { password: _, ...adminAuthenticated } = responseAdmin.rows[0];

        return res.status(200).json({ usuario: adminAuthenticated, token });
    } catch (error) {
        return   res.status(500).json({message: error.message})
    }
};


const addTraining  = async (req , res) => {

    const {nome, descricao} = req.body;
    const { authorization } = req.headers;
   
    if (!authorization) {
        return res.status(401).json({ message: "Não autorizado!" });
      }

    if(!nome || !descricao) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  
    }  

      const token = authorization.split(" ")[1];
      
      try {

        const tokenAdmin = jwt.verify(token, passwordJwt);
        const query = "insert into treinamentos (nome, descricao) values($1, $2)"
        const params = [nome, descricao];
        
        const responseQuery = await pool.query(query, params);

        return res.status(200).json({ message: "Treinamento cadastrado com sucesso!"});
    } catch (error) {
       return res.status(500).json({message: error.message});
    }


}

const getTrainings = async (req, res) => {
    try {
      const query = "SELECT * FROM treinamentos";
      const { rows } = await pool.query(query);
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

const addClasses  = async (req, res) => {

    const { nome, data_inicio, data_conclusao, link_acesso, treinamento_id} = req.body;
    const { authorization } = req.headers;


  if (!authorization) {
        return res.status(401).json({ message: "Não autorizado!" });
      }

      const token = authorization.split(" ")[1];

    try {

        const tokenUser = jwt.verify(token, passwordJwt);

    
        const query = "insert into turmas (treinamento_id, nome, data_inicio, data_conclusao, link_acesso ) values($1, $2, $3, $4, $5)"
        const params = [treinamento_id, nome, data_inicio, data_conclusao, link_acesso];
        
        const responseQuery = await pool.query(query, params);

        return res.status(200).json({ message: "Turma cadastrada com sucesso!"});
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

const getClasses = async (req, res) => {
    try {
      const query = "SELECT * FROM turmas";
      const { rows } = await pool.query(query);
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

const addResources = async (req, res) => {

    const {turma, tipo_recurso, acesso_previo, draft, nome,descricao} = req.body;
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json({ message: "Não autorizado!" });
    }

    const token = authorization.split(" ")[1];

      const queryClasses = "select * from turmas"
      const {rows} = await pool.query(queryClasses);
      
      const classesRows = rows;

      const filterClasses = classesRows.filter((classes)=>{
        return classes.nome === turma;
      });
    try {
        const tokenAdmin = jwt.verify(token, passwordJwt);

        const query = "insert into recursos (id_turma, tipo_recurso, acesso_previo, draft, nome, descricao) values ($1, $2, $3, $4, $5, $6)"
        const params= [filterClasses[0].id,  tipo_recurso,acesso_previo, draft, nome,descricao];    

        const responseQuery = await pool.query(query, params);

        return res.status(200).json({ message: "Recurso cadastrado com sucesso!"});
    } catch (error) {
      return  res.status(500).json({message: error.message})
    }
}

const getResources = async (req, res) => {
    try {
      const query = "SELECT * FROM recursos";
      const { rows } = await pool.query(query);
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


const addStudent = async (req, res) => {
    const { nome, email, telefone} = req.body;

    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const tokenUser = jwt.verify(token, passwordJwt);

    if (!authorization ||!token) {
        return res.status(401).json({ message: "Não autorizado!" });
    }

    try {
        const query = "insert into alunos(nome, email, telefone) values ($1, $2, $3)";
        const params = [nome, email, telefone];

        const responseQuery = await pool.query(query, params);

        return res.status(200).json({ message: "Aluno cadastrado com sucesso!"});

    } catch (error) {
        return  res.status(500).json({message:error.message});
    }

}
const getStudents = async (req, res) => {
  try {
    const query = "SELECT * FROM alunos";
    const { rows } = await pool.query(query);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addRegistration = async (req, res) => {
    const { turma, estudante } = req.body;
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: "Não autorizado!" });
    }
  
    try {
      const token = authorization.split(" ")[1];
      const tokenUser = jwt.verify(token, passwordJwt);
  
      if (!turma || !estudante) {
        return res.status(400).json({ message: "Turma e estudante são obrigatórios!" });
      }
  
      const queryClasses = "SELECT * FROM turmas WHERE nome = $1";
      const paramsClasses = [turma];
      const classes = await pool.query(queryClasses, paramsClasses);
  
      if (classes.rows.length === 0) {
        return res.status(404).json({ message: "Turma não encontrada!" });
      }
      const classId = classes.rows[0].id;
  
      const queryStudent = "SELECT * FROM alunos WHERE nome = $1";
      const paramsStudent = [estudante];
      const student = await pool.query(queryStudent, paramsStudent);
  
      if (student.rows.length === 0) {
        return res.status(404).json({ message: "Estudante não encontrado!" });
      }
      const studentId = student.rows[0].id;
  
      const queryInsert = "INSERT INTO matriculas (id_turma, id_aluno) VALUES ($1, $2)";
      const paramsInsert = [classId, studentId];
      await pool.query(queryInsert, paramsInsert);
  
      return res.status(200).json({ message: "Matrícula realizada com sucesso!" });
    } catch (error) {
      console.error("Erro ao realizar matrícula:", error.message);
      return res.status(500).json({ message: "Erro interno no servidor.", error: error.message });
    }
  };

  const getRegistrations = async (req, res) => {
    try {
      const query = "SELECT * FROM matriculas";
      const { rows } = await pool.query(query);
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {addClasses,
    addRegistration,
    addResources, 
    addStudent, 
    addTraining, 
    registerAdmin, 
    loginAdmin,
    getTrainings,
    getClasses,
    getResources,
    getStudents,
    getRegistrations,};