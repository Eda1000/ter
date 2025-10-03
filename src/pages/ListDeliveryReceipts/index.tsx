import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { toast } from 'react-toastify';

import { Header } from '../../components/Header';
import api from '../../services/api';

export const ListDeliveryReceipts = () => {
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchReceipts();
  }, [page]);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/delivery-receipts?page=${page}`);
      setReceipts(response.data.results || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      toast.error('Erro ao carregar comprovantes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Comprovantes de Entrega</h1>
        <Link to="/comprovantes/adicionar">
          <button>Adicionar Comprovante</button>
        </Link>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            {receipts.map((receipt) => (
              <div key={receipt.id}>
                <p>{receipt.description}</p>
              </div>
            ))}
          </div>
        )}
        <Pagination
          current={page}
          total={total}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
};

export default ListDeliveryReceipts;
