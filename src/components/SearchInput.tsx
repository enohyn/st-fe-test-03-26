import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchInputProps {
  onSearch: (value: string) => void;
  debounceMs?: number;
}

export function SearchInput({ onSearch, debounceMs = 400 }: SearchInputProps) {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, debounceMs);

  useEffect(() => {
    onSearch(debounced.length >= 3 ? debounced : '');
  }, [debounced, onSearch]);

  return (
    <div className="glass-panel flex items-center px-4 py-3 flex-1 max-w-[400px]">
      <Search size={20} color="var(--text-muted)" className="mr-3 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search products..."
        className="bg-transparent border-0 text-[var(--text-main)] outline-none w-full text-base"
      />
    </div>
  );
}
