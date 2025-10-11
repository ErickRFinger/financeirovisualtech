
// src/layout/MainLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { supabase } from '../supabaseClient';

const MainLayout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const menuItems = [
        { label: 'Dashboard', icon: 'pi pi-th-large', to: '/' },
        { label: 'Lançamentos', icon: 'pi pi-dollar', to: '/lancamentos' },
        { label: 'Contas a Pagar', icon: 'pi pi-arrow-down', to: '/contas-a-pagar' },
        { label: 'Contas a Receber', icon: 'pi pi-arrow-up', to: '/contas-a-receber' },
        { label: 'Configurações', icon: 'pi pi-cog', to: '/configuracoes' },
    ];

    const sidebarContent = (
        <div className="flex flex-column h-full">
            <div className="p-2 flex align-items-center">
                <img src="/LOGOS/VISUAL TECH.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                <span className="font-bold">Financeiro</span>
            </div>
            <ul className="mt-4 list-none p-0">
                {menuItems.map((item) => (
                    <li key={item.label}>
                        <NavLink to={item.to} className={({ isActive }) => `flex align-items-center p-3 ripple ${isActive ? 'bg-gray-700' : ''}`}>
                            <i className={`${item.icon} mr-2`}></i>
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="mt-auto p-3">
                <Button label="Sair" icon="pi pi-sign-out" className="w-full" onClick={handleLogout} />
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-800 text-white">
            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} className="w-18rem bg-gray-900">
                {sidebarContent}
            </Sidebar>
            <div className="hidden lg:block w-18rem bg-gray-900">
                 {sidebarContent}
            </div>

            <div className="flex-grow-1 p-4">
                 <Button icon="pi pi-bars" onClick={() => setSidebarVisible(true)} className="p-button-text text-white lg:hidden" />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
