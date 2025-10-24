import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

const RelatoriosPage = () => {
    return (
        <div className="page-container animate-fade-in">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="modern-title">📊 Relatórios</h1>
                    <p className="modern-subtitle">Análises detalhadas das suas finanças</p>
                </div>
                <div className="header-actions">
                    <Button 
                        label="📤 Exportar Relatório" 
                        icon="pi pi-download"
                        className="modern-btn"
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="modern-grid modern-grid-4">
                <div className="stat-card animate-slide-in">
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">R$ 8.500,00</div>
                    <div className="stat-label">Receitas</div>
                    <div className="stat-trend positive">+12.5% vs mês anterior</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon">📉</div>
                    <div className="stat-value">R$ 3.500,00</div>
                    <div className="stat-label">Despesas</div>
                    <div className="stat-trend negative">-5.1% vs mês anterior</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">R$ 5.000,00</div>
                    <div className="stat-label">Saldo</div>
                    <div className="stat-trend positive">+18.2% vs mês anterior</div>
                </div>
                
                <div className="stat-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
                    <div className="stat-icon">📊</div>
                    <div className="stat-value">58.8%</div>
                    <div className="stat-label">Margem</div>
                    <div className="stat-trend positive">+3.2% vs mês anterior</div>
                </div>
            </div>

            {/* Report Cards */}
            <div className="modern-grid modern-grid-2">
                <div className="modern-card animate-fade-in">
                    <div className="card-header">
                        <h3 className="card-title">📈 Relatório de Receitas</h3>
                        <p className="card-subtitle">Análise detalhada das suas receitas</p>
                    </div>
                    <div className="report-content">
                        <div className="report-item">
                            <div className="report-label">Salário</div>
                            <div className="report-value">R$ 5.000,00</div>
                            <div className="report-percentage">58.8%</div>
                        </div>
                        <div className="report-item">
                            <div className="report-label">Freelance</div>
                            <div className="report-value">R$ 1.200,00</div>
                            <div className="report-percentage">14.1%</div>
                        </div>
                        <div className="report-item">
                            <div className="report-label">Investimentos</div>
                            <div className="report-value">R$ 2.300,00</div>
                            <div className="report-percentage">27.1%</div>
                        </div>
                    </div>
                    <Button 
                        label="Ver Relatório Completo" 
                        className="modern-btn modern-btn-secondary"
                        style={{ width: '100%', marginTop: '20px' }}
                    />
                </div>

                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="card-header">
                        <h3 className="card-title">📉 Relatório de Despesas</h3>
                        <p className="card-subtitle">Análise detalhada das suas despesas</p>
                    </div>
                    <div className="report-content">
                        <div className="report-item">
                            <div className="report-label">Moradia</div>
                            <div className="report-value">R$ 1.500,00</div>
                            <div className="report-percentage">42.9%</div>
                        </div>
                        <div className="report-item">
                            <div className="report-label">Alimentação</div>
                            <div className="report-value">R$ 650,00</div>
                            <div className="report-percentage">18.6%</div>
                        </div>
                        <div className="report-item">
                            <div className="report-label">Transporte</div>
                            <div className="report-value">R$ 320,00</div>
                            <div className="report-percentage">9.1%</div>
                        </div>
                        <div className="report-item">
                            <div className="report-label">Outros</div>
                            <div className="report-value">R$ 1.030,00</div>
                            <div className="report-percentage">29.4%</div>
                        </div>
                    </div>
                    <Button 
                        label="Ver Relatório Completo" 
                        className="modern-btn modern-btn-secondary"
                        style={{ width: '100%', marginTop: '20px' }}
                    />
                </div>
            </div>

            {/* Quick Reports */}
            <div className="modern-grid modern-grid-3">
                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="card-header">
                        <h3 className="card-title">📅 Relatório Mensal</h3>
                        <p className="card-subtitle">Janeiro 2024</p>
                    </div>
                    <div className="quick-report">
                        <div className="quick-stat">
                            <span className="quick-label">Receitas:</span>
                            <span className="quick-value positive">R$ 8.500,00</span>
                        </div>
                        <div className="quick-stat">
                            <span className="quick-label">Despesas:</span>
                            <span className="quick-value negative">R$ 3.500,00</span>
                        </div>
                        <div className="quick-stat">
                            <span className="quick-label">Saldo:</span>
                            <span className="quick-value positive">R$ 5.000,00</span>
                        </div>
                    </div>
                    <Button 
                        label="Gerar PDF" 
                        icon="pi pi-file-pdf"
                        className="modern-btn"
                        style={{ width: '100%', marginTop: '16px' }}
                    />
                </div>

                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="card-header">
                        <h3 className="card-title">📊 Relatório por Categoria</h3>
                        <p className="card-subtitle">Análise por categoria</p>
                    </div>
                    <div className="category-analysis">
                        <div className="category-item">
                            <div className="category-name">Moradia</div>
                            <div className="category-bar">
                                <div className="category-fill" style={{ width: '85%' }}></div>
                            </div>
                            <div className="category-percentage">85%</div>
                        </div>
                        <div className="category-item">
                            <div className="category-name">Alimentação</div>
                            <div className="category-bar">
                                <div className="category-fill" style={{ width: '60%' }}></div>
                            </div>
                            <div className="category-percentage">60%</div>
                        </div>
                        <div className="category-item">
                            <div className="category-name">Transporte</div>
                            <div className="category-bar">
                                <div className="category-fill" style={{ width: '40%' }}></div>
                            </div>
                            <div className="category-percentage">40%</div>
                        </div>
                    </div>
                    <Button 
                        label="Ver Detalhes" 
                        icon="pi pi-chart-bar"
                        className="modern-btn"
                        style={{ width: '100%', marginTop: '16px' }}
                    />
                </div>

                <div className="modern-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="card-header">
                        <h3 className="card-title">📈 Tendências</h3>
                        <p className="card-subtitle">Evolução dos últimos meses</p>
                    </div>
                    <div className="trend-analysis">
                        <div className="trend-item">
                            <div className="trend-label">Receitas</div>
                            <div className="trend-value positive">↗ +12.5%</div>
                        </div>
                        <div className="trend-item">
                            <div className="trend-label">Despesas</div>
                            <div className="trend-value negative">↘ -5.1%</div>
                        </div>
                        <div className="trend-item">
                            <div className="trend-label">Saldo</div>
                            <div className="trend-value positive">↗ +18.2%</div>
                        </div>
                    </div>
                    <Button 
                        label="Ver Gráficos" 
                        icon="pi pi-chart-line"
                        className="modern-btn"
                        style={{ width: '100%', marginTop: '16px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RelatoriosPage;