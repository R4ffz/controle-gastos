# 💰 Controle de Gastos

Um sistema simples e eficiente para gerenciar receitas e despesas, proporcionando um controle financeiro intuitivo e fácil de usar.

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - React.js
  - Bootstrap
  - Axios

- **Backend:**
  - Node.js com Express
  - MongoDB com Mongoose
  - CORS para comunicação entre front e back

## 🎯 Funcionalidades

✅ Cadastro e listagem de pessoas  
✅ Registro de transações financeiras (receitas e despesas)  
✅ Cálculo de totais por pessoa e geral  
✅ Exclusão de registros  
✅ Interface responsiva e moderna  

## 🛠️ Como Configurar o Projeto

### 🔹 Clonando o Repositório

```sh
git clone https://github.com/R4ffz/controle-gastos.git
cd controle-gastos
```

### 🔹 Configurando o Backend

```sh
cd backend
npm install
```

- Criar um arquivo `.env` na pasta `backend` e configurar a conexão com o MongoDB:

```
MONGO_URI=sua_string_de_conexao_do_mongo
PORT=5000
```

- Iniciar o servidor backend:

```sh
server node.js
```

### 🔹 Configurando o Frontend

```sh
cd ../frontend
npm install
npm start
```

O frontend será aberto no navegador em `http://localhost:3000`.

## 📂 Estrutura do Projeto

```
controle_gastos/
│── backend/          # Código do servidor (Node.js, Express, MongoDB)
│── frontend/         # Interface do usuário (React.js, Bootstrap)
│── README.md         # Documentação do projeto
│── package.json      # Configuração do Node.js
```

## 🔥 Exemplo de Uso

1. Cadastrar uma pessoa
2. Registrar transações (receitas e despesas)
3. Consultar os totais e saldo geral

## 📝 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por **Rafael Barros Cabral** 🚀
