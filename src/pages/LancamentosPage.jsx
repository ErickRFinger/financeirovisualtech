import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const LancamentosPage = () => {
    const [lancamentos] = useState([
        { id: 1, data: '2024-01-15', descricao: 'Salário', valor: 5000, tipo: 'receita', categoria: 'salario' },
        { id: 2, data: '2024-01-20', descricao: 'Aluguel', valor: -1500, tipo: 'despesa', categoria: 'moradia' },
        { id: 3, data: '2024-01-25', descricao: 'Supermercado', valor: -350, tipo: 'despesa', categoria: 'alimentacao' },
        { id: 4, data: '2024-01-28', descricao: 'Freelance', valor: 1200, tipo: 'receita', categoria: 'trabalho' },
        { id: 5, data: '2024-01-30', descricao: 'Gasolina', valor: -200, tipo: 'despesa', categoria: 'transporte' }
    ]);
    
    const [visible, setVisible] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState(null);
    
    const tipoOptions = [
        { label: 'Receita', value: 'receita' },
        { label: 'Despesa', value: 'despesa' }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const tipoBodyTemplate = (rowData) => {
        return (
            <div className="tipo-badge">
                <span className={`tipo-icon ${rowData.tipo}`}>
                    {rowData.tipo === 'receita' ? '📈' : '📉'}
                </span>
                <span className={`tipo-text ${rowData.tipo}`}>
                    {rowData.tipo === 'receita' ? 'Receita' : 'Despesa'}
                </span>
            </div>
        );
    };

    const valorBodyTemplate = (rowData) => {
        return (
            <span className={`valor-amount ${rowData.valor > 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(rowData.valor)}
            </span>
        );
    };

    const handleEditar = (id) => {
        console.log('Editar lançamento:', id);
        // Implementar lógica de edição
        setVisible(true);
    };

    const handleExcluir = (id) => {
        console.log('Excluir lançamento:', id);
        // Implementar lógica de exclusão
        if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
            console.log('Lançamento excluído:', id);
        }
    };

    const acoesBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <Button 
                    icon="pi pi-pencil" 
                    size="small" 
                    severity="info"
                    className="action-btn"
                    tooltip="Editar"
                    onClick={() => handleEditar(rowData.id)}
                />
                <Button 
                    icon="pi pi-trash" 
                    size="small" 
                    severity="danger"
                    className="action-btn"
                    tooltip="Excluir"
                    onClick={() => handleExcluir(rowData.id)}
                />
            </div>
        );
    };

    return (
        <div className="page-container animate-fade-in">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="modern-title">💰 Lançamentos</h1>
                    <p className="modern-subtitle">Gerencie suas receitas e despesas</p>
                </div>
                <div className="header-actions">
                    <Button 
                        label="➕ Novo Lançamento" 
                        icon="pi pi-plus" 
                        className="modern-btn"
                        onClick={() => setVisible(true)}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="modern-grid modern-grid-3">
                <div className="stat-card animate-slide-in">
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">R$ 6.200,00</div>
                    <div className="stat-label">Total Receitas</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon">📉</div>
                    <div className="stat-value">R$ 2.050,00</div>
                    <div className="stat-label">Total Despesas</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">R$ 4.150,00</div>
                    <div className="stat-label">Saldo Líquido</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="modern-card">
                <div className="card-header">
                    <h3 className="card-title">📋 Lista de Lançamentos</h3>
                    <p className="card-subtitle">Todas as suas movimentações financeiras</p>
                </div>
                
                <div className="table-container">
                    <DataTable 
                        value={lancamentos} 
                        paginator 
                        rows={10}
                        className="modern-table"
                        emptyMessage="Nenhum lançamento encontrado"
                    >
                        <Column field="data" header="Data" sortable style={{ width: '120px' }}></Column>
                        <Column field="descricao" header="Descrição" sortable></Column>
                        <Column field="categoria" header="Categoria" sortable style={{ width: '150px' }}></Column>
                        <Column body={tipoBodyTemplate} header="Tipo" sortable style={{ width: '120px' }}></Column>
                        <Column body={valorBodyTemplate} header="Valor" sortable style={{ width: '150px' }}></Column>
                        <Column body={acoesBodyTemplate} header="Ações" style={{ width: '120px' }}></Column>
                    </DataTable>
                </div>
            </div>

            {/* Dialog */}
            <Dialog 
                header="Novo Lançamento" 
                visible={visible} 
                style={{ width: '50vw', minWidth: '400px' }} 
                onHide={() => setVisible(false)}
                className="modern-dialog"
            >
                <div className="modern-form">
                    <div className="modern-form-group">
                        <label className="modern-form-label">Data</label>
                        <Calendar 
                            className="modern-form-input"
                            style={{ width: '100%' }}
                            placeholder="Selecione a data"
                        />
                    </div>
                    
                    <div className="modern-form-group">
                        <label className="modern-form-label">Descrição</label>
                        <InputText 
                            className="modern-form-input"
                            placeholder="Digite a descrição"
                        />
                    </div>
                    
                    <div className="modern-form-group">
                        <label className="modern-form-label">Tipo</label>
                        <Dropdown 
                            options={tipoOptions} 
                            value={selectedTipo} 
                            onChange={(e) => setSelectedTipo(e.value)}
                            placeholder="Selecione o tipo"
                            className="modern-form-input"
                        />
                    </div>
                    
                    <div className="modern-form-group">
                        <label className="modern-form-label">Valor</label>
                        <InputNumber 
                            mode="currency" 
                            currency="BRL" 
                            locale="pt-BR"
                            className="modern-form-input"
                        />
                    </div>
                    
                    <div className="form-actions">
                        <Button 
                            label="Cancelar" 
                            severity="secondary" 
                            className="modern-btn modern-btn-secondary"
                            onClick={() => setVisible(false)} 
                        />
                        <Button 
                            label="Salvar" 
                            className="modern-btn"
                            onClick={() => setVisible(false)} 
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default LancamentosPage;