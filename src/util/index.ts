const toComma = (price: number | string) => {
  if (price === undefined) return undefined;
  return price.toLocaleString('ko-KR');
};

export { toComma };
