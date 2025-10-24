import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { supabase } from '../supabaseClient';

const MainLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [theme, setTheme] = useState('dark');
    const navigate = useNavigate();

    useEffect(() => {
        // Aplicar tema ao body
        document.body.setAttribute('data-theme', theme);
        // Salvar preferência
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        // Carregar tema salvo
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const menuItems = [
        {
            label: 'Dashboard',
            icon: 'pi pi-chart-line',
            to: '/dashboard',
            description: 'Visão geral das finanças',
            color: 'blue'
        },
        {
            label: 'Lançamentos',
            icon: 'pi pi-money-bill',
            to: '/lancamentos',
            description: 'Receitas e despesas',
            color: 'green'
        },
        {
            label: 'Contas a Pagar',
            icon: 'pi pi-credit-card',
            to: '/contas-a-pagar',
            description: 'Bills e pagamentos',
            color: 'red'
        },
        {
            label: 'Contas a Receber',
            icon: 'pi pi-wallet',
            to: '/contas-a-receber',
            description: 'Cobranças pendentes',
            color: 'orange'
        },
        {
            label: 'Relatórios',
            icon: 'pi pi-chart-bar',
            to: '/relatorios',
            description: 'Análises e gráficos',
            color: 'purple'
        },
        {
            label: 'Categorias',
            icon: 'pi pi-tags',
            to: '/categorias',
            description: 'Organize suas categorias',
            color: 'cyan'
        },
        {
            label: 'Metas',
            icon: 'pi pi-flag',
            to: '/metas',
            description: 'Objetivos financeiros',
            color: 'pink'
        },
        {
            label: 'Investimentos',
            icon: 'pi pi-chart-pie',
            to: '/investimentos',
            description: 'Portfolio e ativos',
            color: 'teal'
        },
        {
            label: 'Orçamento',
            icon: 'pi pi-calendar',
            to: '/orcamento',
            description: 'Controle mensal',
            color: 'indigo'
        },
        {
            label: 'Comprovantes',
            icon: 'pi pi-file-image',
            to: '/comprovantes',
            description: 'Documentos digitalizados',
            color: 'amber'
        },
        {
            label: 'Backup',
            icon: 'pi pi-cloud-upload',
            to: '/backup',
            description: 'Exportar dados',
            color: 'lime'
        },
        {
            label: 'Configurações',
            icon: 'pi pi-cog',
            to: '/configuracoes',
            description: 'Preferências do sistema',
            color: 'gray'
        },
    ];

    const sidebarContent = (
        <div className="sidebar-content">
            {/* Header */}
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon">💰</div>
                    <div className="logo-text">
                        <h3 className="logo-title">Financeiro</h3>
                        <p className="logo-subtitle">Visual Tech</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item) => (
                        <li key={item.label} className="nav-item-wrapper">
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => 
                                    `nav-item ${isActive ? 'active' : ''}`
                                }
                            >
                                <i className={`nav-icon ${item.icon}`}></i>
                                <div className="nav-content">
                                    <span className="nav-label">{item.label}</span>
                                    <span className="nav-description">{item.description}</span>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <div className="theme-toggle">
                    <button
                        onClick={toggleTheme}
                        className="modern-btn modern-btn-secondary"
                        style={{ width: '100%', marginBottom: '12px' }}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                    </button>
                </div>
                <button
                    onClick={handleLogout}
                    className="modern-btn"
                    style={{ 
                        width: '100%', 
                        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                        border: 'none'
                    }}
                >
                    🚪 Sair do Sistema
                </button>
            </div>
        </div>
    );

    return (
        <div className="main-layout">
            {/* Sidebar Desktop */}
            <aside className="sidebar">
                {sidebarContent}
            </aside>

            {/* Mobile Menu Button */}
            <div className="mobile-menu-btn">
                <Button
                    icon="pi pi-bars"
                    onClick={() => setSidebarVisible(true)}
                    className="p-button-rounded p-button-text"
                    style={{ 
                        color: 'var(--primary-color)',
                        fontSize: '1.5rem'
                    }}
                />
            </div>

            {/* Sidebar Mobile */}
            <Sidebar
                visible={sidebarVisible}
                onHide={() => setSidebarVisible(false)}
                style={{ width: '280px' }}
                className="mobile-sidebar"
            >
                {sidebarContent}
            </Sidebar>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;