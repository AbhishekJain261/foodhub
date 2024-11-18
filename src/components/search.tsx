"use client";

import React, { useState } from "react";
import Input from "./input";

interface SearchProps {
  className?: string;
  onSearchChange: (query: string) => void;
}
const Search: React.FC<SearchProps> = ({ className, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className={className}>
      <Input placeholder="Search for any hub"   onChange={handleSearchChange} />
    </div>
  );
};

export default Search;
