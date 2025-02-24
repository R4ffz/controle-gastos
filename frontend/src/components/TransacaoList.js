import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const TransacaoList = ({ atualizar }) => {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    carregarTransacoes();
  }, [atualizar]);

  const carregarTransacoes = () => {
    axios.get("http://localhost:5000/transacoes")
      .then(response => setTransacoes(response.data))
      .catch(error => console.error("Erro ao carregar transações:", error));
  };

  const deletarTransacao = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      try {
        await axios.delete(`http://localhost:5000/transacoes/${id}`);
        carregarTransacoes();
      } catch (error) {
        console.error("Erro ao excluir transação:", error);
      }
    }
  };

  return (
    <Table striped bordered hover>
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
        {transacoes.map((transacao) => (
          <tr key={transacao._id}>
            <td>{transacao.descricao}</td>
            <td>R$ {transacao.valor.toFixed(2)}</td>
            <td>{transacao.tipo}</td>
            <td>{transacao.pessoa.nome}</td>
            <td>
              <Button variant="danger" onClick={() => deletarTransacao(transacao._id)}>
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransacaoList;
