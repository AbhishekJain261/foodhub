"use client";

import axios from "axios";
import Image from "next/image";
import Search from "../search";
import React, { useState } from "react";
import { useEffect } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import { log } from "console";
import api from "@/utils/api";

interface Recipe {
  id: number;
  _id: string;
  title: string;
  name: string;
  image: string;
  totalViews: number;
}

const Products = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const searchQuery = useSelector((state: any) => state.search.query);
  const filterQuery = useSelector((state: any) => state.filter.filterValue);

  console.log(recipes);

  const router = useRouter();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.getProducts();
        setRecipes(response.data);
      } catch (error) {}
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterRecipe =
    filterQuery === recipes?.sort((a, b) => b.totalViews - a.totalViews);
  console.log(filterRecipe, "hello");

  const handleIdClick = async (id: string) => {
    try {
      const response = await api.getProductDetail(id);
      const responseView = await api.getProductByViews(id);
      router.push(`/product-detail/${id}`);
    } catch (error) {}
  };
  console.log(filteredRecipes); 
  return (
    <>
      <div className="grid  grid-rows-5 gap-4">
        <div className="pin_container">
          {filteredRecipes ?.map((recipe, index) => (
            <>
              <div
                className={`card ${
                  index % 3 === 0
                    ? "card_small"
                    : index % 3 === 1
                    ? "card_medium"
                    : "card_large"
                }`}
                key={index}
                onClick={() => handleIdClick(recipe._id)}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full !h-full card_image cursor-pointer"
                  width={100}
                  height={100}
                  unoptimized={true}
                />
                <p>{recipe.name}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
