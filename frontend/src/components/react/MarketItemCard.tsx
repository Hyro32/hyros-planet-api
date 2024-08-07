import type { Item } from '../../common/types';

interface MarketItemCardProps {
  item: Item;
  onClick?: () => void;
}

export default function MarketItemCard({ item, onClick }: MarketItemCardProps) {
  return (
    <button
      onClick={onClick}
      className="grid grid-cols-5 px-2 py-1.5 bg-gray-500/25 rounded-md select-none text-start"
    >
      <img src={`items/${item.item}.png`} alt={item.item} className="w-5 h-5" />
      <span>{item.display}</span>
      <span>x{item.amount}</span>
      <span>{item.price} coins</span>
      <span>{item.seller}</span>
    </button>
  );
}
