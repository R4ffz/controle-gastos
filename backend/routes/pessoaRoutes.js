const express = require("express");
const router = express.Router();
const Pessoa = require("../models/Pessoa");
const Transacao = require("../models/Transacao");

// Criar uma nova pessoa
router.post("/", async (req, res) => {
    try {
        const { nome, idade } = req.body;
        const novaPessoa = new Pessoa({ nome, idade });
        await novaPessoa.save();
        res.status(201).json(novaPessoa);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar pessoa." });
    }
});

// Listar todas as pessoas
router.get("/", async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        res.json(pessoas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pessoas." });
    }
});

// Deletar uma pessoa e suas transações associadas
router.delete("/:id", async (req, res) => {
    try {
        const pessoa = await Pessoa.findById(req.params.id);
        if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada." });

        await Transacao.deleteMany({ pessoa: pessoa._id });
        await pessoa.deleteOne();

        res.json({ message: "Pessoa e suas transações foram removidas" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar pessoa." });
    }
});

//  Consulta de Totais
router.get("/totais", async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        const totais = [];

        for (const pessoa of pessoas) {
            const transacoes = await Transacao.find({ pessoa: pessoa._id });

            const totalReceitas = transacoes
                .filter(t => t.tipo === "receita")
                .reduce((sum, t) => sum + t.valor, 0);

            const totalDespesas = transacoes
                .filter(t => t.tipo === "despesa")
                .reduce((sum, t) => sum + t.valor, 0);

            totais.push({
                nome: pessoa.nome,
                totalReceitas,
                totalDespesas,
                saldo: totalReceitas - totalDespesas
            });
        }

        const totalGeralReceitas = totais.reduce((sum, t) => sum + t.totalReceitas, 0);
        const totalGeralDespesas = totais.reduce((sum, t) => sum + t.totalDespesas, 0);

        res.json({
            pessoas: totais,
            totalGeralReceitas,
            totalGeralDespesas,
            saldoGeral: totalGeralReceitas - totalGeralDespesas
        });
    } catch (error) {
        console.error("❌ Erro ao calcular totais:", error);
        res.status(500).json({ error: "Erro ao calcular totais." });
    }
});

module.exports = router;
