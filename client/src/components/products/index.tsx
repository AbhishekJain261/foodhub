"use client";

import axios from "axios";
import Image from "next/image";
import Search from "../search";
import React, { useState } from "react";
import { useEffect } from "react";
import { RiSearchEyeLine } from "react-icons/ri";

interface Recipe {
    id: number;
    title: string;
    name: string;
    image: string;
}

const Products = () => {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/recipes"
                );

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

        try {
            const response = await axios.put(
                `http://localhost:5000/recipes/${id}/views`
            );
            console.log(response);
        } catch (error) {}
    };

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
