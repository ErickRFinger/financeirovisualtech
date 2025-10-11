
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const DataList = ({ title, data, onAdd, onDelete }) => {

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{title}</h3>
        <Button variant="primary" onClick={onAdd}>Adicionar</Button>
      </div>
      {data.length === 0 ? (
        <div className="text-center p-5 border rounded">
          <p className="text-muted">Nenhum item para exibir.</p>
        </div>
      ) : (
        <ListGroup>
          {data.map(item => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{item.description || item.name}</div>
                <small className="text-muted">
                  {formatCurrency(item.amount)} - {formatDate(item.date || item.created_at)}
                </small>
              </div>
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)}>
                <Trash />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default DataList;
