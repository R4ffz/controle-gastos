require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Conectar ao banco de dados

// Importar Rotas
const pessoaRoutes = require("./routes/pessoaRoutes");
const transacaoRoutes = require("./routes/transacaoRoutes");

app.use("/pessoas", pessoaRoutes);
app.use("/transacoes", transacaoRoutes);

app.get("/", (req, res) => {
    res.send("API Funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
