import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/slice';
import { RootState, useAppDispatch } from '../redux/store';
import { FilterType } from '../redux/slices/filter/types';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  //Если изменили параметры и это не 1-ый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  //Если 1-ый рендер, то проверяем URL параметры и сохраняем в Redux
  useEffect(() => {
    if (searchParams.toString()) {
      const params = qs.parse(searchParams.toString());
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      if (sort) {
        params.sort = sort;
      }

      dispatch(setFilters(params as unknown as FilterType));
      isSearch.current = true;
    }
  }, []);

  //Если не 1-ый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas({ categoryId, searchValue, sort, currentPage }));
    }
    window.scrollTo(0, 0);
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
