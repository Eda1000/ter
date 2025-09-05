import { FiSearch } from 'react-icons/fi';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Invoice } from '../../../../Interfaces/HomeInterface';
import api from '../../../../services/api';
import { SearchBar, SearchButton, SearchInput } from './_invoiceSearchBar';

interface Props {
  onSelectInvoice: (invoice: Invoice) => void;
}

export const InvoiceSearchBar = ({ onSelectInvoice }: Props) => {
  const [search, setSearch] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    try {
      const { data } = await api.get('/invoices/filter', {
        params: {
          value: search,
        },
      });

      if (!data.length) {
        toast.error('Nenhum registro encontrado');
        return;
      }

      onSelectInvoice(data?.[0]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <SearchBar onSubmit={handleSubmit}>
      <SearchInput
        placeholder="Buscar pela nº da nota ou pedido"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchButton>
        <FiSearch />
      </SearchButton>
    </SearchBar>
  );
};
