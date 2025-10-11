
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ContasReceberPage = () => {
    const contas = [
        { id: 1, vencimento: '2024-08-05', descricao: 'Cliente A', valor: 2500, recebido: false },
        { id: 2, vencimento: '2024-08-20', descricao: 'Cliente B', valor: 1200, recebido: false },
        { id: 3, vencimento: '2024-07-15', descricao: 'Cliente C', valor: 3000, recebido: true },
    ];

    const statusBodyTemplate = (rowData) => {
        return <span className={rowData.recebido ? 'text-green-500' : 'text-red-500'}>{rowData.recebido ? 'Recebido' : 'Pendente'}</span>;
    };

    return (
        <div>
            <div className="flex justify-content-between align-items-center mb-4">
                <h1 className="text-4xl font-bold">Contas a Receber</h1>
                <Button label="Nova Conta" icon="pi pi-plus" />
            </div>
            <DataTable value={contas} paginator rows={10}>
                <Column field="vencimento" header="Vencimento"></Column>
                <Column field="descricao" header="Descrição"></Column>
                <Column field="valor" header="Valor"></Column>
                <Column field="recebido" header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default ContasReceberPage;
