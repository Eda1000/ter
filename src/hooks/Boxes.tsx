import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';

import { toast } from 'react-toastify';

import api from '../services/api';
import { useAuth } from '../hooks/Auth';

export interface Boxes {
  id: string;
  name: string;
  utilization: number;
  height: string;
  width: string;
  length: string;
  cubage: string;
  weight: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  quantity?: string | number;
}

export interface IBoxesList {
  box: Boxes;
}

interface BoxesContextData {
  boxes: Boxes[];
  setBoxes: Dispatch<SetStateAction<Boxes[]>>;
  fetchBoxes: (value: string, resetPage: boolean, addPage: boolean) => void;
  fetchBoxesCreateAt: (
    value: string,
    resetPage: boolean,
    addPage: boolean,
  ) => void;
  fetchBoxesUtilization: (
    value: string,
    resetPage: boolean,
    addPage: boolean,
  ) => void;
  orderFilter: string;
  setOrderFilter: Dispatch<SetStateAction<string>>;
  nameFilterApi: boolean;
  setNameFilterApi: Dispatch<SetStateAction<boolean>>;
  createdAtFilterApi: boolean;
  setCreatedAtFilterApi: Dispatch<SetStateAction<boolean>>;
  createdAtFilterState: string;
  setCreatedAtFilterState: Dispatch<SetStateAction<string>>;
  utilizationFilterApi: boolean;
  setUtilizationFilterApi: Dispatch<SetStateAction<boolean>>;
  utilizationFilterState: string;
  setUtilizationFilterState: Dispatch<SetStateAction<string>>;
  boxesSearch: string;
  setBoxesSearch: Dispatch<SetStateAction<string>>;
  searchBoxes: () => void;
  loading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
}

const BoxesContext = createContext<BoxesContextData>({} as BoxesContextData);

const BoxesProvider: React.FC = ({ children }) => {
  const { data } = useAuth();
  const [boxes, setBoxes] = useState<Boxes[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>('ASC');
  const [nameFilterApi, setNameFilterApi] = useState<boolean>(false);
  const [createdAtFilterApi, setCreatedAtFilterApi] = useState<boolean>(false);
  const [createdAtFilterState, setCreatedAtFilterState] = useState<string>('');
  const [utilizationFilterApi, setUtilizationFilterApi] =
    useState<boolean>(false);
  const [utilizationFilterState, setUtilizationFilterState] =
    useState<string>('');
  const [boxesSearch, setBoxesSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBoxes = async (
    value: string,
    resetPage = false,
    addPage = false,
  ) => {
    let nameFilter = 'name';
    let orderFilter = 'ASC';

    if (value === 'NomeMais' || value === 'ASC') {
      orderFilter = 'ASC';
      setOrderFilter('ASC');
    } else {
      orderFilter = 'DESC';
      setOrderFilter('DESC');
    }

    let pageIndex = page;

    if (resetPage) {
      pageIndex = 1;
      setPage(1);
    }

    if (addPage) {
      pageIndex = pageIndex + 1;
      setPage((prevPage) => prevPage + 1);
    }

    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${data.access_token}` };
      const res = await api.get(
        `/boxes?sortBy=${nameFilter}&orderBy=${orderFilter}&page=${pageIndex}&limit=10`,
        {
          headers,
        },
      );

      if (resetPage) {
        setBoxes(res.data.results);
        console.log(res.data.results);
      } else {
        setBoxes([...boxes, ...res.data.results]);
      }

      setNameFilterApi(true);
      setCreatedAtFilterApi(false);
      setUtilizationFilterApi(false);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.toString());
      setLoading(false);
    }
  };

  const fetchBoxesCreateAt = async (
    value: string,
    resetPage = false,
    addPage = false,
  ) => {
    let nameFilter = 'created_at';
    let orderFilter = 'ASC';

    if (value === 'DataMais' || value === 'ASC') {
      orderFilter = 'ASC';
      setOrderFilter('ASC');
    } else {
      orderFilter = 'DESC';
      setOrderFilter('DESC');
    }

    let pageIndex = page;

    if (resetPage) {
      pageIndex = 1;
      setPage(1);
    }

    if (addPage) {
      pageIndex = pageIndex + 1;
      setPage((prevPage) => prevPage + 1);
    }

    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${data.access_token}` };
      const res = await api.get(
        `/boxes?sortBy=${nameFilter}&orderBy=${orderFilter}&page=${pageIndex}&limit=10`,
        {
          headers,
        },
      );

      if (resetPage) {
        setBoxes(res.data.results);
      } else {
        setBoxes([...boxes, ...res.data.results]);
      }

      setCreatedAtFilterApi(true);
      setNameFilterApi(false);
      setUtilizationFilterApi(false);
      setCreatedAtFilterState(value);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.toString());
      setLoading(false);
    }
  };

  const fetchBoxesUtilization = async (
    value: string,
    resetPage = false,
    addPage = false,
  ) => {
    let nameFilter = 'utilization';
    let orderFilter = 'ASC';

    if (value === 'UtilizaçõesMais' || value === 'ASC') {
      orderFilter = 'ASC';
      setOrderFilter('ASC');
    } else {
      orderFilter = 'DESC';
      setOrderFilter('DESC');
    }

    let pageIndex = page;

    if (resetPage) {
      pageIndex = 1;
      setPage(1);
    }

    if (addPage) {
      pageIndex = pageIndex + 1;
      setPage((prevPage) => prevPage + 1);
    }

    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${data.access_token}` };
      const res = await api.get(
        `/boxes?sortBy=${nameFilter}&orderBy=${orderFilter}&page=${pageIndex}&limit=10`,
        {
          headers,
        },
      );

      if (resetPage) {
        setBoxes(res.data.results);
      } else {
        setBoxes([...boxes, ...res.data.results]);
      }

      setUtilizationFilterApi(true);
      setCreatedAtFilterApi(false);
      setNameFilterApi(false);
      setUtilizationFilterState(value);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.toString());
      setLoading(false);
    }
  };

  const searchBoxes = async () => {
    const headers = { Authorization: `Bearer ${data.access_token}` };
    if (boxesSearch.trim() !== '') {
      const res = await api.get(`/boxes?q=${boxesSearch}`, {
        headers,
      });
      setBoxes(res.data.results);
    } else {
      const res = await api.get(`/boxes`, {
        headers,
      });
      setBoxes(res.data.results);
    }
  };

  return (
    <BoxesContext.Provider
      value={{
        boxes,
        setBoxes,
        fetchBoxes,
        fetchBoxesCreateAt,
        fetchBoxesUtilization,
        orderFilter,
        setOrderFilter,
        nameFilterApi,
        setNameFilterApi,
        createdAtFilterApi,
        setCreatedAtFilterApi,
        createdAtFilterState,
        setCreatedAtFilterState,
        utilizationFilterApi,
        setUtilizationFilterApi,
        utilizationFilterState,
        setUtilizationFilterState,
        boxesSearch,
        setBoxesSearch,
        searchBoxes,
        loading,
        page,
        setPage,
        setLoading,
        total,
        setTotal,
      }}
    >
      {children}
    </BoxesContext.Provider>
  );
};

function useBoxes(): BoxesContextData {
  const context = useContext(BoxesContext);

  if (!context) {
    throw new Error('useBoxes must be used within an BoxesProvider');
  }

  return context;
}

export { BoxesProvider, useBoxes };
