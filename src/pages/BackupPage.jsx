import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const BackupPage = () => {
    const backups = [
        { id: 1, nome: 'backup_2024_01_15.json', data: '2024-01-15', tamanho: '2.5 MB', tipo: 'Completo' },
        { id: 2, nome: 'backup_2024_01_10.json', data: '2024-01-10', tamanho: '2.3 MB', tipo: 'Completo' },
        { id: 3, nome: 'backup_lancamentos_2024_01_20.json', data: '2024-01-20', tamanho: '0.8 MB', tipo: 'Lançamentos' }
    ];

    const tipoBodyTemplate = (rowData) => {
        return (
            <span style={{ 
                color: rowData.tipo === 'Completo' ? 'var(--success-color)' : 'var(--info-color)',
                fontWeight: 'bold'
            }}>
                {rowData.tipo === 'Completo' ? '💾 Completo' : '📄 Parcial'}
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
                    💾 Backup e Restauração
                </h1>
                <Button 
                    label="💾 Criar Backup" 
                    icon="pi pi-cloud-upload" 
                />
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px',
                marginBottom: '30px'
            }}>
                <Card title="💾 Backup Automático" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                        ✅ Ativo
                    </div>
                    <p>Próximo backup: 25/01/2024</p>
                </Card>
                
                <Card title="📊 Total de Backups" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        12
                    </div>
                    <p>Arquivos salvos</p>
                </Card>
                
                <Card title="💽 Espaço Usado" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--info-color)' }}>
                        15.2 MB
                    </div>
                    <p>Armazenamento local</p>
                </Card>
            </div>

            <Card title="📋 Histórico de Backups">
                <DataTable 
                    value={backups} 
                    paginator 
                    rows={10}
                    style={{ marginTop: '20px' }}
                >
                    <Column field="nome" header="Nome do Arquivo" sortable></Column>
                    <Column field="data" header="Data" sortable></Column>
                    <Column field="tamanho" header="Tamanho" sortable></Column>
                    <Column body={tipoBodyTemplate} header="Tipo" sortable></Column>
                    <Column header="Ações" body={() => (
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Button icon="pi pi-download" size="small" severity="info" tooltip="Download" />
                            <Button icon="pi pi-upload" size="small" severity="success" tooltip="Restaurar" />
                            <Button icon="pi pi-trash" size="small" severity="danger" tooltip="Excluir" />
                        </div>
                    )}></Column>
                </DataTable>
            </Card>

            <Card title="⚙️ Configurações de Backup" style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button 
                        label="📤 Exportar para CSV" 
                        icon="pi pi-file" 
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        label="📊 Exportar para Excel" 
                        icon="pi pi-file-excel" 
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        label="☁️ Backup na Nuvem" 
                        icon="pi pi-cloud" 
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        label="⚙️ Configurar" 
                        icon="pi pi-cog" 
                    />
                </div>
            </Card>
        </div>
    );
};

export default BackupPage;