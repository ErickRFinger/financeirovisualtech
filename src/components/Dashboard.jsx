
import { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { ThemeContext } from '../contexts/ThemeContext';
import { Container, Navbar, Nav, Button, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Sun, Moon } from 'react-bootstrap-icons';
import DataList from './DataList';

export default function Dashboard({ session }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    expenses: [],
    incomes: [],
    cards: [],
    purchases: [],
    banks: [],
    bills: [],
    goals: [],
  });

  const { theme, toggleTheme } = useContext(ThemeContext);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const { user } = session;

      const [ 
        { data: expenses, error: expensesError },
        { data: incomes, error: incomesError },
        { data: cards, error: cardsError },
        { data: purchases, error: purchasesError },
        { data: banks, error: banksError },
        { data: bills, error: billsError },
        { data: goals, error: goalsError },
      ] = await Promise.all([
        supabase.from('expenses').select('*').eq('user_id', user.id),
        supabase.from('incomes').select('*').eq('user_id', user.id),
        supabase.from('cards').select('*').eq('user_id', user.id),
        supabase.from('purchases').select('*').eq('user_id', user.id),
        supabase.from('banks').select('*').eq('user_id', user.id),
        supabase.from('bills').select('*').eq('user_id', user.id),
        supabase.from('goals').select('*').eq('user_id', user.id),
      ]);

      if (expensesError) throw expensesError;
      if (incomesError) throw incomesError;
      if (cardsError) throw cardsError;
      if (purchasesError) throw purchasesError;
      if (banksError) throw banksError;
      if (billsError) throw billsError;
      if (goalsError) throw goalsError;

      setUserData({ expenses, incomes, cards, purchases, banks, bills, goals });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleDelete = async (tableName, id) => {
    if (window.confirm(`Tem certeza que deseja deletar este item?`)) {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) {
        alert(`Erro ao deletar: ${error.message}`);
      } else {
        // Refresh user data after deletion
        loadUserData();
      }
    }
  };

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant={theme === 'dark' ? 'light' : 'dark'} />
        <span className="ms-3">Carregando dados...</span>
      </Container>
    );
  }

  return (
    <>
      <Navbar bg={theme} variant={theme} expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="#home">💰 Controle Financeiro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Item className="me-3">
                <span className="navbar-text">{session.user.user_metadata?.name || session.user.email}</span>
              </Nav.Item>
              <Button variant="outline-secondary" onClick={toggleTheme} className="me-3">
                {theme === 'light' ? <Moon /> : <Sun />}
              </Button>
              <Button variant="outline-danger" onClick={handleSignOut}>Sair</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Tabs defaultActiveKey="expenses" id="main-tabs" className="mb-3" justify>
          <Tab eventKey="expenses" title="💰 Despesas">
            <DataList 
              title="Despesas" 
              data={userData.expenses} 
              onAdd={() => alert('Adicionar nova despesa')} 
              onDelete={(id) => handleDelete('expenses', id)}
            />
          </Tab>
          <Tab eventKey="incomes" title="💵 Entradas">
            <DataList 
              title="Entradas" 
              data={userData.incomes} 
              onAdd={() => alert('Adicionar nova entrada')} 
              onDelete={(id) => handleDelete('incomes', id)}
            />
          </Tab>
          <Tab eventKey="cards" title="💳 Cartões">
            <DataList 
              title="Cartões" 
              data={userData.cards} 
              onAdd={() => alert('Adicionar novo cartão')} 
              onDelete={(id) => handleDelete('cards', id)}
            />
          </Tab>
          <Tab eventKey="banks" title="🏦 Bancos">
            <DataList 
              title="Bancos" 
              data={userData.banks} 
              onAdd={() => alert('Adicionar novo banco')} 
              onDelete={(id) => handleDelete('banks', id)}
            />
          </Tab>
          <Tab eventKey="bills" title="📄 Faturas">
            <DataList 
              title="Faturas" 
              data={userData.bills} 
              onAdd={() => alert('Adicionar nova fatura')} 
              onDelete={(id) => handleDelete('bills', id)}
            />
          </Tab>
          <Tab eventKey="goals" title="🎯 Metas">
            <DataList 
              title="Metas" 
              data={userData.goals} 
              onAdd={() => alert('Adicionar nova meta')} 
              onDelete={(id) => handleDelete('goals', id)}
            />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
