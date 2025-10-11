import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterView, setIsRegisterView] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.error_description || error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (!acceptTerms) {
        alert("Você deve aceitar os termos de uso");
        return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
      setIsRegisterView(false); // Volta para a tela de login
    }
    setLoading(false);
  };

  return (
    <div className={`auth-screen active`}>
      <div className="auth-container">
        {isRegisterView ? (
          <>
            <div className="auth-header">
              <h1>💰 Controle de Financeiro Visual Tech</h1>
              <p>Crie sua conta gratuita</p>
            </div>
            <form onSubmit={handleSignUp} className="auth-form">
              <div className="form-group">
                <label htmlFor="registerName">Nome:</label>
                <input
                  type="text"
                  id="registerName"
                  required
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email:</label>
                <input
                  type="email"
                  id="registerEmail"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Senha:</label>
                <input
                  type="password"
                  id="registerPassword"
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerConfirmPassword">Confirmar Senha:</label>
                <input
                  type="password"
                  id="registerConfirmPassword"
                  required
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    required
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Aceito os termos de uso
                </label>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <span>Carregando...</span> : <span>Criar Conta</span>}
              </button>
            </form>
            <div className="auth-footer">
              <p>
                Já tem uma conta?{' '}
                <button type="button" onClick={() => setIsRegisterView(false)} className="link-btn">
                  Faça login
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="auth-header">
              <h1>💰 Controle de Financeiro Visual Tech</h1>
              <p>Faça login para acessar sua conta</p>
            </div>
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="loginEmail">Email:</label>
                <input
                  type="email"
                  id="loginEmail"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Senha:</label>
                <input
                  type="password"
                  id="loginPassword"
                  required
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <span>Carregando...</span> : <span>Entrar</span>}
              </button>
            </form>
            <div className="auth-footer">
              <p>
                Não tem uma conta?{' '}
                <button type="button" onClick={() => setIsRegisterView(true)} className="link-btn">
                  Cadastre-se
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
