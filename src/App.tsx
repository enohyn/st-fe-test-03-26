import { useCallback, useMemo, useState } from 'react';
import { CategoryFilter } from './components/CategoryFilter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProductGrid } from './components/ProductGrid';
import { SearchInput } from './components/SearchInput';
import { useProducts } from './hooks/useProducts';
import { api } from './services/api';

function App() {
  const { page, limit, category, search, setPage, setLimit, setCategory, setSearch } = useProducts();
  const [retryToken, setRetryToken] = useState(0);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setPage]);

  const handleRetry = useCallback(() => setRetryToken(t => t + 1), []);

  const productsPromise = useMemo(
    () => api.fetchProducts({ page, limit, category: category || '', search: search || '' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, limit, category, search, retryToken],
  );

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="glass-panel p-8 mb-8">
        <h1 className="text-3xl font-semibold mb-2">Premium Products</h1>
        <p className="text-[var(--text-muted)]">
          Browse our collection. Handling the flaky API gracefully is part of the challenge.
        </p>
      </header>

      {/* Controls */}
      <section className="flex gap-4 mb-8">
        <SearchInput onSearch={setSearch} />
        <CategoryFilter selected={category} onChange={setCategory} />
      </section>

      <main>
        <ErrorBoundary resetKey={`${page}-${limit}-${category}-${search}`} onRetry={handleRetry}>
          <ProductGrid productsPromise={productsPromise} page={page} limit={limit} onPageChange={handlePageChange} onLimitChange={setLimit} />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
