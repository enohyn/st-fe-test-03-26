import { PackageSearch } from 'lucide-react';
import { lazy, Suspense, use } from 'react';
import type { PaginatedResponse, Product } from '../types/product';
import { Pagination } from './Pagination';
import { ProductCardSkeleton } from './ProductCardSkeleton';

const ProductCard = lazy(() => import('./ProductCard'));

interface ProductGridProps {
  productsPromise: Promise<PaginatedResponse<Product>>;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

function SkeletonGrid({ limit }: { limit: number }) {
  return (
    <div className="grid justify-around gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, 209px)' }}>
      {Array.from({ length: limit }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function Grid({ productsPromise, page, limit, onPageChange, onLimitChange }: ProductGridProps) {
  const { data: products, totalPages, total } = use(productsPromise);

  if (products.length === 0) {
    return (
      <div className="glass-panel flex flex-col items-center px-8 py-16 text-center gap-3">
        <PackageSearch size={44} color="var(--text-muted)" />
        <h2 className="text-[1.1rem] font-semibold">No products found</h2>
        <p className="text-[var(--text-muted)] text-sm">Try adjusting your search or category filter.</p>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<SkeletonGrid limit={limit} />}>
        <div className="grid justify-around gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, 209px)' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={page} totalPages={totalPages} total={total} limit={limit} onPageChange={onPageChange} onLimitChange={onLimitChange} />
        </div>
      )}
    </>
  );
}

export function ProductGrid(props: ProductGridProps) {
  return (
    <Suspense fallback={<SkeletonGrid limit={props.limit} />}>
      <Grid {...props} />
    </Suspense>
  );
}

