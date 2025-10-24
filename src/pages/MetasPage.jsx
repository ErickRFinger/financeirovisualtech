import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

const MetasPage = () => {
    const [metas, setMetas] = useState([
        { nome: 'Reserva de Emergência', valorAtual: 5000, valorMeta: 10000, prazo: '2024-12-31' },
        { nome: 'Viagem para Europa', valorAtual: 2000, valorMeta: 15000, prazo: '2024-06-30' },
        { nome: 'Carro Novo', valorAtual: 8000, valorMeta: 50000, prazo: '2024-12-31' }
    ]);

    const calcularProgresso = (atual, meta) => {
        return (atual / meta) * 100;
    };

    const handleNovaMeta = () => {
        console.log('Nova meta');
        alert('Funcionalidade de nova meta será implementada em breve!');
    };

    const handleEditarMeta = (id) => {
        console.log('Editar meta:', id);
        alert('Funcionalidade de edição será implementada em breve!');
    };

    const handleExcluirMeta = (id) => {
        console.log('Excluir meta:', id);
        if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
            console.log('Meta excluída:', id);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                }}>
                    🎯 Metas Financeiras
                </h1>
                <Button 
                    label="➕ Nova Meta" 
                    icon="pi pi-plus" 
                    onClick={handleNovaMeta}
                />
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                gap: '20px'
            }}>
                {metas.map((meta, index) => (
                    <Card key={index} title={meta.nome}>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span>Progresso:</span>
                                <span>{calcularProgresso(meta.valorAtual, meta.valorMeta).toFixed(1)}%</span>
                            </div>
                            <ProgressBar 
                                value={calcularProgresso(meta.valorAtual, meta.valorMeta)} 
                                style={{ height: '10px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Atual: R$ {meta.valorAtual.toLocaleString('pt-BR')}</span>
                            <span>Meta: R$ {meta.valorMeta.toLocaleString('pt-BR')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span>Faltam: R$ {(meta.valorMeta - meta.valorAtual).toLocaleString('pt-BR')}</span>
                            <span>Prazo: {new Date(meta.prazo).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Button icon="pi pi-pencil" size="small" severity="info" onClick={() => handleEditarMeta(meta.nome)} />
                            <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleExcluirMeta(meta.nome)} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MetasPage;