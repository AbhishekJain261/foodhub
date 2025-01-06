import { log } from "console";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiHeartBold } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@/utils/api";
import Comment from "@/components/comment";

const ProductCard = ({ data }: any) => {
  const [likes, setLikes] = useState();
  const handleLikeCLick = async () => {
    const response = await api.getProductById(data._id);

    setLikes(response?.data?.totalLikes);
  };

  const handleDownload = async (data: any) => {
    try {
      const response = await fetch(data.image, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = data.title;
      link.click();
      window.URL.revokeObjectURL(blobUrl); // Clean up
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // const DownloadButton = ({ imageUrl }) => (
  //   <button onClick={() => handleDownload(imageUrl)}>
  //     <IoMdDownload className="text-3xl font-semibold cursor-pointer" />
  //   </button>
  // );

  return (
    <div className="card_product border rounded-3xl flex mt-9 gap-5 ">
      <div className="w-[65%] h-[468px]">
        <Image
          unoptimized
          src={data?.image}
          className="rounded-tl-3xl rounded-bl-3xl"
          width={100}
          height={100}
          alt={data.title}
        />
      </div>
      <div className="flex flex-col w-full h-auto justify-between p-5">
        <div>
          <div className="flex ">
            <div className="flex items-center gap-4">
              <PiHeartBold
                className="text-3xl font-semibold cursor-pointer"
                onClick={handleLikeCLick}
              />
              <p className="text-xl">{likes ? likes : data?.totalLikes}</p>
              <p onClick={() => handleDownload(data)}>
                <IoMdDownload className="text-3xl font-semibold cursor-pointer" />
              </p>
              <p className="text-xl">{data?.rating} Rating</p>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-[#111111] mt-9">
            {data.title}
          </h1>
        </div>
        <div>
          <Comment dataID={data._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
