"use client";

import axios from "axios";
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
    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    "https://dummyjson.com/recipes"
                );

                setRecipes(response.data.recipes);
                // console.log(response.data)
            } catch (error) {
                // setError("examoke");
            }
        };

        fetchRecipes();
    }, []);

    console.log(recipes, "hello");

    // try axios{
    //     const response = await
    // } catch (err) {
    // }

    return (
        <div className="grid  grid-rows-5 gap-4">
            {/* {recipes?.map((recipes, index) => (
                <div key={index}>
                    <Image
                        src={recipes.image}
                        alt={recipes.name}
                        width={100}
                        height={100}
                    />
                    <h2>{recipes.name}</h2>
                </div>
            ))} */}

            <div className="pin_container">
                {recipes?.map((recipe, index) => (
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
