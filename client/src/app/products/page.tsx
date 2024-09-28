"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { Box, Skeleton } from "@mui/material";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import Header from "../(components)/Header";
import Rating from "../(components)/Rating/inde";
import CreateProductModal from "./CreateProductModal";
import { ProductFormData } from "@/types";
import Image from "next/image";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  async function handleCreateProduct(productData: ProductFormData) {
    await createProduct(productData);
  }

  if (isLoading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-4 h-4 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Header bar */}
      <div className="mb-6 items-center flex justify-between">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200  font-bold py-2 px-4 rounded "
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>
      {/* Product list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : products.length > 0 ? (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow p-4 rounded-md max-w-full w-full mx-auto"
            >
              <div className="flex items-center flex-col">
                <Image
                  src={`https://inventorymanagment.s3.ap-south-1.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">{product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>
      {/* Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
