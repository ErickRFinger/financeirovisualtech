import React from 'react';

const TestPage = () => {
    return (
        <div style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
        }}>
            <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: '#333'
            }}>
                🧪 Página de Teste
            </h1>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                    ✅ Se você está vendo esta página, o sistema está funcionando!
                </p>
                <p style={{ fontSize: '16px', color: '#666' }}>
                    📅 Data: {new Date().toLocaleString('pt-BR')}
                </p>
                <p style={{ fontSize: '16px', color: '#666' }}>
                    🚀 Sistema Financeiro Visual Tech - Versão 1.0
                </p>
            </div>
        </div>
    );
};

export default TestPage;
