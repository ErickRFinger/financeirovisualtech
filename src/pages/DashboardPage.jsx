
import React from 'react';
import { Card } from 'primereact/card';

const DashboardPage = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <div className="grid">
                <div className="col-12 md:col-6 lg:col-3">
                    <Card title="Saldo Atual" className="h-full">
                        <p className="text-2xl font-bold text-green-500">R$ 1.234,56</p>
                    </Card>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Card title="Receitas do Mês" className="h-full">
                        <p className="text-2xl font-bold text-blue-500">R$ 5.678,90</p>
                    </Card>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Card title="Despesas do Mês" className="h-full">
                        <p className="text-2xl font-bold text-red-500">R$ 4.321,09</p>
                    </Card>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Card title="Balanço do Mês" className="h-full">
                        <p className="text-2xl font-bold text-yellow-500">R$ 1.357,81</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
