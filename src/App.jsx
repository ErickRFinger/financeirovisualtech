import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import MainLayout from './layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import LancamentosPage from './pages/LancamentosPage';
import ContasPagarPage from './pages/ContasPagarPage';
import ContasReceberPage from './pages/ContasReceberPage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-content-center align-items-center h-screen">Carregando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!session ? <Auth /> : <Navigate to="/" />} />
      <Route element={session ? <MainLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/lancamentos" element={<LancamentosPage />} />
        <Route path="/contas-a-pagar" element={<ContasPagarPage />} />
        <Route path="/contas-a-receber" element={<ContasReceberPage />} />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
