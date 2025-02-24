import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
            <Card className="text-center shadow-lg p-4" style={{ width: '50%' }}>
                <Card.Body>
                    <Card.Title className="fs-2 fw-bold">Controle de Gastos</Card.Title>
                    <Card.Text className="fs-5 text-muted">
                        Gerencie suas receitas e despesas de forma eficiente.
                    </Card.Text>
                    <div className="d-flex flex-column gap-3">
                        <Link to="/cadastro-pessoas">
                            <Button variant="primary" size="lg" className="w-100">Cadastro de Pessoas</Button>
                        </Link>
                        <Link to="/cadastro-transacoes">
                            <Button variant="success" size="lg" className="w-100">Cadastro de Transações</Button>
                        </Link>
                        <Link to="/consulta-totais">
                            <Button variant="dark" size="lg" className="w-100">Consulta de Totais</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
