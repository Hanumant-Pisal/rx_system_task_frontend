import { useState, useMemo } from 'react';

export default function Table({ 
  columns = [], 
  data = [],
  defaultSortField = '',
  defaultSortDirection = 'asc'
}) {
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortField,
    direction: defaultSortDirection,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      
      if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;

      
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="overflow-x-auto border rounded-xl bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((c) => (
              <th 
                key={c.key} 
                className={`text-left p-3 font-medium ${c.sortable ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                onClick={() => c.sortable !== false && requestSort(c.key)}
              >
                {c.title}
                {c.sortable !== false && getSortIndicator(c.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 && (
            <tr>
              <td className="p-3" colSpan={columns.length}>
                No data
              </td>
            </tr>
          )}
          {sortedData.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((c) => (
                <td key={c.key} className="p-3">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}