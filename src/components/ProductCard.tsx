import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
const extractProductName = (name: string) => {
  return name.replace(/\s+\S+$/, '');
}
  return (
    <article className="w-full group overflow-hidden flex flex-col h-full">
      <div className="relative pt-[66.66%] overflow-hidden shrink-0 rounded-t-[6px] rounded-b-[4px]">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="group-hover:scale-105 absolute inset-0 w-full h-full aspect-[209px/210px] object-cover transition-transform duration-500"
        />
      </div>

      <div className="p-2 font-murecho bg-white flex-1 flex flex-col gap-2">
        <span className='text-sm font-[#5A6573]'>
          {extractProductName(product.name)}
        </span>
          <h2
            title={product.name}
          className="text-[16px] font-[575] text-[#1A2B3D] line-clamp-2 "
          >
            {product.name}
          </h2>
        <span className="text-[20px] font-[475] text-[#1882FF] whitespace-nowrap shrink-0">
          ৳{product.price.toLocaleString()}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;