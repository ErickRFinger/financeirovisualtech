import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import MainLayout from './layout/MainLayout';
import TestPage from './pages/TestPage';
import DashboardPage from './pages/DashboardPage';
import LancamentosPage from './pages/LancamentosPage';
import ContasPagarPage from './pages/ContasPagarPage';
import ContasReceberPage from './pages/ContasReceberPage';
import RelatoriosPage from './pages/RelatoriosPage';
import CategoriasPage from './pages/CategoriasPage';
import MetasPage from './pages/MetasPage';
import InvestimentosPage from './pages/InvestimentosPage';
import OrcamentoPage from './pages/OrcamentoPage';
import ComprovantesPage from './pages/ComprovantesPage';
import BackupPage from './pages/BackupPage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  // Aplicar tema por padrão
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      try {
        // Verifica se as variáveis de ambiente estão configuradas
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
          // Modo demo - não precisa de autenticação
          setDemoMode(true);
          setSession({ user: { id: 'demo-user', email: 'demo@example.com' } });
          setLoading(false);
          return;
        }

        // Verifica se o Supabase está configurado corretamente
        if (supabaseUrl.includes('placeholder')) {
          console.warn('Supabase não configurado, usando modo demo');
          setDemoMode(true);
          setSession({ user: { id: 'demo-user', email: 'demo@example.com' } });
          setLoading(false);
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao verificar sessão:', error);
          setSession(null);
        } else {
          setSession(session);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setSession(null);
        setLoading(false);
      }
    };

    getSession();

    // Escuta mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '24px'
      }}>
        Carregando...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!session ? <Auth /> : <Navigate to="/" />} />
      <Route element={session ? <MainLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/lancamentos" element={<LancamentosPage />} />
        <Route path="/contas-a-pagar" element={<ContasPagarPage />} />
        <Route path="/contas-a-receber" element={<ContasReceberPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/metas" element={<MetasPage />} />
        <Route path="/investimentos" element={<InvestimentosPage />} />
        <Route path="/orcamento" element={<OrcamentoPage />} />
        <Route path="/comprovantes" element={<ComprovantesPage />} />
        <Route path="/backup" element={<BackupPage />} />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      </Route>
    </Routes>
  );
}

export default App;