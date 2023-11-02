import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onFilter, isShortMovies }) => {
  return (
    <>
      <div className="filter-checkbox">
        <input 
          className="filter-checkbox__input" 
          type="checkbox" 
          id="switch"
          onChange={onFilter}
          checked={isShortMovies}
        />
        <label 
          className="filter-checkbox__label" 
          htmlFor="switch"
        ></label>
        <span className="filter-checkbox__text">Короткометражки</span>
      </div>
    </>
  );
};

export default FilterCheckbox;
