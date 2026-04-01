export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="pt-[66%] bg-slate-200" style={{ animation: 'shimmer 1.6s ease-in-out infinite' }} />

      <div className="pt-[16px] px-5 pb-5 flex flex-col gap-[10px]">
        <div className="flex justify-between gap-4">
          <div className="skeleton-line h-[15px] w-[60%]" />
          <div className="skeleton-line h-[15px] w-[18%]" />
        </div>

        <div className="skeleton-line h-[15px] w-full" />
        <div className="skeleton-line h-[15px] w-[75%]" />

      </div>
    </div>
  );
}
