import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim().toLowerCase(), 
        password 
      });
      
      if (error) {
        setError(getErrorMessage(error.message));
      } else if (data.user) {
        setMessage('Login realizado com sucesso!');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validações
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    
    if (!acceptTerms) {
      setError("Você deve aceitar os termos de uso");
      return;
    }
    
    if (!name.trim()) {
      setError("Nome é obrigatório");
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { 
          data: { 
            name: name.trim(),
            full_name: name.trim()
          } 
        },
      });
      
      if (error) {
        setError(getErrorMessage(error.message));
      } else if (data.user) {
        setMessage('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
        setIsRegisterView(false);
        // Limpar formulário
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAcceptTerms(false);
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    }
    
    setLoading(false);
  };

  const getErrorMessage = (error) => {
    const errorMessages = {
      'Invalid login credentials': 'Email ou senha incorretos',
      'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
      'User already registered': 'Este email já está cadastrado',
      'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres',
      'Invalid email': 'Email inválido',
      'Signup requires a valid password': 'Senha inválida'
    };
    
    return errorMessages[error] || error;
  };

  const resetForm = () => {
    setError('');
    setMessage('');
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setAcceptTerms(false);
  };

  const toggleView = () => {
    setIsRegisterView(!isRegisterView);
    resetForm();
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-pattern"></div>
      </div>
      
      <div className="auth-content">
        <Card className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">💰</div>
              <div className="logo-text">
                <h1 className="logo-title">Financeiro</h1>
                <p className="logo-subtitle">Visual Tech</p>
              </div>
            </div>
            <h2 className="auth-title">
              {isRegisterView ? 'Crie sua conta' : 'Bem-vindo de volta'}
            </h2>
            <p className="auth-subtitle">
              {isRegisterView 
                ? 'Comece a controlar suas finanças hoje mesmo' 
                : 'Faça login para acessar seu painel financeiro'
              }
            </p>
          </div>

          {/* Messages */}
          {error && (
            <Message 
              severity="error" 
              text={error} 
              className="auth-message"
              style={{ marginBottom: '20px' }}
            />
          )}
          {message && (
            <Message 
              severity="success" 
              text={message} 
              className="auth-message"
              style={{ marginBottom: '20px' }}
            />
          )}

          {/* Form */}
          <form onSubmit={isRegisterView ? handleSignUp : handleLogin} className="auth-form">
            {isRegisterView && (
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <InputText 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="form-input"
                  placeholder="Digite seu nome completo"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <InputText 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="form-input"
                placeholder="Digite seu email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <Password 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                feedback={false} 
                toggleMask 
                className="form-input"
                placeholder="Digite sua senha"
                inputStyle={{ width: '100%' }}
              />
            </div>

            {isRegisterView && (
              <>
                <div className="form-group">
                  <label className="form-label">Confirmar Senha</label>
                  <Password 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    feedback={false} 
                    toggleMask 
                    className="form-input"
                    placeholder="Confirme sua senha"
                    inputStyle={{ width: '100%' }}
                  />
                </div>
                
                <div className="form-checkbox">
                  <Checkbox 
                    inputId="acceptTerms" 
                    checked={acceptTerms} 
                    onChange={e => setAcceptTerms(e.checked)} 
                    required 
                  />
                  <label htmlFor="acceptTerms" className="checkbox-label">
                    Aceito os <a href="#" className="terms-link">termos de uso</a> e <a href="#" className="terms-link">política de privacidade</a>
                  </label>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              label={isRegisterView ? "Criar Conta" : "Entrar"} 
              className="auth-submit-btn"
              loading={loading}
              style={{ width: '100%', marginTop: '20px' }}
            />
          </form>

          <Divider />

          <div className="auth-footer">
            <p className="auth-switch-text">
              {isRegisterView ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            </p>
            <Button 
              label={isRegisterView ? "Fazer Login" : "Criar Conta"} 
              className="auth-switch-btn"
              onClick={toggleView}
              text
            />
          </div>
        </Card>
      </div>
    </div>
  );
}