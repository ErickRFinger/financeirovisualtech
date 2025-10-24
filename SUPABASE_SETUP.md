# 🗄️ Configuração do Supabase

Este guia explica como configurar o Supabase para o Sistema Financeiro Visual Tech.

## 📋 Pré-requisitos

1. Conta no Supabase (gratuita)
2. Projeto criado no Supabase

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Digite o nome do projeto: `sistema-financeiro`
6. Escolha uma senha forte para o banco de dados
7. Escolha a região mais próxima (ex: South America - São Paulo)
8. Clique em "Create new project"

### 2. Configurar Variáveis de Ambiente

1. No painel do Supabase, vá em **Settings** > **API**
2. Copie a **Project URL** e **anon public** key
3. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_project_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
VITE_OPENAI_API_KEY=sua_openai_key_aqui
```

### 3. Configurar o Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Copie todo o conteúdo do arquivo `supabase-setup.sql`
3. Cole no editor SQL
4. Clique em **Run** para executar

### 4. Configurar Autenticação

1. Vá em **Authentication** > **Settings**
2. Em **Site URL**, adicione: `http://localhost:5173`
3. Em **Redirect URLs**, adicione: `http://localhost:5173`
4. Em **Email Templates**, configure os templates de confirmação de email

### 5. Configurar Storage (Opcional)

Para upload de comprovantes:

1. Vá em **Storage**
2. Crie um bucket chamado `comprovantes`
3. Configure as políticas de acesso conforme o SQL

## 🔐 Políticas de Segurança (RLS)

O sistema usa Row Level Security (RLS) para garantir que:

- ✅ Cada usuário só vê seus próprios dados
- ✅ Não há vazamento de informações entre usuários
- ✅ Todas as operações são seguras

## 📊 Estrutura das Tabelas

### `lancamentos`
- `id`: ID único
- `user_id`: ID do usuário (FK para auth.users)
- `data`: Data do lançamento
- `descricao`: Descrição
- `valor`: Valor (positivo para receita, negativo para despesa)
- `tipo`: 'receita' ou 'despesa'
- `categoria`: Categoria do lançamento

### `contas_pagar`
- `id`: ID único
- `user_id`: ID do usuário
- `descricao`: Descrição da conta
- `valor`: Valor a pagar
- `vencimento`: Data de vencimento
- `pago`: Status de pagamento
- `categoria`: Categoria da conta

### `contas_receber`
- `id`: ID único
- `user_id`: ID do usuário
- `descricao`: Descrição da conta
- `valor`: Valor a receber
- `vencimento`: Data de vencimento
- `recebido`: Status de recebimento
- `categoria`: Categoria da conta

### `comprovantes`
- `id`: ID único
- `user_id`: ID do usuário
- `nome_arquivo`: Nome do arquivo
- `caminho_arquivo`: Caminho no storage
- `tipo_arquivo`: Tipo do arquivo
- `tamanho`: Tamanho em bytes
- `lancamento_id`: ID do lançamento relacionado

## 🧪 Testando a Configuração

1. Execute o projeto: `npm run dev`
2. Acesse `http://localhost:5173`
3. Tente criar uma conta
4. Verifique se os dados aparecem no painel do Supabase

## 🔧 Solução de Problemas

### Erro de CORS
- Verifique se as URLs estão corretas nas configurações de autenticação

### Erro de RLS
- Verifique se as políticas foram criadas corretamente
- Teste as políticas no SQL Editor

### Erro de Conexão
- Verifique se as variáveis de ambiente estão corretas
- Teste a conexão no painel do Supabase

## 📱 Modo Demo

Se não configurar o Supabase, o sistema funcionará em modo demo com dados simulados.

## 🚀 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente no Vercel
2. Atualize as URLs de redirecionamento no Supabase
3. Configure o domínio nas configurações de autenticação

## 📞 Suporte

Se tiver problemas:

1. Verifique os logs do Supabase
2. Teste as queries no SQL Editor
3. Verifique as políticas RLS
4. Confirme as variáveis de ambiente
