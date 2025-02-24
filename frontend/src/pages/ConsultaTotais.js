import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const ConsultaTotais = () => {
    const [totais, setTotais] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/pessoas/totais")
            .then(response => setTotais(response.data))
            .catch(error => console.error("Erro ao buscar totais:", error));
    }, []);

    if (!totais) return <p>Carregando totais...</p>;

    return (
        <Container>
            <h2 className="mt-4">Consulta de Totais</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Total de Receitas</th>
                        <th>Total de Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {totais.pessoas.map((pessoa, index) => (
                        <tr key={index}>
                            <td>{pessoa.nome}</td>
                            <td>R$ {pessoa.totalReceitas.toFixed(2)}</td>
                            <td>R$ {pessoa.totalDespesas.toFixed(2)}</td>
                            <td>R$ {pessoa.saldo.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3 className="mt-4">Totais Gerais</h3>
            <Table striped bordered>
                <tbody>
                    <tr>
                        <td><strong>Total de Receitas</strong></td>
                        <td>R$ {totais.totalGeralReceitas.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Total de Despesas</strong></td>
                        <td>R$ {totais.totalGeralDespesas.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td><strong>Saldo Geral</strong></td>
                        <td>R$ {totais.saldoGeral.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default ConsultaTotais;
