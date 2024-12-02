"use client";

import React, { useState } from "react";
import Input from "./input";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";
interface SearchProps {
  className?: string;
  onSearchChange: (query: string) => void;
}
const Search: React.FC<SearchProps> = ({ className, onSearchChange }) => {
  const dispatch = useDispatch();
  const query = useSelector((state: any) => state.search.query);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    onSearchChange(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className={className}>
      <Input
        className="!ps-12"
        placeholder="Search for any hub"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
