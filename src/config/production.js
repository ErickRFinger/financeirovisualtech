// Configurações específicas para produção
export const productionConfig = {
  // URLs de redirecionamento para produção
  redirectUrls: [
    'https://sistema-financeiro.vercel.app',
    'https://sistema-financeiro.vercel.app/auth/callback',
    'https://sistema-financeiro.vercel.app/login'
  ],
  
  // Configurações de autenticação
  auth: {
    // Tempo de expiração da sessão (em segundos)
    sessionTimeout: 3600, // 1 hora
    
    // Configurações de refresh token
    refreshToken: {
      enabled: true,
      interval: 300000 // 5 minutos
    }
  },
  
  // Configurações de erro
  errorHandling: {
    // Mostrar erros detalhados apenas em desenvolvimento
    showDetailedErrors: process.env.NODE_ENV === 'development',
    
    // Log de erros
    logErrors: true,
    
    // Fallback para modo demo
    fallbackToDemo: true
  },
  
  // Configurações de performance
  performance: {
    // Lazy loading de componentes
    lazyLoading: true,
    
    // Cache de dados
    cacheEnabled: true,
    
    // Debounce para pesquisas
    searchDebounce: 300
  },
  
  // Configurações de segurança
  security: {
    // Headers de segurança
    securityHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    },
    
    // Validação de entrada
    inputValidation: true,
    
    // Sanitização de dados
    sanitizeInput: true
  }
};

// Função para verificar se está em produção
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' || 
         window.location.hostname.includes('vercel.app') ||
         window.location.hostname.includes('netlify.app');
};

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return supabaseUrl && 
         !supabaseUrl.includes('placeholder') && 
         supabaseUrl.startsWith('https://');
};

// Função para obter configurações baseadas no ambiente
export const getConfig = () => {
  const baseConfig = {
    isProduction: isProduction(),
    isSupabaseConfigured: isSupabaseConfigured(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  return {
    ...baseConfig,
    ...productionConfig
  };
};
