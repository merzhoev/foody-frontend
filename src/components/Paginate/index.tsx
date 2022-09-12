import React from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginateProps {
  totalPages: number;
  page: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

export const Paginate: React.FC<IPaginateProps> = ({ page, totalPages, handlePageChange }) => {
  return (
    <>
      <ReactPaginate
        containerClassName="paginate"
        disabledClassName="paginate__item-disabled"
        activeClassName="paginate__active-item"
        pageLinkClassName="paginate__item"
        pageClassName="paginate__number"
        previousClassName="paginate__previous"
        nextClassName="paginate__next"
        breakLabel="..."
        previousLabel={
          <button className="paginate__btn">
            <svg
              className="paginate__arrow-right"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5892 3.92247L5.34501 9.16664H16.6667V10.8333H5.34501L10.5892 16.0775L9.41084 17.2558L2.15501 9.99997L9.41084 2.74414L10.5892 3.92247Z"
                fill="#475467"
              />
            </svg>
            Предыдущая
          </button>
        }
        nextLabel={
          <button className="paginate__btn">
            Следующая
            <svg
              className="paginate__arrow-left"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.41081 3.92247L14.655 9.16664H3.33331V10.8333H14.655L9.41081 16.0775L10.5891 17.2558L17.845 9.99997L10.5891 2.74414L9.41081 3.92247Z"
                fill="#475467"
              />
            </svg>
          </button>
        }
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={page}
      />
      <ReactPaginate
        containerClassName="paginate-mobile"
        disabledClassName="paginate__item-disabled"
        previousClassName="paginate__previous"
        nextClassName="paginate__next"
        activeClassName="paginate__active-item"
        pageLinkClassName="paginate__item"
        pageClassName="paginate-mobile__number"
        previousLabel={
          <button className="paginate-mobile__btn">
            <svg
              className="paginate-mobile__arrow-right"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5892 3.92247L5.34501 9.16664H16.6667V10.8333H5.34501L10.5892 16.0775L9.41084 17.2558L2.15501 9.99997L9.41084 2.74414L10.5892 3.92247Z"
                fill="#475467"
              />
            </svg>
          </button>
        }
        nextLabel={
          <button className="paginate-mobile__btn">
            <svg
              className="paginate-mobile__arrow-left"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.41081 3.92247L14.655 9.16664H3.33331V10.8333H14.655L9.41081 16.0775L10.5891 17.2558L17.845 9.99997L10.5891 2.74414L9.41081 3.92247Z"
                fill="#475467"
              />
            </svg>
          </button>
        }
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        forcePage={page}
      />
    </>
  );
};
