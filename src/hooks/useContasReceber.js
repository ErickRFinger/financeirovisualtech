import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useContasReceber = () => {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContas = async () => {
    try {
      setLoading(true);
      
      // Verifica se as variáveis de ambiente estão configuradas
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
        // Modo demo - dados simulados
        setContas([
          { id: 1, vencimento: '2024-02-05', descricao: 'Cliente A', valor: 2500, recebido: false },
          { id: 2, vencimento: '2024-02-20', descricao: 'Cliente B', valor: 1200, recebido: false },
          { id: 3, vencimento: '2024-01-15', descricao: 'Cliente C', valor: 3000, recebido: true }
        ]);
        setLoading(false);
        return;
      }

      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setContas([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('contas_receber')
        .select('*')
        .eq('user_id', session.user.id)
        .order('vencimento', { ascending: true });

      if (error) throw error;
      setContas(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addConta = async (conta) => {
    try {
      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      const contaComUsuario = {
        ...conta,
        user_id: session.user.id
      };

      const { data, error } = await supabase
        .from('contas_receber')
        .insert([contaComUsuario])
        .select();

      if (error) throw error;
      setContas(prev => [...prev, data[0]]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateConta = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('contas_receber')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      setContas(prev => 
        prev.map(c => c.id === id ? data[0] : c)
      );
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteConta = async (id) => {
    try {
      const { error } = await supabase
        .from('contas_receber')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContas(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const marcarComoRecebido = async (id) => {
    return updateConta(id, { 
      recebido: true, 
      data_recebimento: new Date().toISOString().split('T')[0] 
    });
  };

  useEffect(() => {
    fetchContas();
  }, []);

  return {
    contas,
    loading,
    error,
    addConta,
    updateConta,
    deleteConta,
    marcarComoRecebido,
    refetch: fetchContas
  };
};
