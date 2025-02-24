import React, { useState, useEffect } from "react";
import axios from "axios";

const TransacaoForm = ({ onTransacaoAdicionada }) => {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("receita");
    const [pessoaId, setPessoaId] = useState("");
    const [pessoas, setPessoas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/pessoas")
            .then(response => setPessoas(response.data))
            .catch(error => console.error("Erro ao buscar pessoas:", error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/transacoes", {
                descricao,
                valor: parseFloat(valor),
                tipo,
                pessoa: pessoaId,
            });

            console.log("✅ Transação cadastrada:", response.data);

            if (onTransacaoAdicionada) {
                onTransacaoAdicionada(response.data);
            } else {
                console.error("❌ Erro: onTransacaoAdicionada não está definida.");
            }

            setDescricao("");
            setValor("");
            setTipo("receita");
            setPessoaId("");
        } catch (error) {
            console.error("❌ Erro ao cadastrar transação:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)} 
                    required 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Valor</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={valor} 
                    onChange={(e) => setValor(e.target.value)} 
                    required 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Pessoa</label>
                <select className="form-control" value={pessoaId} onChange={(e) => setPessoaId(e.target.value)}>
                    <option value="">Selecione uma pessoa</option>
                    {pessoas.map((pessoa) => (
                        <option key={pessoa._id} value={pessoa._id}>{pessoa.nome}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Adicionar Transação</button>
        </form>
    );
};

export default TransacaoForm;
