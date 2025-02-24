import React, { useEffect, useState } from "react";
import axios from "axios";

const TransacaoList = () => {
    const [transacoes, setTransacoes] = useState([]);

    useEffect(() => {
        carregarTransacoes();
    }, []);

    const carregarTransacoes = async () => {
        try {
            const resposta = await axios.get("http://localhost:5000/transacoes");
            setTransacoes(resposta.data);
        } catch (error) {
            console.error("Erro ao carregar transações:", error);
        }
    };

    const deletarTransacao = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/transacoes/${id}`);
            setTransacoes(transacoes.filter(transacao => transacao._id !== id));
        } catch (error) {
            console.error("Erro ao excluir transação:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Transações</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.map((transacao) => (
                        <tr key={transacao._id}>
                            <td>{transacao.pessoa.nome}</td>
                            <td>{transacao.tipo}</td>
                            <td>R$ {transacao.valor.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deletarTransacao(transacao._id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransacaoList;
