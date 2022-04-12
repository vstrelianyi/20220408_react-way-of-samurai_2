import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { useState, FC } from 'react';

type PropsType = {
	itemsCount: number
	currentPage: number
	onPageChanged: ( pageNumber: number ) => void
}

const Pagination: FC<PropsType> = ( props ) => {
  const { itemsCount, currentPage, onPageChanged, } = props;

  const classes = classNames( [
    styles.Pagination,
    'pagination',
  ] );

  const batchSize = 10;
  const batchCount = Math.ceil( itemsCount / batchSize );
  const [ batchIndex, setBatchIndex, ] = useState( 1 );
  const leftBoundary = ( batchIndex - 1 ) * batchSize + 1;
  const rightBoundary = batchIndex * batchSize;

  const getPaginationHTML = count => {
    const html = [];
    for ( let i = 1; i <= count; i++ ){
      if ( i >= leftBoundary && i <= rightBoundary ){
        html.push( <PaginationItem key={ i } i={ i } currentPage={ currentPage } onPageChanged={ onPageChanged }/> );
      }
    }

    return html;
  };

  const handlePrevBatchClick = () => {
    setBatchIndex( ( prevBatchIndex ) => {
      return prevBatchIndex === 1 ? batchCount : prevBatchIndex - 1;
    } );
  };

  const handleNextBatchClick = () => {
    setBatchIndex( ( prevBatchIndex ) => {
      return prevBatchIndex >= batchCount ? 1 : prevBatchIndex + 1;
    } );
  };

  return (
    <div className={ classes }>
      <button className="pagination-control prev" onClick={ handlePrevBatchClick }>
        <svg viewBox="0 0 20 20">
          <path d="M13.891 17.418a.697.697 0 0 1 0 .979.68.68 0 0 1-.969 0l-7.83-7.908a.697.697 0 0 1 0-.979l7.83-7.908a.68.68 0 0 1 .969 0 .697.697 0 0 1 0 .979L6.75 10l7.141 7.418z"/>
        </svg>
      </button>
      <ul className="items-list">
        { getPaginationHTML( itemsCount ) }
      </ul>
      <button className="pagination-control next" onClick={ handleNextBatchClick }>
        <svg viewBox="0 0 20 20">
          <path d="M13.25 10L6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"/>
        </svg>
      </button>
    </div>
  );
};

const PaginationItem = ( props ) => {
  const { i, currentPage, onPageChanged, } = props;
  const paginationItemClasses = classNames( [
    'badge',
    currentPage === i ? 'current' : null,
  ] );

  return (
    <li className={ paginationItemClasses }>
      <button onClick={ () => {
        onPageChanged( i );
      } }>{ i }</button>
    </li>
  );
};

export default Pagination;