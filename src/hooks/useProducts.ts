import { useCallback, useState } from 'react';

export const PAGE_SIZE_OPTIONS = [8, 16, 24, 32, 48];

export function useProducts() {
  const [page, setPageState] = useState(1);
  const [limit, setLimitState] = useState(16);
  const [category, setCategoryState] = useState('');
  const [search, setSearchState] = useState('');

  const setPage = useCallback((newPage: number) => setPageState(newPage), []);

  const setLimit = useCallback((newLimit: number) => {
    setLimitState(newLimit);
    setPageState(1);
  }, []);

  const setCategory = useCallback((newCat: string) => {
    setCategoryState(newCat);
    setPageState(1);
  }, []);

  const setSearch = useCallback((newSearch: string) => {
    setSearchState(newSearch);
    setPageState(1);
  }, []);

  return { page, limit, category, search, setPage, setLimit, setCategory, setSearch };
}
