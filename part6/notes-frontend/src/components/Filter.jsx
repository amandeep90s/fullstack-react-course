import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/features/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const filterSelected = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      all{' '}
      <input
        type='radio'
        name='filter'
        id='all'
        onChange={() => filterSelected('ALL')}
      />
      important{' '}
      <input
        type='radio'
        name='filter'
        id='important'
        onChange={() => filterSelected('IMPORTANT')}
      />
      non important{' '}
      <input
        type='radio'
        name='filter'
        id='nonimportant'
        onChange={() => filterSelected('NONIMPORTANT')}
      />
    </div>
  );
};

export default Filter;
