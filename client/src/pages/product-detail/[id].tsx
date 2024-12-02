import ProductCard from "@/components/products/product-card";
import axios from "axios";
import { log } from "console";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const params = useParams();
  const [data, setData] = useState("");

  console.log(params?.id);

  const singleProduct = async () => {
    const response = await axios.get(
      `http://localhost:5000/recipes/${params?.id}`
    );
    setData(response.data);
  };
  useEffect(() => {
    if (params?.id) {
      singleProduct();
    }
  }, [params?.id]);

  return (
    <>
      {/* <p>{router.query.slug}</p> */}
      <div className="w-[80%] mx-auto mt-5">
        <ProductCard data={data} />
        {/* <div className="border rounded-2xl p-3">Hello</div> */}
      </div>
    </>
  );
};

export default ProductDetail;
