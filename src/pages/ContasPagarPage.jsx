
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const ContasPagarPage = () => {
    const contas = [
        { id: 1, vencimento: '2024-08-10', descricao: 'Aluguel', valor: 1500, pago: false },
        { id: 2, vencimento: '2024-08-15', descricao: 'Internet', valor: 100, pago: false },
        { id: 3, vencimento: '2024-07-20', descricao: 'Cartão de Crédito', valor: 850, pago: true },
    ];

    const statusBodyTemplate = (rowData) => {
        return <span className={rowData.pago ? 'text-green-500' : 'text-red-500'}>{rowData.pago ? 'Pago' : 'Pendente'}</span>;
    };

    return (
        <div>
            <div className="flex justify-content-between align-items-center mb-4">
                <h1 className="text-4xl font-bold">Contas a Pagar</h1>
                <Button label="Nova Conta" icon="pi pi-plus" />
            </div>
            <DataTable value={contas} paginator rows={10}>
                <Column field="vencimento" header="Vencimento"></Column>
                <Column field="descricao" header="Descrição"></Column>
                <Column field="valor" header="Valor"></Column>
                <Column field="pago" header="Status" body={statusBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default ContasPagarPage;
