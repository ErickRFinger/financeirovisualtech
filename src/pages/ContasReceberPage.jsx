import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

const ContasReceberPage = () => {
    const [contas] = useState([
        { id: 1, descricao: 'Venda de Produto', valor: 2500, vencimento: '2024-02-05', recebido: false },
        { id: 2, descricao: 'Serviço Prestado', valor: 800, vencimento: '2024-02-10', recebido: false },
        { id: 3, descricao: 'Freelance', valor: 1200, vencimento: '2024-02-15', recebido: true }
    ]);
    
    const [visible, setVisible] = useState(false);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <span style={{ 
                color: rowData.recebido ? 'var(--success-color)' : 'var(--warning-color)',
                fontWeight: 'bold'
            }}>
                {rowData.recebido ? '✅ Recebido' : '⏳ Pendente'}
            </span>
        );
    };

    const acoesBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', gap: '5px' }}>
                <Button 
                    icon="pi pi-check" 
                    size="small" 
                    severity="success"
                    tooltip="Marcar como recebido"
                />
                <Button 
                    icon="pi pi-pencil" 
                    size="small" 
                    severity="info"
                    tooltip="Editar"
                />
                <Button 
                    icon="pi pi-trash" 
                    size="small" 
                    severity="danger"
                    tooltip="Excluir"
                />
            </div>
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
                    💰 Contas a Receber
                </h1>
                <Button 
                    label="➕ Nova Conta" 
                    icon="pi pi-plus" 
                    onClick={() => setVisible(true)}
                />
            </div>

            <Card>
                <DataTable 
                    value={contas} 
                    paginator 
                    rows={10}
                    style={{ marginTop: '20px' }}
                >
                    <Column field="descricao" header="Descrição" sortable></Column>
                    <Column field="valor" header="Valor" body={(rowData) => formatCurrency(rowData.valor)} sortable></Column>
                    <Column field="vencimento" header="Vencimento" sortable></Column>
                    <Column body={statusBodyTemplate} header="Status" sortable></Column>
                    <Column body={acoesBodyTemplate} header="Ações"></Column>
                </DataTable>
            </Card>

            <Dialog 
                header="Nova Conta a Receber" 
                visible={visible} 
                style={{ width: '50vw' }} 
                onHide={() => setVisible(false)}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label>Descrição:</label>
                        <InputText style={{ width: '100%' }} placeholder="Digite a descrição" />
                    </div>
                    <div>
                        <label>Valor:</label>
                        <InputNumber 
                            mode="currency" 
                            currency="BRL" 
                            locale="pt-BR"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label>Vencimento:</label>
                        <Calendar style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <Button label="Cancelar" severity="secondary" onClick={() => setVisible(false)} />
                        <Button label="Salvar" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ContasReceberPage;