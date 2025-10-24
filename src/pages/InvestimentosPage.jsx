import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const InvestimentosPage = () => {
    const investimentos = [
        { id: 1, nome: 'Tesouro Selic', valor: 5000, rendimento: 12.5, tipo: 'Renda Fixa' },
        { id: 2, nome: 'CDB Banco X', valor: 3000, rendimento: 8.2, tipo: 'Renda Fixa' },
        { id: 3, nome: 'Ações PETR4', valor: 2000, rendimento: -5.3, tipo: 'Renda Variável' },
        { id: 4, nome: 'Fundo Multimercado', valor: 4000, rendimento: 15.8, tipo: 'Fundo' }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const rendimentoBodyTemplate = (rowData) => {
        return (
            <span style={{ 
                color: rowData.rendimento >= 0 ? 'var(--success-color)' : 'var(--danger-color)',
                fontWeight: 'bold'
            }}>
                {rowData.rendimento >= 0 ? '+' : ''}{rowData.rendimento}%
            </span>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                }}>
                    📈 Investimentos
                </h1>
                <Button 
                    label="➕ Novo Investimento" 
                    icon="pi pi-plus" 
                />
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px',
                marginBottom: '30px'
            }}>
                <Card title="💰 Total Investido" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {formatCurrency(14000)}
                    </div>
                </Card>
                
                <Card title="📈 Rendimento Total" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                        +R$ 1.250,00
                    </div>
                </Card>
                
                <Card title="📊 Rentabilidade" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--info-color)' }}>
                        +8.9%
                    </div>
                </Card>
            </div>

            <Card>
                <DataTable 
                    value={investimentos} 
                    paginator 
                    rows={10}
                    style={{ marginTop: '20px' }}
                >
                    <Column field="nome" header="Investimento" sortable></Column>
                    <Column field="tipo" header="Tipo" sortable></Column>
                    <Column field="valor" header="Valor" body={(rowData) => formatCurrency(rowData.valor)} sortable></Column>
                    <Column body={rendimentoBodyTemplate} header="Rendimento" sortable></Column>
                    <Column header="Ações" body={() => (
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Button icon="pi pi-pencil" size="small" severity="info" />
                            <Button icon="pi pi-trash" size="small" severity="danger" />
                        </div>
                    )}></Column>
                </DataTable>
            </Card>
        </div>
    );
};

export default InvestimentosPage;