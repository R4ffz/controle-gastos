const mongoose = require("mongoose");

const TransacaoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    tipo: { type: String, enum: ["receita", "despesa"], required: true },
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: "Pessoa", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Transacao", TransacaoSchema);
