import React, { useState, useEffect } from "react";
import axios from "axios";

const CadastroTransacoes = () => {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("receita");
    const [pessoa, setPessoa] = useState("");
    const [pessoas, setPessoas] = useState([]);
    const [transacoes, setTransacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Primeiro busca as pessoas
        axios.get("http://localhost:5000/pessoas")
            .then(res => {
                setPessoas(res.data);
                return axios.get("http://localhost:5000/transacoes"); // Depois busca as transações
            })
            .then(res => {
                setTransacoes(res.data);
                setLoading(false); // Finaliza carregamento
            })
            .catch(err => {
                console.error("Erro ao buscar dados:", err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!descricao || !valor || !pessoa) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/transacoes", {
                descricao,
                valor: parseFloat(valor),
                tipo,
                pessoa
            });

            // Atualiza a lista sem precisar recarregar a página
            const pessoaNome = pessoas.find(p => p._id === pessoa)?.nome || "Desconhecido";
            setTransacoes([...transacoes, { ...response.data, pessoa: { nome: pessoaNome } }]);
            setDescricao("");
            setValor("");
            setPessoa("");
        } catch (error) {
            console.error("Erro ao cadastrar transação:", error);
        }
    };

    const deletarTransacao = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/transacoes/${id}`);
            setTransacoes(transacoes.filter(t => t._id !== id));
        } catch (error) {
            console.error("Erro ao excluir transação:", error);
        }
    };

    return (
        <div className="container">
            <h2>Cadastro de Transações</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <input type="text" className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Valor</label>
                    <input type="number" className="form-control" value={valor} onChange={e => setValor(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <select className="form-control" value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value="receita">Receita</option>
                        <option value="despesa">Despesa</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Pessoa</label>
                    <select className="form-control" value={pessoa} onChange={e => setPessoa(e.target.value)}>
                        <option value="">Selecione uma pessoa</option>
                        {pessoas.map(p => (
                            <option key={p._id} value={p._id}>{p.nome}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Adicionar Transação</button>
            </form>

            <h3 className="mt-4">Lista de Transações</h3>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Pessoa</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacoes.map(t => (
                            <tr key={t._id}>
                                <td>{t.descricao}</td>
                                <td>R$ {t.valor.toFixed(2)}</td>
                                <td>{t.tipo}</td>
                                <td>{t.pessoa?.nome || "Desconhecido"}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deletarTransacao(t._id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CadastroTransacoes;
