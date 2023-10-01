import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzasArgs, Pizza, PizzaSliceState, Status } from './types';

//Запрос на бэкенд для получения пицц
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async (params) => {
    const { categoryId, searchValue, sort, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6291dea0cd0c91932b695317.mockapi.io/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty}
  ${searchValue ? `&search=${searchValue}` : ''}`,
    );

    return data;
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.status = 'success';
  //     state.items = action.payload;
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export default pizzaSlice.reducer;
