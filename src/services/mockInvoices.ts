import { ListInvoice } from '../Interfaces/ListInvoices';

const mockInvoices: ListInvoice[] = [
  {
    id: '1',
    order_number: 'ORD-001',
    invoice_number: '12345',
    client_name: 'Cliente Exemplo 1',
    cubage: '10.5',
    truck_id: null,
    name: null,
    amount_boxes: 5,
    position: 'Posição A',
    status: 'Pendente',
    created_at: '2025-10-04',
    collection_information_id: 'col-001',
    formatted_invoice: null,
  },
  {
    id: '2',
    order_number: 'ORD-002',
    invoice_number: '12346',
    client_name: 'Cliente Exemplo 2',
    cubage: '15.3',
    truck_id: '1',
    name: 'Caminhão 01',
    amount_boxes: 8,
    position: 'Posição B',
    status: 'Em Rota',
    created_at: '2025-10-04',
    collection_information_id: 'col-002',
    formatted_invoice: null,
  },
  {
    id: '3',
    order_number: 'ORD-003',
    invoice_number: '12347',
    client_name: 'Cliente Exemplo 3',
    cubage: '8.2',
    truck_id: '2',
    name: 'Caminhão 02',
    amount_boxes: 3,
    position: 'Posição C',
    status: 'Entregue',
    created_at: '2025-10-03',
    collection_information_id: 'col-003',
    formatted_invoice: null,
  },
];

export const mockGetInvoices = async (params: {
  page: number;
  limit: number;
  querySearch?: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;
      const results = mockInvoices.slice(start, end);

      resolve({
        data: {
          results,
          page: params.page,
          total: mockInvoices.length,
        },
      });
    }, 500);
  });
};
