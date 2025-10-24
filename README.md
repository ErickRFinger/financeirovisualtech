# 💰 Sistema Financeiro Visual Tech

Sistema de gestão financeira completo com autenticação, controle de lançamentos, contas a pagar/receber e leitura automática de comprovantes.

## 🚀 Funcionalidades

- **Autenticação segura** com Supabase
- **Dashboard** com resumo financeiro
- **Lançamentos** de receitas e despesas
- **Contas a Pagar** e **Contas a Receber**
- **Leitura automática de comprovantes** com IA
- **Interface responsiva** com tema escuro/claro
- **PWA** (Progressive Web App)

## 🛠️ Tecnologias

- React 19
- Vite
- PrimeReact
- Supabase
- OpenAI API
- React Router DOM

## 📋 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
# Supabase Configuration
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# OpenAI API Key (para leitura de comprovantes)
VITE_OPENAI_API_KEY=sua_chave_da_openai
```

### 2. Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as tabelas necessárias (veja seção Database Schema)
3. Configure autenticação por email
4. Copie a URL e chave anônima para o arquivo `.env`

### 3. Instalação

```bash
npm install
npm run dev
```

## 🗄️ Database Schema

Execute os seguintes comandos SQL no Supabase:

```sql
-- Tabela de lançamentos
CREATE TABLE lancamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('receita', 'despesa')),
  categoria VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de contas a pagar
CREATE TABLE contas_pagar (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  vencimento DATE NOT NULL,
  pago BOOLEAN DEFAULT FALSE,
  data_pagamento DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de contas a receber
CREATE TABLE contas_receber (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  vencimento DATE NOT NULL,
  recebido BOOLEAN DEFAULT FALSE,
  data_recebimento DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de comprovantes processados
CREATE TABLE comprovantes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_arquivo TEXT NOT NULL,
  dados_extraidos JSONB,
  lancamento_id UUID REFERENCES lancamentos(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de segurança (RLS)
ALTER TABLE lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contas_pagar ENABLE ROW LEVEL SECURITY;
ALTER TABLE contas_receber ENABLE ROW LEVEL SECURITY;
ALTER TABLE comprovantes ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários autenticados
CREATE POLICY "Users can view own lancamentos" ON lancamentos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lancamentos" ON lancamentos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lancamentos" ON lancamentos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own lancamentos" ON lancamentos FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own contas_pagar" ON contas_pagar FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own contas_pagar" ON contas_pagar FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contas_pagar" ON contas_pagar FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contas_pagar" ON contas_pagar FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own contas_receber" ON contas_receber FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own contas_receber" ON contas_receber FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contas_receber" ON contas_receber FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contas_receber" ON contas_receber FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own comprovantes" ON comprovantes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own comprovantes" ON comprovantes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comprovantes" ON comprovantes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comprovantes" ON comprovantes FOR DELETE USING (auth.uid() = user_id);
```

## 🚀 Deploy no Vercel

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. O deploy será automático

## 📱 PWA

O sistema é um Progressive Web App, podendo ser instalado como aplicativo nativo.

## 🤖 Leitura de Comprovantes

O sistema utiliza IA para extrair automaticamente informações de comprovantes (notas fiscais, recibos, etc.) e criar lançamentos automaticamente.

## 📄 Licença

Este projeto é propriedade da Visual Tech.
