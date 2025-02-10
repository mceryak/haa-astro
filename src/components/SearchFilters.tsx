import React from 'react'
import { useStore } from '@nanostores/react';
import { $filters, setFilters } from '../store/filters';

export default function SearchFilters() {
  const filters = useStore($filters);
  const options = [1, 2, 3, 4];

  const handleSelect = (option: Number) => {
    // setFilters({ beds: [3]});
    let newFilters = filters.beds.filter(val => val !== option);
    if (newFilters.length === filters.beds.length) { // didn't deselect
      newFilters.push(option);
    }
    setFilters({ beds: newFilters });
    // console.log('here');
    // const idx = filters.beds.findIndex(val => val === option);
    // if (idx) {
    //   filters.beds.splice(idx, 1);
    // } else {
    //   filters.beds.push(option);
    // }
    // console.log(JSON.stringify(filters));
    // setFilters(filters);
  }
  return (
    <>
      <h3>Beds</h3>
      <div className='flex gap-4'>
    {options.map(option => (
      <span className='flex gap-1' key={`beds-input-${option}`}>
        <input type='checkbox'   onClick={() => handleSelect(option)} id={`beds-input-${option}`}/>
        <label htmlFor={`beds-input-${option}`}>{option}</label>
      </span>
    ))}
      
      </div></>
  )
}
