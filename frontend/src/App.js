import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./pages/Home";
import CadastroPessoas from "./pages/CadastroPessoas";
import CadastroTransacoes from "./pages/CadastroTransacoes";
import ConsultaTotais from "./pages/ConsultaTotais";

function App() {
  return (
    <>
      {/* Navbar Bootstrap */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Controle de Gastos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Início</Nav.Link>
              <Nav.Link as={Link} to="/cadastro-pessoas">Cadastro de Pessoas</Nav.Link>
              <Nav.Link as={Link} to="/cadastro-transacoes">Cadastro de Transações</Nav.Link>
              <Nav.Link as={Link} to="/consulta-totais">Consulta de Totais</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Container principal */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-pessoas" element={<CadastroPessoas />} />
          <Route path="/cadastro-transacoes" element={<CadastroTransacoes />} />
          <Route path="/consulta-totais" element={<ConsultaTotais />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
