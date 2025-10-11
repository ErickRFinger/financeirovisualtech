import { useState, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { ThemeContext } from '../contexts/ThemeContext';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterView, setIsRegisterView] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { theme } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.error_description || error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    if (!acceptTerms) {
      setError("Você deve aceitar os termos de uso");
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setError(error.error_description || error.message);
    } else {
      setMessage('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
      setIsRegisterView(false); // Go back to login view
    }
    setLoading(false);
  };

  const AuthForm = (
    <Card bg={theme} text={theme === 'dark' ? 'light' : 'dark'} className="shadow-lg">
      <Card.Body className="p-4 p-sm-5">
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold">💰 Controle Financeiro</h1>
          <p className="text-muted">{isRegisterView ? "Crie sua conta gratuita" : "Faça login para acessar"}</p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Form onSubmit={isRegisterView ? handleSignUp : handleLogin}>
          {isRegisterView && (
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="authEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="authPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder={isRegisterView ? "Mínimo 6 caracteres" : "Sua senha"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {isRegisterView && (
            <>
              <Form.Group className="mb-3" controlId="registerConfirmPassword">
                <Form.Label>Confirmar Senha</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="acceptTerms">
                <Form.Check 
                  type="checkbox"
                  label="Aceito os termos de uso"
                  required
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              </Form.Group>
            </>
          )}

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Carregando...</>
              ) : (
                isRegisterView ? "Criar Conta" : "Entrar"
              )}
            </Button>
          </div>
        </Form>

        <div className="text-center mt-4">
          {isRegisterView ? (
            <p className="text-muted">
              Já tem uma conta?{" "}
              <Button variant="link" onClick={() => { setIsRegisterView(false); setError(''); setMessage(''); }}>
                Faça login
              </Button>
            </p>
          ) : (
            <p className="text-muted">
              Não tem uma conta?{" "}
              <Button variant="link" onClick={() => { setIsRegisterView(true); setError(''); setMessage(''); }}>
                Cadastre-se
              </Button>
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Col md={6} lg={4}>
            {AuthForm}
        </Col>
    </div>
  );
}