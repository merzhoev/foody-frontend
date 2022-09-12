import React from 'react';
import { Search } from '../../components/Search';
import { FoundDishes } from '../../components/FoundDishes';

export const Home = () => {
  return (
    <>
      <Search />
      <FoundDishes />
    </>
  );
};
