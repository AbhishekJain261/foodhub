import { log } from "console";
import Image from "next/image";
import React, { useEffect } from "react";
import { PiHeartBold } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import axios from "axios";

const ProductCard = ({ data }: any) => {
  console.log(data, "hello");
  const handleLikeCLick = async () => {
    const response = await axios.put(
      `http://localhost:5000/recipes/${data._id}/likes`
    );
    console.log(response);
  };

  return (
    <div className="border rounded-3xl flex gap-5">
      <div className="w-[468px] h-[831px]">
        <Image
          unoptimized
          src={data.image}
          className="rounded-tl-3xl rounded-bl-3xl"
          width={100}
          height={100}
          alt={""}
        />
      </div>
      <div className="p-5">
        <div className="flex ">
          <div className="flex items-center gap-4">
            <PiHeartBold
              className="text-3xl font-semibold"
              onClick={handleLikeCLick}
            />
            <p className="text-xl">{data.totalLikes}</p>
            <IoMdDownload className="text-3xl font-semibold" />
            <p className="text-xl">{data.rating} Rating</p>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-[#111111] mt-9">
          {data.title}
        </h1>
      </div>
    </div>
  );
};

export default ProductCard;
