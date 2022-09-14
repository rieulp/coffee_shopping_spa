import { ISelectedOption } from '@components/SelectedOption';

const LOCAL_STORAGE_KEY = 'products_cart';

interface ICartItem {
  productId: number;
  optionId: number;
  quantity: number;
}

const addCart = (productId: number, products: ISelectedOption[]) => {
  const data = getCart();
  console.log(data);
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

const removeCart = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export { addCart, getCart, removeCart };
