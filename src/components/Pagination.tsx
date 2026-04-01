import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGE_SIZE_OPTIONS } from '../hooks/useProducts';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

function buildPageWindows(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const lo = Math.max(2, page - 1);
  const hi = Math.min(total - 1, page + 1);
  return [
    1,
    ...(lo > 2 ? ['…' as const] : []),
    ...Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
    ...(hi < total - 1 ? ['…' as const] : []),
    total,
  ];
}

const btn = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border border-[var(--border)] bg-white/65 backdrop-blur transition-all duration-150';

export function Pagination({ page, totalPages, total, limit, onPageChange, onLimitChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end   = Math.min(page * limit, total);
  const pages = buildPageWindows(page, totalPages);

  return (
    <div className='flex flex-row-reverse justify-start gap-4'>
    <div className="flex flex-col items-end gap-4">
      <p className="text-[0.82rem] text-[var(--text-muted)]">
        Showing <strong>{start}–{end}</strong> of <strong>{total}</strong> products
      </p>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
          className={`${btn} ${page === 1 ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer text-[var(--text-main)]'}`}>
          <ChevronLeft size={15} />
        </button>

        {pages.map((p) =>
        <button key={p} onClick={() => onPageChange(p as number)}
                className={`${btn} cursor-pointer ${p === page ? 'bg-[var(--primary)] text-black border-[var(--primary)]' : 'text-[var(--text-main)]'}`}>
                {p}
              </button>
        )}

        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
          className={`${btn} ${page === totalPages ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer text-[var(--text-main)]'}`}>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
       <div className="flex flex-col justify-between items-center gap-2 text-sm text-[var(--text-muted)]">
        <span>Items Per page</span>
        <select
          value={limit}
          onChange={e => onLimitChange(Number(e.target.value))}
          className="glass-panel px-2 py-1 text-sm text-[var(--text-main)] cursor-pointer rounded-lg"
        >
          {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      </div>
  );
}

