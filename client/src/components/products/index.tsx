"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import Search from "../search";
import { RiSearchEyeLine } from "react-icons/ri";

interface Recipe {
    // Define the properties of a recipe based on the actual API response
    id: number;
    title: string;
    name: string;
    image: string;
    // Add other fields as needed based on API response
}

const Products = () => {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    "https://dummyjson.com/recipes"
                );

                setRecipes(response.data.recipes);
                // console.log(response.data.recipes)
            } catch (error) {
                // setError("examoke");
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = recipes?.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="flex gap-2 justify-between">
                <div className="w-14 relative hover:w-10/12 transition-all duration-1000">
                    <div className="absolute top-[50%] -translate-y-1/2 left-4">
                        <RiSearchEyeLine size={20} />
                    </div>
                    <Search onSearchChange={setSearchQuery} />
                </div>
                <div className="w-2/12 flex items-center justify-center  text-black rounded-[10px] mr-[10px]">
                    <details className="dropdown w-full">
                        <summary className="btn w-full">Filter</summary>
                        <ul className="menu mt-2 dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                            <li>
                                <a>Popularity</a>
                            </li>
                            <li>
                                <a>Most Viewed</a>
                            </li>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="grid  grid-rows-5 gap-4">
                <div className="pin_container">
                    {filteredRecipes?.map((recipe, index) => (
                        <div
                            className={`card ${
                                index % 3 === 0
                                    ? "card_small"
                                    : index % 3 === 1
                                    ? "card_medium"
                                    : "card_large"
                            }`}
                            key={index}
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
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;
