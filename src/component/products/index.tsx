"use client";

import axios from "axios";
import { log } from "console";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";

interface Recipe {
    // Define the properties of a recipe based on the actual API response
    id: number;
    title: string;
    name: string;   
    image: string;
    // Add other fields as needed based on API response
  }

const Products = () => {
 ;
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");

        setRecipes(response.data.recipes)   ;
        // console.log(response.data)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipes();
  }, []);

  console.log(recipes,"hello");

  // try axios{
  //     const response = await
  // } catch (err) {
  // }

  return <div className="grid grid-cols-6 grid-rows-5 gap-4">
    {recipes?.map((recipes,index) => 
    <div key={index}>
        <Image src={recipes.image} alt={recipes.name} width={100} height={100} />
        <h2>{recipes.name}</h2>
    </div>
    )}
  </div>;
};

export default Products;
