
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const LancamentosPage = () => {
    const lancamentos = [
        { id: 1, data: '2024-07-28', descricao: 'Salário', valor: 5000, tipo: 'Receita' },
        { id: 2, data: '2024-07-28', descricao: 'Aluguel', valor: -1500, tipo: 'Despesa' },
        { id: 3, data: '2024-07-29', descricao: 'Supermercado', valor: -350, tipo: 'Despesa' },
    ];

    const valorBodyTemplate = (rowData) => {
        return <span className={rowData.valor > 0 ? 'text-green-500' : 'text-red-500'}>{`R$ ${rowData.valor.toFixed(2)}`}</span>;
    };

    return (
        <div>
            <div className="flex justify-content-between align-items-center mb-4">
                <h1 className="text-4xl font-bold">Lançamentos</h1>
                <Button label="Novo Lançamento" icon="pi pi-plus" />
            </div>
            <DataTable value={lancamentos} paginator rows={10}>
                <Column field="data" header="Data"></Column>
                <Column field="descricao" header="Descrição"></Column>
                <Column field="tipo" header="Tipo"></Column>
                <Column field="valor" header="Valor" body={valorBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default LancamentosPage;
