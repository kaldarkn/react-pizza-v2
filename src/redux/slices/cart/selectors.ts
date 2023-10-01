import { RootState } from '../../store';

//Создаем селектор получения cart (это просто JS функция)
export const selectCart = (state: RootState) => state.cart;
//Создаем селектор для получения данных с корзины по id
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
