import { supabase } from '../supabaseClient';

export class ReceiptReader {
  constructor() {
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }

  async processReceipt(file) {
    try {
      // Converter arquivo para base64
      const base64 = await this.fileToBase64(file);
      
      // Extrair dados usando OpenAI Vision
      const extractedData = await this.extractDataWithOpenAI(base64);
      
      // Salvar comprovante no banco
      const comprovante = await this.saveReceipt(file.name, extractedData);
      
      return {
        success: true,
        data: extractedData,
        comprovante
      };
    } catch (error) {
      console.error('Erro ao processar comprovante:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async extractDataWithOpenAI(base64Image) {
    if (!this.openaiApiKey || this.openaiApiKey === 'your-openai-key-here') {
      // Retorna dados simulados quando a API não está configurada
      return {
        tipo: 'despesa',
        descricao: 'Comprovante processado (modo demo)',
        valor: 50.00,
        data: new Date().toISOString().split('T')[0],
        categoria: 'outros',
        observacoes: 'Configure a chave da OpenAI para processamento real'
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analise este comprovante e extraia as seguintes informações em formato JSON:
                {
                  "tipo": "receita" ou "despesa",
                  "descricao": "descrição do lançamento",
                  "valor": número decimal,
                  "data": "YYYY-MM-DD",
                  "categoria": "categoria do lançamento",
                  "observacoes": "observações adicionais"
                }
                
                Se for uma nota fiscal, recibo de pagamento ou comprovante de despesa, marque como "despesa".
                Se for um comprovante de recebimento, pagamento recebido ou salário, marque como "receita".
                Extraia o valor numérico sem símbolos de moeda.
                Use a data do documento, se não encontrar, use a data atual.
                Categorize adequadamente (alimentação, transporte, salário, etc.).`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // Se não conseguir fazer parse do JSON, tentar extrair manualmente
      return this.parseTextResponse(content);
    }
  }

  parseTextResponse(text) {
    // Fallback para quando a IA não retorna JSON válido
    const lines = text.split('\n');
    const result = {
      tipo: 'despesa',
      descricao: 'Comprovante processado',
      valor: 0,
      data: new Date().toISOString().split('T')[0],
      categoria: 'outros',
      observacoes: text
    };

    // Tentar extrair valor
    const valorMatch = text.match(/R\$\s*(\d+[.,]\d+)/);
    if (valorMatch) {
      result.valor = parseFloat(valorMatch[1].replace(',', '.'));
    }

    // Tentar identificar se é receita
    if (text.toLowerCase().includes('recebido') || text.toLowerCase().includes('salário')) {
      result.tipo = 'receita';
    }

    return result;
  }

  async saveReceipt(fileName, extractedData) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase
      .from('comprovantes')
      .insert([{
        user_id: user.id,
        nome_arquivo: fileName,
        dados_extraidos: extractedData
      }])
      .select();

    if (error) throw error;
    return data[0];
  }

  async createLancamentoFromReceipt(comprovanteId, extractedData) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const lancamento = {
      user_id: user.id,
      data: extractedData.data,
      descricao: extractedData.descricao,
      valor: extractedData.tipo === 'receita' ? extractedData.valor : -extractedData.valor,
      tipo: extractedData.tipo,
      categoria: extractedData.categoria
    };

    const { data, error } = await supabase
      .from('lancamentos')
      .insert([lancamento])
      .select();

    if (error) throw error;

    // Atualizar comprovante com o ID do lançamento
    await supabase
      .from('comprovantes')
      .update({ lancamento_id: data[0].id })
      .eq('id', comprovanteId);

    return data[0];
  }
}
