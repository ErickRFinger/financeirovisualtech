import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleRelatorioCompleto = () => {
        navigate('/relatorios');
    };

    const handleNovoLancamento = () => {
        navigate('/lancamentos');
    };

    const handleVerRelatorios = () => {
        navigate('/relatorios');
    };

    const handleConfiguracoes = () => {
        navigate('/configuracoes');
    };

    return (
        <div className="dashboard-container animate-fade-in">
            {/* Header */}
            <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="modern-title">🏠 Dashboard</h1>
                    <p className="modern-subtitle">Bem-vindo ao seu painel financeiro inteligente</p>
                </div>
                <div className="header-actions">
                    <Button 
                        label="📊 Relatório Completo" 
                        icon="pi pi-chart-bar"
                        className="modern-btn"
                        onClick={handleRelatorioCompleto}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="modern-grid modern-grid-4">
                <div className="stat-card animate-slide-in">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">R$ 5.000,00</div>
                    <div className="stat-label">Saldo Atual</div>
                    <div className="stat-trend positive">+12.5% vs mês anterior</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">R$ 8.500,00</div>
                    <div className="stat-label">Receitas do Mês</div>
                    <div className="stat-trend positive">+8.2% vs mês anterior</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon">📉</div>
                    <div className="stat-value">R$ 3.500,00</div>
                    <div className="stat-label">Despesas do Mês</div>
                    <div className="stat-trend negative">-5.1% vs mês anterior</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
                    <div className="stat-icon">🎯</div>
                    <div className="stat-value">85%</div>
                    <div className="stat-label">Meta Mensal</div>
                    <div className="stat-trend positive">R$ 1.200 restantes</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="modern-grid modern-grid-2">
                {/* Quick Actions */}
                <div className="modern-card animate-fade-in">
                    <div className="card-header">
                        <h3 className="card-title">🚀 Ações Rápidas</h3>
                        <p className="card-subtitle">Gerencie suas finanças rapidamente</p>
                    </div>
                    <div className="quick-actions">
                        <Button 
                            label="➕ Novo Lançamento" 
                            icon="pi pi-plus" 
                            className="modern-btn"
                            style={{ width: '100%', marginBottom: '12px' }}
                            onClick={handleNovoLancamento}
                        />
                        <Button 
                            label="📊 Ver Relatórios" 
                            icon="pi pi-chart-bar" 
                            className="modern-btn modern-btn-secondary"
                            style={{ width: '100%', marginBottom: '12px' }}
                            onClick={handleVerRelatorios}
                        />
                        <Button 
                            label="⚙️ Configurações" 
                            icon="pi pi-cog" 
                            className="modern-btn modern-btn-secondary"
                            style={{ width: '100%' }}
                            onClick={handleConfiguracoes}
                        />
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="card-header">
                        <h3 className="card-title">💳 Transações Recentes</h3>
                        <p className="card-subtitle">Últimas movimentações</p>
                    </div>
                    <div className="transaction-list">
                        <div className="transaction-item">
                            <div className="transaction-icon">💰</div>
                            <div className="transaction-details">
                                <div className="transaction-name">Salário</div>
                                <div className="transaction-date">Hoje, 14:30</div>
                            </div>
                            <div className="transaction-amount positive">+R$ 5.000,00</div>
                        </div>
                        <div className="transaction-item">
                            <div className="transaction-icon">🏠</div>
                            <div className="transaction-details">
                                <div className="transaction-name">Aluguel</div>
                                <div className="transaction-date">Ontem, 09:15</div>
                            </div>
                            <div className="transaction-amount negative">-R$ 1.500,00</div>
                        </div>
                        <div className="transaction-item">
                            <div className="transaction-icon">🛒</div>
                            <div className="transaction-details">
                                <div className="transaction-name">Supermercado</div>
                                <div className="transaction-date">Ontem, 18:45</div>
                            </div>
                            <div className="transaction-amount negative">-R$ 350,00</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Cards */}
            <div className="modern-grid modern-grid-3">
                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="card-header">
                        <h3 className="card-title">🎯 Metas do Mês</h3>
                    </div>
                    <div className="progress-section">
                        <div className="progress-item">
                            <div className="progress-label">
                                <span>Reserva de Emergência</span>
                                <span>R$ 2.500 / R$ 5.000</span>
                            </div>
                            <ProgressBar value={50} style={{ height: '8px', marginTop: '8px' }} />
                        </div>
                        <div className="progress-item">
                            <div className="progress-label">
                                <span>Viagem para Europa</span>
                                <span>R$ 1.200 / R$ 3.000</span>
                            </div>
                            <ProgressBar value={40} style={{ height: '8px', marginTop: '8px' }} />
                        </div>
                    </div>
                </div>

                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="card-header">
                        <h3 className="card-title">📊 Categorias</h3>
                    </div>
                    <div className="category-list">
                        <div className="category-item">
                            <div className="category-icon">🍽️</div>
                            <div className="category-info">
                                <div className="category-name">Alimentação</div>
                                <div className="category-amount">R$ 650,00</div>
                            </div>
                            <div className="category-percentage">32%</div>
                        </div>
                        <div className="category-item">
                            <div className="category-icon">🚗</div>
                            <div className="category-info">
                                <div className="category-name">Transporte</div>
                                <div className="category-amount">R$ 320,00</div>
                            </div>
                            <div className="category-percentage">16%</div>
                        </div>
                        <div className="category-item">
                            <div className="category-icon">🏠</div>
                            <div className="category-info">
                                <div className="category-name">Moradia</div>
                                <div className="category-amount">R$ 1.500,00</div>
                            </div>
                            <div className="category-percentage">75%</div>
                        </div>
                    </div>
                </div>

                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="card-header">
                        <h3 className="card-title">📈 Investimentos</h3>
                    </div>
                    <div className="investment-summary">
                        <div className="investment-item">
                            <div className="investment-label">Total Investido</div>
                            <div className="investment-value">R$ 14.000,00</div>
                        </div>
                        <div className="investment-item">
                            <div className="investment-label">Rendimento</div>
                            <div className="investment-value positive">+R$ 1.250,00</div>
                        </div>
                        <div className="investment-item">
                            <div className="investment-label">Rentabilidade</div>
                            <div className="investment-value positive">+8.9%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;