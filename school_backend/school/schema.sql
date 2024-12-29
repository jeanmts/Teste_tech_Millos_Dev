CREATE DATABASE GESTAO_ESCOLAR;

CREATE TYPE tipo_recurso_enum AS ENUM ('video', 'pdf', 'zip');

CREATE TABLE administrators(
id SERIAL PRIMARY KEY,
userAdmin TEXT NOT NULL,
password TEXT NOT NULL
)

CREATE TABLE treinamentos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT
);

CREATE TABLE turmas (
    id SERIAL PRIMARY KEY,
    treinamento_id INT NOT NULL REFERENCES treinamentos(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    data_inicio DATE NOT NULL,
    data_conclusao DATE NOT NULL,
    link_acesso TEXT
);

CREATE TABLE recursos (
    id SERIAL PRIMARY KEY,
    id_turma INT NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    tipo_recurso tipo_recurso_enum NOT NULL,
    acesso_previo BOOLEAN NOT NULL DEFAULT FALSE,
    draft BOOLEAN NOT NULL DEFAULT FALSE,
    nome TEXT NOT NULL,
    descricao TEXT
);

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT
);

CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,
    id_turma INT NOT NULL REFERENCES turmas(id) ON DELETE CASCADE,
    id_aluno INT NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    UNIQUE (id_turma, id_aluno) -- Evitar duplicação de matrículas
);
