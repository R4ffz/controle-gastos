import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function PessoaForm({ addPessoa }) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome && idade) {
      addPessoa({ nome, idade: parseInt(idade) });
      setNome("");
      setIdade("");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group>
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Idade</Form.Label>
        <Form.Control
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Cadastrar Pessoa
      </Button>
    </Form>
  );
}

export default PessoaForm;
