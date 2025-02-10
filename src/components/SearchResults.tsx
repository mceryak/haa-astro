import { useStore } from '@nanostores/react'
import React from 'react'
import { $filters } from '../store/filters'

export default function SearchResults({ homes }) {
  const filters = useStore($filters);
  const filteredHomes = homes.filter(home => filters.beds.includes(1) ? home.space === 'Double-wide' : true);
  return (
    <div>{JSON.stringify(filteredHomes)}</div>
  )
}
