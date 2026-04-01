interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home', label: 'Home' },
  { value: 'outdoors', label: 'Outdoors' },
];
export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <select
      className="glass-panel px-4 py-3 text-[var(--text-main)] outline-none text-base cursor-pointer appearance-none"
      value={selected}
      onChange={e => onChange(e.target.value)}
    >
      {categories.map(cat => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  );
}
