export const request = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    }
    throw new Error("API 통신 실패");
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    else message = String(e);
    alert(message);
  }
};

export const fetchProductList = async () => {
  const data = await request(`api/products`);
  return data || [];
};

export const fetchProduct = async (productId: number) => {
  const data = await request(`api/products/${productId}`);
  return data || {};
};
