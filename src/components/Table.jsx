import React from 'react';

const Table = ({ columns, data, onRowClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <table className="table table-bordered table-hover mt-4">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} scope="col">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center' }}>
              No hay datos disponibles.
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
