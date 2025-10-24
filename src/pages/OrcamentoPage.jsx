import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

const OrcamentoPage = () => {
    const categorias = [
        { nome: 'Alimentação', orcado: 800, gasto: 650, cor: '#FF6B6B' },
        { nome: 'Transporte', orcado: 400, gasto: 320, cor: '#4ECDC4' },
        { nome: 'Moradia', orcado: 1500, gasto: 1500, cor: '#45B7D1' },
        { nome: 'Lazer', orcado: 300, gasto: 450, cor: '#96CEB4' },
        { nome: 'Saúde', orcado: 200, gasto: 180, cor: '#FECA57' }
    ];

    const calcularProgresso = (gasto, orcado) => {
        return (gasto / orcado) * 100;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                }}>
                    📅 Orçamento Mensal
                </h1>
                <Button 
                    label="⚙️ Configurar Orçamento" 
                    icon="pi pi-cog" 
                />
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px',
                marginBottom: '30px'
            }}>
                <Card title="💰 Total Orçado" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {formatCurrency(3200)}
                    </div>
                </Card>
                
                <Card title="💸 Total Gasto" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--danger-color)' }}>
                        {formatCurrency(3100)}
                    </div>
                </Card>
                
                <Card title="💵 Saldo Restante" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                        {formatCurrency(100)}
                    </div>
                </Card>
            </div>

            <Card title="📊 Orçamento por Categoria">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {categorias.map((categoria, index) => (
                        <div key={index} style={{ 
                            padding: '15px', 
                            border: '1px solid #e0e0e0', 
                            borderRadius: '8px',
                            backgroundColor: 'var(--surface-card)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h3 style={{ margin: 0, color: categoria.cor }}>{categoria.nome}</h3>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '14px' }}>
                                        {formatCurrency(categoria.gasto)} / {formatCurrency(categoria.orcado)}
                                    </span>
                                    <span style={{ 
                                        color: categoria.gasto > categoria.orcado ? 'var(--danger-color)' : 'var(--success-color)',
                                        fontWeight: 'bold'
                                    }}>
                                        {categoria.gasto > categoria.orcado ? '⚠️' : '✅'}
                                    </span>
                                </div>
                            </div>
                            <ProgressBar 
                                value={calcularProgresso(categoria.gasto, categoria.orcado)} 
                                style={{ height: '8px' }}
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default OrcamentoPage;