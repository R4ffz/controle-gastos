const express = require("express");
const router = express.Router();
const Transacao = require("../models/Transacao");
const Pessoa = require("../models/Pessoa");

// Criar uma nova transação
router.post("/", async (req, res) => {
    try {
        const { descricao, valor, tipo, pessoa } = req.body;

        // Verifica se a pessoa existe no banco de dados
        const pessoaExiste = await Pessoa.findById(pessoa);
        if (!pessoaExiste) {
            return res.status(404).json({ error: "Pessoa não encontrada." });
        }

        const novaTransacao = new Transacao({ descricao, valor, tipo, pessoa });
        await novaTransacao.save();
        
        res.status(201).json(novaTransacao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar transação." });
    }
});

// Listar todas as transações
router.get("/", async (req, res) => {
    try {
        const transacoes = await Transacao.find().populate("pessoa", "nome");
        res.json(transacoes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar transações." });
    }
});

// Deletar uma transação
router.delete("/:id", async (req, res) => {
    try {
        const transacao = await Transacao.findById(req.params.id);
        if (!transacao) {
            return res.status(404).json({ error: "Transação não encontrada." });
        }
        
        await transacao.deleteOne();
        res.json({ message: "Transação removida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar transação." });
    }
});

module.exports = router;
