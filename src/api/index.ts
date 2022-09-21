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
  let url = process.env.NODE_ENV === 'development' ? '/src/data/products.json' : `api/products`;
  const data = await request(url);
  if (data) cache.list = data;
  return data || [];
};

export const fetchProduct = async (productId: number) => {
  if (cache[productId]) return cache[productId];
  if (process.env.NODE_ENV === 'development') {
    const data = await request('/src/data/productInfo.json');
    if (data) cache[productId] = data[productId];
  } else {
    const data = await request(`api/products/${productId}`);
    if (data) cache[productId] = data;
  }

  return cache[productId] || {};
};
