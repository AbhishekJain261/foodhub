'use client'

import React from 'react';
import Input from './input';

interface SearchProps {
    className?: string;
}
const Search: React.FC<SearchProps> = ({className}) => {

    const handleSearch = () => {
        console.log('Search')
    }
    
  return (
    <div className={className}>
        <Input  placeholder='Search for any hub' value='' className='px-2' onChange={handleSearch} />
    </div>
  );
}

export default Search;
