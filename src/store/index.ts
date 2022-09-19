import { ISelectedOption } from '@components/SelectedOption';

const LOCAL_STORAGE_KEY = 'products_cart';

interface ICartItem {
  productId: number;
  optionId: number;
  quantity: number;
}

const addCart = (productId: number, products: ISelectedOption[]) => {
  const data = getCart();
  products.forEach(({ optionId, quantity }) => {
    const idx = data.findIndex(({ productId: id, optionId: oid }) => id === productId && optionId === +oid);
    if (idx >= 0) data[idx].quantity = quantity;
    else data.push({ productId, optionId, quantity });
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const getCart = (): ICartItem[] => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
};

const removeCart = (productId?: number, optionId?: number) => {
  if (productId === undefined || optionId === undefined) localStorage.removeItem(LOCAL_STORAGE_KEY);
  else {
    const cart = getCart();
    const idx = cart.findIndex(({ productId: pid, optionId: oid }) => productId === pid && optionId === oid);
    if (idx >= 0) {
      cart.splice(idx, 1);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    }
  }
};

export { addCart, getCart, removeCart };
