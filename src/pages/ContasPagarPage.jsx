import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

const ContasPagarPage = () => {
    const [contas] = useState([
        { id: 1, descricao: 'Aluguel', valor: 1500, vencimento: '2024-02-05', pago: false, categoria: 'Moradia' },
        { id: 2, descricao: 'Energia Elétrica', valor: 250, vencimento: '2024-02-10', pago: false, categoria: 'Utilidades' },
        { id: 3, descricao: 'Internet', valor: 120, vencimento: '2024-02-15', pago: true, categoria: 'Utilidades' },
        { id: 4, descricao: 'Cartão de Crédito', valor: 800, vencimento: '2024-02-20', pago: false, categoria: 'Financeiro' },
        { id: 5, descricao: 'Seguro do Carro', valor: 300, vencimento: '2024-02-25', pago: false, categoria: 'Seguros' }
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
            <div className="status-badge">
                <span className={`status-icon ${rowData.pago ? 'pago' : 'pendente'}`}>
                    {rowData.pago ? '✅' : '⏳'}
                </span>
                <span className={`status-text ${rowData.pago ? 'pago' : 'pendente'}`}>
                    {rowData.pago ? 'Pago' : 'Pendente'}
                </span>
            </div>
        );
    };

    const handleMarcarComoPago = (id) => {
        console.log('Marcar como pago:', id);
        // Implementar lógica de marcar como pago
        if (window.confirm('Marcar esta conta como paga?')) {
            console.log('Conta marcada como paga:', id);
        }
    };

    const handleEditar = (id) => {
        console.log('Editar conta:', id);
        // Implementar lógica de edição
        setVisible(true);
    };

    const handleExcluir = (id) => {
        console.log('Excluir conta:', id);
        // Implementar lógica de exclusão
        if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
            console.log('Conta excluída:', id);
        }
    };

    const acoesBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                {!rowData.pago && (
                    <Button 
                        icon="pi pi-check" 
                        size="small" 
                        severity="success"
                        className="action-btn"
                        tooltip="Marcar como pago"
                        onClick={() => handleMarcarComoPago(rowData.id)}
                    />
                )}
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

    const totalPendente = contas.filter(c => !c.pago).reduce((sum, c) => sum + c.valor, 0);
    const totalPago = contas.filter(c => c.pago).reduce((sum, c) => sum + c.valor, 0);
    const totalGeral = contas.reduce((sum, c) => sum + c.valor, 0);

    return (
        <div className="page-container animate-fade-in">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="modern-title">💳 Contas a Pagar</h1>
                    <p className="modern-subtitle">Gerencie suas obrigações financeiras</p>
                </div>
                <div className="header-actions">
                    <Button 
                        label="➕ Nova Conta" 
                        icon="pi pi-plus" 
                        className="modern-btn"
                        onClick={() => setVisible(true)}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="modern-grid modern-grid-3">
                <div className="stat-card animate-slide-in">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-value">{formatCurrency(totalPendente)}</div>
                    <div className="stat-label">Total Pendente</div>
                    <div className="stat-trend negative">{contas.filter(c => !c.pago).length} contas</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">{formatCurrency(totalPago)}</div>
                    <div className="stat-label">Total Pago</div>
                    <div className="stat-trend positive">{contas.filter(c => c.pago).length} contas</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">{formatCurrency(totalGeral)}</div>
                    <div className="stat-label">Total Geral</div>
                    <div className="stat-trend">{contas.length} contas</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="modern-card">
                <div className="card-header">
                    <h3 className="card-title">📋 Lista de Contas</h3>
                    <p className="card-subtitle">Todas as suas obrigações financeiras</p>
                </div>
                
                <div className="table-container">
                    <DataTable 
                        value={contas} 
                        paginator 
                        rows={10}
                        className="modern-table"
                        emptyMessage="Nenhuma conta encontrada"
                    >
                        <Column field="descricao" header="Descrição" sortable></Column>
                        <Column field="categoria" header="Categoria" sortable style={{ width: '150px' }}></Column>
                        <Column field="valor" header="Valor" body={(rowData) => formatCurrency(rowData.valor)} sortable style={{ width: '150px' }}></Column>
                        <Column field="vencimento" header="Vencimento" sortable style={{ width: '120px' }}></Column>
                        <Column body={statusBodyTemplate} header="Status" sortable style={{ width: '120px' }}></Column>
                        <Column body={acoesBodyTemplate} header="Ações" style={{ width: '150px' }}></Column>
                    </DataTable>
                </div>
            </div>

            {/* Dialog */}
            <Dialog 
                header="Nova Conta a Pagar" 
                visible={visible} 
                style={{ width: '50vw', minWidth: '400px' }} 
                onHide={() => setVisible(false)}
                className="modern-dialog"
            >
                <div className="modern-form">
                    <div className="modern-form-group">
                        <label className="modern-form-label">Descrição</label>
                        <InputText 
                            className="modern-form-input"
                            placeholder="Digite a descrição"
                        />
                    </div>
                    
                    <div className="modern-form-group">
                        <label className="modern-form-label">Categoria</label>
                        <InputText 
                            className="modern-form-input"
                            placeholder="Digite a categoria"
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
                    
                    <div className="modern-form-group">
                        <label className="modern-form-label">Vencimento</label>
                        <Calendar 
                            className="modern-form-input"
                            style={{ width: '100%' }}
                            placeholder="Selecione a data"
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

export default ContasPagarPage;