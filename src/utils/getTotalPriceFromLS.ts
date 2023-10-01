export const getTotalPriceFromLS = () => {
  const data = localStorage.getItem('totalPrice');
  return data ? JSON.parse(data) : 0;
};
