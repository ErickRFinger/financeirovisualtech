import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FileUpload } from 'primereact/fileupload';

const ComprovantesPage = () => {
    const comprovantes = [
        { id: 1, nome: 'Nota_Fiscal_Supermercado.pdf', data: '2024-01-15', tipo: 'Despesa', valor: 350.50 },
        { id: 2, nome: 'Recibo_Aluguel.pdf', data: '2024-01-20', tipo: 'Despesa', valor: 1500.00 },
        { id: 3, nome: 'Comprovante_Salario.pdf', data: '2024-01-25', tipo: 'Receita', valor: 5000.00 }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const tipoBodyTemplate = (rowData) => {
        return (
            <span style={{ 
                color: rowData.tipo === 'Receita' ? 'var(--success-color)' : 'var(--danger-color)',
                fontWeight: 'bold'
            }}>
                {rowData.tipo === 'Receita' ? '📈 Receita' : '📉 Despesa'}
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
                    📄 Comprovantes
                </h1>
                <Button 
                    label="📤 Upload em Lote" 
                    icon="pi pi-upload" 
                />
            </div>

            <Card title="📤 Upload de Comprovantes" style={{ marginBottom: '20px' }}>
                <FileUpload 
                    mode="basic" 
                    name="demo[]" 
                    accept=".pdf,.jpg,.png" 
                    maxFileSize={10000000} 
                    label="Escolher Arquivos" 
                    chooseLabel="📁 Selecionar Arquivos"
                    style={{ marginBottom: '20px' }}
                />
                <p style={{ color: 'var(--text-color-secondary)', fontSize: '14px' }}>
                    Formatos aceitos: PDF, JPG, PNG (máximo 10MB por arquivo)
                </p>
            </Card>

            <Card>
                <DataTable 
                    value={comprovantes} 
                    paginator 
                    rows={10}
                    style={{ marginTop: '20px' }}
                >
                    <Column field="nome" header="Nome do Arquivo" sortable></Column>
                    <Column field="data" header="Data" sortable></Column>
                    <Column body={tipoBodyTemplate} header="Tipo" sortable></Column>
                    <Column field="valor" header="Valor" body={(rowData) => formatCurrency(rowData.valor)} sortable></Column>
                    <Column header="Ações" body={() => (
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Button icon="pi pi-eye" size="small" severity="info" tooltip="Visualizar" />
                            <Button icon="pi pi-download" size="small" severity="success" tooltip="Download" />
                            <Button icon="pi pi-trash" size="small" severity="danger" tooltip="Excluir" />
                        </div>
                    )}></Column>
                </DataTable>
            </Card>
        </div>
    );
};

export default ComprovantesPage;