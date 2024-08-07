import { useState } from 'react';
import MarketItemCard from './MarketItemCard';
import type { Item } from 'src/common/types';

const test_items = [
  {
    item: 'apple',
    display: 'Apple',
    amount: 10,
    price: 150,
    seller: 'John',
  },
  {
    item: 'arrow',
    display: 'Arrow',
    amount: 5,
    price: 250,
    seller: 'John',
  },
];

export default function Market() {
  const [items, setItems] = useState(test_items);
  const [cart, setCart] = useState<Item[]>([]);

  function addItemToCart(item: Item) {
    setItems(items.filter((i) => i !== item));
    setCart([...cart, item]);
  }

  function removeItemFromCart(index: number) {
    setItems([...items, cart[index]]);
    setCart(cart.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
    setItems([...items, ...cart]);
  }

  function requestItems() {
    // Send a request to the server to buy the items in the cart
    // and update the items in the market
    // websocket.send({ type: 'buy_items', items: cart });
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-lg">Market</h3>
          <button className="text-center bg-green-700 px-4 py-1 rounded-md">
            Reload
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          <div className="grid grid-cols-5 px-2 py-1.5 bg-gray-500/50 rounded-md font-semibold">
            <span>Item</span>
            <span>Display</span>
            <span>Amount</span>
            <span>Price</span>
            <span>Seller</span>
          </div>
          {items.length === 0 ? (
            <p className="text-center border border-dashed rounded-md py-1.5">
              No items avaible
            </p>
          ) : (
            items.map((item, index) => (
              <MarketItemCard
                key={index}
                item={item}
                onClick={() => addItemToCart(items[index])}
              />
            ))
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-lg">Your items</h3>
        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-48 border border-dashed rounded-md">
            <p>Click any item in the list to add to the cart</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {cart.map((item, index) => (
              <MarketItemCard
                key={index}
                item={item}
                onClick={() => removeItemFromCart(cart.indexOf(item))}
              />
            ))}
          </ul>
        )}
        <div className="flex items-center gap-4">
          <button
            className="text-center bg-green-700 px-4 py-1 rounded-md"
            onClick={requestItems}
          >
            Request
          </button>
          <button
            className="text-center bg-green-700 px-4 py-1 rounded-md"
            onClick={clearCart}
          >
            Clear items
          </button>
        </div>
      </div>
    </div>
  );
}
