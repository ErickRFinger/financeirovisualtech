# 🚀 Deploy no Vercel - Guia Completo

Este guia explica como fazer o deploy do Sistema Financeiro no Vercel com autenticação funcionando.

## 📋 Pré-requisitos

1. ✅ Conta no Vercel
2. ✅ Projeto no Supabase configurado
3. ✅ Código no GitHub

## 🔧 Configuração no Vercel

### 1. Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione o projeto `financeirovisualtech-main`

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, vá em **Settings** > **Environment Variables** e adicione:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
VITE_OPENAI_API_KEY=sua_openai_key_aqui
```

**⚠️ IMPORTANTE:** Substitua pelos valores reais do seu projeto Supabase!

### 3. Configurar Build Settings

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4. Configurar Domínio

1. Vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado (opcional)
3. Configure SSL (automático)

## 🔐 Configuração no Supabase

### 1. Configurar URLs de Redirecionamento

No painel do Supabase, vá em **Authentication** > **URL Configuration**:

- **Site URL:** `https://seu-projeto.vercel.app`
- **Redirect URLs:** 
  - `https://seu-projeto.vercel.app`
  - `https://seu-projeto.vercel.app/auth/callback`

### 2. Configurar Email Templates

1. Vá em **Authentication** > **Email Templates**
2. Configure os templates de confirmação
3. Teste o envio de emails

### 3. Verificar Políticas RLS

1. Vá em **Authentication** > **Policies**
2. Verifique se as políticas estão ativas
3. Teste as permissões

## 🧪 Testando o Deploy

### 1. Teste de Autenticação

1. Acesse `https://seu-projeto.vercel.app`
2. Tente criar uma conta
3. Verifique se recebe o email de confirmação
4. Faça login com a conta criada

### 2. Teste de Funcionalidades

1. ✅ Login/Logout
2. ✅ Criação de lançamentos
3. ✅ Navegação entre páginas
4. ✅ Persistência de dados

## 🔧 Solução de Problemas

### Problema: Tela branca
**Solução:**
- Verifique se as variáveis de ambiente estão corretas
- Verifique o console do navegador para erros
- Teste a conexão com o Supabase

### Problema: Login não funciona
**Solução:**
- Verifique as URLs de redirecionamento no Supabase
- Verifique se o email foi confirmado
- Teste com um usuário diferente

### Problema: Dados não aparecem
**Solução:**
- Verifique as políticas RLS no Supabase
- Verifique se o usuário está autenticado
- Teste as queries no SQL Editor

### Problema: Erro de CORS
**Solução:**
- Verifique as configurações de autenticação
- Adicione o domínio do Vercel nas configurações
- Verifique os headers de segurança

## 📊 Monitoramento

### 1. Logs do Vercel
- Acesse **Functions** > **Logs**
- Monitore erros em tempo real

### 2. Logs do Supabase
- Acesse **Logs** no painel do Supabase
- Monitore autenticação e queries

### 3. Analytics
- Configure Google Analytics (opcional)
- Monitore performance e erros

## 🚀 Otimizações

### 1. Performance
- Configure CDN do Vercel
- Otimize imagens
- Use lazy loading

### 2. Segurança
- Configure HTTPS
- Configure CSP headers
- Monitore tentativas de login

### 3. Backup
- Configure backup automático
- Exporte dados regularmente
- Monitore uso de storage

## 📱 PWA (Progressive Web App)

O sistema já está configurado como PWA:

- ✅ Manifest configurado
- ✅ Service Worker
- ✅ Instalável em dispositivos móveis

## 🔄 Atualizações

Para atualizar o sistema:

1. Faça push para o GitHub
2. O Vercel fará deploy automático
3. Teste as funcionalidades
4. Monitore logs

## 📞 Suporte

Se tiver problemas:

1. Verifique os logs do Vercel
2. Verifique as configurações do Supabase
3. Teste localmente primeiro
4. Consulte a documentação do Vercel

## ✅ Checklist Final

- [ ] Variáveis de ambiente configuradas
- [ ] URLs de redirecionamento configuradas
- [ ] Políticas RLS ativas
- [ ] Teste de login funcionando
- [ ] Teste de criação de dados funcionando
- [ ] PWA funcionando
- [ ] Performance otimizada
- [ ] Monitoramento configurado
