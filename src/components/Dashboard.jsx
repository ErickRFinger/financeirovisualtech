import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Dashboard({ session }) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('financial');
  const [userData, setUserData] = useState({
    expenses: [],
    incomes: [],
    cards: [],
    purchases: [],
    banks: [],
    bills: [],
    goals: [],
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const { user } = session;

        const { data: expenses, error: expensesError } = await supabase.from('expenses').select('*').eq('user_id', user.id);
        if (expensesError) throw expensesError;

        const { data: incomes, error: incomesError } = await supabase.from('incomes').select('*').eq('user_id', user.id);
        if (incomesError) throw incomesError;

        const { data: cards, error: cardsError } = await supabase.from('cards').select('*').eq('user_id', user.id);
        if (cardsError) throw cardsError;

        const { data: purchases, error: purchasesError } = await supabase.from('purchases').select('*').eq('user_id', user.id);
        if (purchasesError) throw purchasesError;

        const { data: banks, error: banksError } = await supabase.from('banks').select('*').eq('user_id', user.id);
        if (banksError) throw banksError;

        const { data: bills, error: billsError } = await supabase.from('bills').select('*').eq('user_id', user.id);
        if (billsError) throw billsError;

        const { data: goals, error: goalsError } = await supabase.from('goals').select('*').eq('user_id', user.id);
        if (goalsError) throw goalsError;

        setUserData({ expenses, incomes, cards, purchases, banks, bills, goals });
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="auth-screen active"><div className="auth-container">Carregando dados...</div></div>;
  }

  return (
    <div className="main-app active">
      <header className="app-header">
        <div className="header-left">
          <h1>💰 Controle de Financeiro Visual Tech</h1>
        </div>
        <div className="header-right">
          <span id="userName">{session.user.user_metadata?.name || session.user.email}</span>
          <button id="themeToggle" className="theme-toggle">
            <span className="theme-icon">🌙</span>
          </button>
          <button onClick={handleSignOut} id="logoutBtn" className="logout-btn">Sair</button>
        </div>
      </header>

      <nav className="tab-navigation">
        <button className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>💰 Financeiro</button>
        <button className={`tab-btn ${activeTab === 'incomes' ? 'active' : ''}`} onClick={() => setActiveTab('incomes')}>💵 Entradas</button>
        <button className={`tab-btn ${activeTab === 'cards' ? 'active' : ''}`} onClick={() => setActiveTab('cards')}>💳 Cartões</button>
        <button className={`tab-btn ${activeTab === 'banks' ? 'active' : ''}`} onClick={() => setActiveTab('banks')}>🏦 Bancos</button>
        <button className={`tab-btn ${activeTab === 'bills' ? 'active' : ''}`} onClick={() => setActiveTab('bills')}>📄 Faturas</button>
        <button className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>🎯 Metas</button>
      </nav>

      <main className="main-content">
        <div id="financial" className={`tab-content ${activeTab === 'financial' ? 'active' : ''}`}>
            <p>Conteúdo da aba Financeiro</p>
            <pre>{JSON.stringify(userData.expenses, null, 2)}</pre>
        </div>
        <div id="incomes" className={`tab-content ${activeTab === 'incomes' ? 'active' : ''}`}>
            <p>Conteúdo da aba Entradas</p>
            <pre>{JSON.stringify(userData.incomes, null, 2)}</pre>
        </div>
        <div id="cards" className={`tab-content ${activeTab === 'cards' ? 'active' : ''}`}>
            <p>Conteúdo da aba Cartões</p>
            <pre>{JSON.stringify(userData.cards, null, 2)}</pre>
        </div>
        {/* Adicionar outras abas aqui */}
      </main>
    </div>
  );
}
