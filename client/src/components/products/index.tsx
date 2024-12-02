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

interface Recipe {
  id: number;
  _id: string;
  title: string;
  name: string;
  image: string;
}

const Products = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const searchQuery = useSelector((state: any) => state.search.query);
  const router = useRouter();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");

        setRecipes(response.data);
      } catch (error) {
        // setError("examoke");
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIdClick = async (id: string) => {
    console.log(id);

    router.push(`/product-detail/${id}`)
    try {
      const response = await axios.get(
        `http://localhost:5000/recipes/${id}`
      );
      console.log(response)
    } catch (error) {}
  };

  return (
    <>
      <div className="grid  grid-rows-5 gap-4">
        <div className="pin_container">
          {filteredRecipes?.map((recipe, index) => (
            <>
              {console.log(recipe)}

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
                  className="w-full !h-full card_image"
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
