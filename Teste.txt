Desenvolver uma aplicação WEB composta de um front-end e um
backend.
Para o back-end deve ser utilizado uma arquitetura WEB + API
utilizando Python 3.9 ou superior com os Frameworks Django e Django Rest
Framework.
Para o front-end pode ser utilizado uma das estratégias abaixo:
1. Utilização de Templates html no Django;
2. Utilização de frameworks de front-end como Angular, React entre
outros. Sendo essa a opção preferencial. 


ESCOPO DO PROJETO
Desenvolver uma aplicação de gestão de sala de aula onde o
administrador possa cadastrar os treinamentos, turmas e recursos. E o aluno
possa acessar para sua visualização.
1 Estrutura de dados
1.1 Treinamento
• Nome
• Descrição
1.2 Turma
• Treinamento
• Nome
• Data de início
• Data de conclusão
• Link de acesso
1.3 Recursos
• Turma
• Tipo de recurso (vídeo, arquivo pdf, arquivo zip)
• Acesso prévio? (Sim ou não)
• Draft? (Sim ou não)
• Nome do recurso
• Descrição do recurso
1.4 Aluno
• Nome
• E-mail
• Telefone
1.5 Matrícula
• Turma
• Aluno
2 Regras de negócio
1. No painel do aluno aparecerão a listagem dos treinamentos e
turmas dos quais o aluno está matriculado
2. Antes da data de início da turma, os alunos só poderão acessar os
recursos marcados como “Acesso prévio”
3. Após a data de início da turma os alunos só poderão acessar os
recursos que não estiverem marcados como Draft
4. Quando o tipo de recurso for vídeo o sistema deve exibir como um
player de vídeo e ter uma opção de download
5. Ao realizar o upload dos arquivos os mesmos devem ser
armazenados externamente (em um Google Drive, Amazon S3
entre outros)
6. Todos os uploads e downloads devem ser realizados por intermédio
do back-end, de forma que o administrador/aluno não tenha acesso
aos itens seguros como claves e token de API dos serviços
integrados.
7. Regras de segurança devem ser implementadas para evitar que
pessoas não autorizadas acessem os dados e recursos.