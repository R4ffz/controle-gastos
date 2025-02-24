import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";

const CadastroPessoas = () => {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [pessoas, setPessoas] = useState([]);

    useEffect(() => {
        fetchPessoas();
    }, []);

    const fetchPessoas = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pessoas");
            setPessoas(response.data);
        } catch (error) {
            console.error("Erro ao buscar pessoas:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5000/pessoas", { nome, idade });
            setNome("");
            setIdade("");
            fetchPessoas();
        } catch (error) {
            console.error("Erro ao cadastrar pessoa:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/pessoas/${id}`);
            fetchPessoas();
        } catch (error) {
            console.error("Erro ao excluir pessoa:", error);
        }
    };

    return (
        <Container>
            <h2>Cadastro de Pessoas</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Idade</Form.Label>
                    <Form.Control
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cadastrar Pessoa
                </Button>
            </Form>

            <h3 className="mt-4">Lista de Pessoas</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map((pessoa) => (
                        <tr key={pessoa._id}>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.idade}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(pessoa._id)}
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CadastroPessoas;
