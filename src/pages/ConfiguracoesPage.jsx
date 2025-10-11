
import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { useState } from 'react';

const ConfiguracoesPage = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Configurações</h1>
            <div className="flex align-items-center">
                <InputSwitch checked={darkMode} onChange={(e) => setDarkMode(e.value)} />
                <span className="ml-2">Modo Escuro</span>
            </div>
        </div>
    );
};

export default ConfiguracoesPage;
