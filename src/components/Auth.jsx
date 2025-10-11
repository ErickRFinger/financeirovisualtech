import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Message } from 'primereact/message';

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

  const header = (
    <div className="text-center">
        <img src="/LOGOS/VISUAL TECH.png" alt="Logo" className="h-4rem mb-3" />
        <h1 className="text-2xl font-bold">💰 Controle Financeiro</h1>
        <p className="text-gray-500">{isRegisterView ? "Crie sua conta gratuita" : "Faça login para acessar"}</p>
    </div>
  );

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-900">
        <Card header={header} className="w-full max-w-25rem">
            <form onSubmit={isRegisterView ? handleSignUp : handleLogin} className="p-fluid">
                {error && <Message severity="error" text={error} className="mb-3" />}
                {message && <Message severity="success" text={message} className="mb-3" />}

                {isRegisterView && (
                    <div className="field mt-3">
                        <span className="p-float-label">
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <label htmlFor="name">Nome</label>
                        </span>
                    </div>
                )}

                <div className="field mt-3">
                    <span className="p-float-label">
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>

                <div className="field mt-3">
                    <span className="p-float-label">
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} required feedback={false} toggleMask />
                        <label htmlFor="password">Senha</label>
                    </span>
                </div>

                {isRegisterView && (
                    <>
                        <div className="field mt-3">
                            <span className="p-float-label">
                                <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required feedback={false} toggleMask />
                                <label htmlFor="confirmPassword">Confirmar Senha</label>
                            </span>
                        </div>
                        <div className="field-checkbox mt-3">
                            <Checkbox inputId="acceptTerms" checked={acceptTerms} onChange={e => setAcceptTerms(e.checked)} required />
                            <label htmlFor="acceptTerms">Aceito os termos de uso</label>
                        </div>
                    </>
                )}

                <Button type="submit" label={isRegisterView ? "Criar Conta" : "Entrar"} className="mt-3" loading={loading} />
            </form>

            <div className="text-center mt-3">
                <Button label={isRegisterView ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se"} className="p-button-link" onClick={() => { setIsRegisterView(!isRegisterView); setError(''); setMessage(''); }} />
            </div>
        </Card>
    </div>
  );
}