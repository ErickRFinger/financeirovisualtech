import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useContasPagar = () => {
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
          { id: 1, vencimento: '2024-02-10', descricao: 'Aluguel', valor: 1500, pago: false },
          { id: 2, vencimento: '2024-02-15', descricao: 'Internet', valor: 100, pago: false },
          { id: 3, vencimento: '2024-01-20', descricao: 'Cartão de Crédito', valor: 850, pago: true }
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
        .from('contas_pagar')
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
        .from('contas_pagar')
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
        .from('contas_pagar')
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
        .from('contas_pagar')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContas(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const marcarComoPago = async (id) => {
    return updateConta(id, { 
      pago: true, 
      data_pagamento: new Date().toISOString().split('T')[0] 
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
    marcarComoPago,
    refetch: fetchContas
  };
};
