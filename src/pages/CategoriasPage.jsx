import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([
        { id: 1, nome: 'Alimentação', tipo: 'despesa', cor: '#FF6B6B' },
        { id: 2, nome: 'Transporte', tipo: 'despesa', cor: '#4ECDC4' },
        { id: 3, nome: 'Salário', tipo: 'receita', cor: '#45B7D1' },
        { id: 4, nome: 'Freelance', tipo: 'receita', cor: '#96CEB4' }
    ]);

    const handleNovaCategoria = () => {
        console.log('Nova categoria');
        alert('Funcionalidade de nova categoria será implementada em breve!');
    };

    const handleEditarCategoria = (id) => {
        console.log('Editar categoria:', id);
        alert('Funcionalidade de edição será implementada em breve!');
    };

    const handleExcluirCategoria = (id) => {
        console.log('Excluir categoria:', id);
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            console.log('Categoria excluída:', id);
        }
    };

    const corBodyTemplate = (rowData) => {
        return (
            <div style={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: rowData.cor, 
                borderRadius: '50%',
                display: 'inline-block'
            }}></div>
        );
    };

    const tipoBodyTemplate = (rowData) => {
        return (
            <span style={{ 
                color: rowData.tipo === 'receita' ? 'var(--success-color)' : 'var(--danger-color)',
                fontWeight: 'bold'
            }}>
                {rowData.tipo === 'receita' ? '📈 Receita' : '📉 Despesa'}
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
                    🏷️ Categorias
                </h1>
                <Button 
                    label="➕ Nova Categoria" 
                    icon="pi pi-plus" 
                    onClick={handleNovaCategoria}
                />
            </div>

            <Card>
                <DataTable 
                    value={categorias} 
                    paginator 
                    rows={10}
                    style={{ marginTop: '20px' }}
                >
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column body={tipoBodyTemplate} header="Tipo" sortable></Column>
                    <Column body={corBodyTemplate} header="Cor"></Column>
                    <Column header="Ações" body={() => (
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Button icon="pi pi-pencil" size="small" severity="info" onClick={() => handleEditarCategoria(rowData.id)} />
                            <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleExcluirCategoria(rowData.id)} />
                        </div>
                    )}></Column>
                </DataTable>
            </Card>
        </div>
    );
};

export default CategoriasPage;