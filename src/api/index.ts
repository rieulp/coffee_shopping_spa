const cache: { [key: string]: any } = {};

export const request = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('API 통신 실패');
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    else message = String(e);
    alert(message);
  }
};

export const fetchProductList = async () => {
  if (cache.all) return cache.list;
  const data = await request(`api/products`);
  if (data) cache.list = data;
  return data || [];
};

export const fetchProduct = async (productId: number) => {
  if (cache[productId]) return cache[productId];
  const data = await request(`api/products/${productId}`);
  if (data) cache[productId] = data;
  return data || {};
};
