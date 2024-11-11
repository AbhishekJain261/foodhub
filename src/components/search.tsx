"use client";

import React, { useState } from "react";
import Input from "./input";

interface SearchProps {
  className?: string;
}
const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={className}>
      <Input placeholder="Search for any hub" />
    </div>
  );
};

export default Search;
