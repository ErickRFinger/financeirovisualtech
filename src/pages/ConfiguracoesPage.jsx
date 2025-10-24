import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';

const ConfiguracoesPage = () => {
    const [moeda, setMoeda] = useState('BRL');
    const [formatoData, setFormatoData] = useState('dd/MM/yyyy');
    const [tema, setTema] = useState('dark');
    const [notificacoes, setNotificacoes] = useState(true);

    const moedaOptions = [
        { label: 'Real (BRL)', value: 'BRL' },
        { label: 'Dólar (USD)', value: 'USD' },
        { label: 'Euro (EUR)', value: 'EUR' }
    ];

    const formatoDataOptions = [
        { label: 'DD/MM/AAAA', value: 'dd/MM/yyyy' },
        { label: 'MM/DD/AAAA', value: 'MM/dd/yyyy' },
        { label: 'AAAA-MM-DD', value: 'yyyy-MM-dd' }
    ];

    const temaOptions = [
        { label: '🌙 Escuro', value: 'dark' },
        { label: '☀️ Claro', value: 'light' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: 'var(--primary-color)'
            }}>
                ⚙️ Configurações
            </h1>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                gap: '20px'
            }}>
                <Card title="🌍 Preferências Gerais">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label>Moeda:</label>
                            <Dropdown 
                                options={moedaOptions} 
                                value={moeda} 
                                onChange={(e) => setMoeda(e.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label>Formato de Data:</label>
                            <Dropdown 
                                options={formatoDataOptions} 
                                value={formatoData} 
                                onChange={(e) => setFormatoData(e.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label>Tema:</label>
                            <Dropdown 
                                options={temaOptions} 
                                value={tema} 
                                onChange={(e) => setTema(e.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </Card>

                <Card title="🔔 Notificações">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Notificações por Email</span>
                            <ToggleButton 
                                checked={notificacoes} 
                                onChange={(e) => setNotificacoes(e.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Lembretes de Vencimento</span>
                            <ToggleButton checked={true} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Relatórios Semanais</span>
                            <ToggleButton checked={false} />
                        </div>
                    </div>
                </Card>

                <Card title="👤 Perfil do Usuário">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label>Nome:</label>
                            <InputText style={{ width: '100%' }} placeholder="Seu nome completo" />
                        </div>
                        <div>
                            <label>Email:</label>
                            <InputText style={{ width: '100%' }} placeholder="seu@email.com" />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <InputText style={{ width: '100%' }} placeholder="(11) 99999-9999" />
                        </div>
                    </div>
                </Card>

                <Card title="🔒 Segurança">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label>Senha Atual:</label>
                            <InputText type="password" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label>Nova Senha:</label>
                            <InputText type="password" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label>Confirmar Senha:</label>
                            <InputText type="password" style={{ width: '100%' }} />
                        </div>
                    </div>
                </Card>
            </div>

            <Card title="💾 Ações" style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button 
                        label="💾 Salvar Configurações" 
                        icon="pi pi-save" 
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        label="🔄 Restaurar Padrões" 
                        icon="pi pi-refresh" 
                        severity="secondary"
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        label="📤 Exportar Configurações" 
                        icon="pi pi-download" 
                        severity="info"
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        label="🗑️ Excluir Conta" 
                        icon="pi pi-trash" 
                        severity="danger"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ConfiguracoesPage;