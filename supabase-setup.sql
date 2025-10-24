-- Configuração do banco de dados Supabase para o Sistema Financeiro
-- Execute este script no SQL Editor do Supabase

-- 1. Criar tabela de lançamentos
CREATE TABLE IF NOT EXISTS lancamentos (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    categoria VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela de contas a pagar
CREATE TABLE IF NOT EXISTS contas_pagar (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    vencimento DATE NOT NULL,
    pago BOOLEAN DEFAULT FALSE,
    categoria VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela de contas a receber
CREATE TABLE IF NOT EXISTS contas_receber (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    vencimento DATE NOT NULL,
    recebido BOOLEAN DEFAULT FALSE,
    categoria VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Criar tabela de comprovantes
CREATE TABLE IF NOT EXISTS comprovantes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nome_arquivo TEXT NOT NULL,
    caminho_arquivo TEXT NOT NULL,
    tipo_arquivo VARCHAR(20),
    tamanho BIGINT,
    lancamento_id BIGINT REFERENCES lancamentos(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contas_pagar ENABLE ROW LEVEL SECURITY;
ALTER TABLE contas_receber ENABLE ROW LEVEL SECURITY;
ALTER TABLE comprovantes ENABLE ROW LEVEL SECURITY;

-- 6. Criar políticas RLS para lançamentos
CREATE POLICY "Users can view own lancamentos" ON lancamentos
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lancamentos" ON lancamentos
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lancamentos" ON lancamentos
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lancamentos" ON lancamentos
    FOR DELETE USING (auth.uid() = user_id);

-- 7. Criar políticas RLS para contas a pagar
CREATE POLICY "Users can view own contas_pagar" ON contas_pagar
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contas_pagar" ON contas_pagar
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contas_pagar" ON contas_pagar
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own contas_pagar" ON contas_pagar
    FOR DELETE USING (auth.uid() = user_id);

-- 8. Criar políticas RLS para contas a receber
CREATE POLICY "Users can view own contas_receber" ON contas_receber
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contas_receber" ON contas_receber
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contas_receber" ON contas_receber
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own contas_receber" ON contas_receber
    FOR DELETE USING (auth.uid() = user_id);

-- 9. Criar políticas RLS para comprovantes
CREATE POLICY "Users can view own comprovantes" ON comprovantes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own comprovantes" ON comprovantes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comprovantes" ON comprovantes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comprovantes" ON comprovantes
    FOR DELETE USING (auth.uid() = user_id);

-- 10. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_lancamentos_user_id ON lancamentos(user_id);
CREATE INDEX IF NOT EXISTS idx_lancamentos_data ON lancamentos(data);
CREATE INDEX IF NOT EXISTS idx_lancamentos_tipo ON lancamentos(tipo);

CREATE INDEX IF NOT EXISTS idx_contas_pagar_user_id ON contas_pagar(user_id);
CREATE INDEX IF NOT EXISTS idx_contas_pagar_vencimento ON contas_pagar(vencimento);
CREATE INDEX IF NOT EXISTS idx_contas_pagar_pago ON contas_pagar(pago);

CREATE INDEX IF NOT EXISTS idx_contas_receber_user_id ON contas_receber(user_id);
CREATE INDEX IF NOT EXISTS idx_contas_receber_vencimento ON contas_receber(vencimento);
CREATE INDEX IF NOT EXISTS idx_contas_receber_recebido ON contas_receber(recebido);

CREATE INDEX IF NOT EXISTS idx_comprovantes_user_id ON comprovantes(user_id);
CREATE INDEX IF NOT EXISTS idx_comprovantes_lancamento_id ON comprovantes(lancamento_id);

-- 11. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 12. Criar triggers para updated_at
CREATE TRIGGER update_lancamentos_updated_at 
    BEFORE UPDATE ON lancamentos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contas_pagar_updated_at 
    BEFORE UPDATE ON contas_pagar 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contas_receber_updated_at 
    BEFORE UPDATE ON contas_receber 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 13. Criar função para inserir dados iniciais do usuário (opcional)
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    -- Aqui você pode adicionar lógica para criar dados iniciais do usuário
    -- Por exemplo, categorias padrão, configurações, etc.
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 14. Criar trigger para criar perfil do usuário (opcional)
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- 15. Configurar storage para comprovantes (opcional)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('comprovantes', 'comprovantes', false);

-- CREATE POLICY "Users can upload own comprovantes" ON storage.objects
--     FOR INSERT WITH CHECK (bucket_id = 'comprovantes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view own comprovantes" ON storage.objects
--     FOR SELECT USING (bucket_id = 'comprovantes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can delete own comprovantes" ON storage.objects
--     FOR DELETE USING (bucket_id = 'comprovantes' AND auth.uid()::text = (storage.foldername(name))[1]);
