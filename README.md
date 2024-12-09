# Api de gerenciamento de vagas de emprego

Api de gerenciamento de vagas de emprego, construído para fins de estudo.

## Tecnologias usadas

Neste projeto foi usado Node.JS com Express, Typeorm com postgreSQL para gerenciamento do banco de dados, Json Web Token para autenticação e Swagger para realizar a documentação dos endpoints.

## Como rodar o projeto

- Após baixar o projeto, abra o terminal e execute "npm start" para instalar as dependências..
- Na pasta raiz do projeto crie um arquivo .env e preencha com as variáveis de ambiente do arquivo .env-example.txt e seus respectivos valores.
- Após configurar e iniciar o servidor de banco de dados, abra o terminal na pasta raiz do projeto e execute o comando "npm run dev".

## Informações gerais

A documentação da api está disponível no endpoint /api-docs/#/

Existem 3 tipos de usuários: Admin, Recruiter e Candidate. Cada usuário possui permissões específicas dentro do projeto (Listado abaixo).

##### Candidate

- Visualizar vaga específica/lista de todas as vagas
- Aplicar para vaga
- Desistir da vaga

##### Recruiter

- Visualizar vaga específica/lista de vagas (incluindo lista de candidatos cadastrados em cada vaga)
- Cadastrar vaga
- Atualizar vaga

##### Admin

- Todas as permissões do recruiter
- Excluir vaga do banco de dados
- Visualizar todos os usuários cadastrados
- Cadastrar habilidade no banco de dados
