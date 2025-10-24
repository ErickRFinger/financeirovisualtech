import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useLancamentos = () => {
  const [lancamentos, setLancamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLancamentos = async () => {
    try {
      setLoading(true);
      
      // Verifica se as variáveis de ambiente estão configuradas
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
        // Modo demo - dados simulados
        setLancamentos([
          { id: 1, data: '2024-01-15', descricao: 'Salário', valor: 5000, tipo: 'receita', categoria: 'salario' },
          { id: 2, data: '2024-01-20', descricao: 'Aluguel', valor: -1500, tipo: 'despesa', categoria: 'moradia' },
          { id: 3, data: '2024-01-25', descricao: 'Supermercado', valor: -350, tipo: 'despesa', categoria: 'alimentacao' }
        ]);
        setLoading(false);
        return;
      }

      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLancamentos([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('lancamentos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('data', { ascending: false });

      if (error) throw error;
      setLancamentos(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addLancamento = async (lancamento) => {
    try {
      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      const lancamentoComUsuario = {
        ...lancamento,
        user_id: session.user.id
      };

      const { data, error } = await supabase
        .from('lancamentos')
        .insert([lancamentoComUsuario])
        .select();

      if (error) throw error;
      setLancamentos(prev => [data[0], ...prev]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateLancamento = async (id, updates) => {
    try {
      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('lancamentos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select();

      if (error) throw error;
      setLancamentos(prev => 
        prev.map(l => l.id === id ? data[0] : l)
      );
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteLancamento = async (id) => {
    try {
      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      const { error } = await supabase
        .from('lancamentos')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) throw error;
      setLancamentos(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchLancamentos();
  }, []);

  return {
    lancamentos,
    loading,
    error,
    addLancamento,
    updateLancamento,
    deleteLancamento,
    refetch: fetchLancamentos
  };
};
