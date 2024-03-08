"use client";

import { useFetch } from "@/utils/hooks/useFetch";
import { ProductRequest } from "@/utils/types/product";
import Link from "next/link";

export default function Product({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const {
    data: product,
    isError,
    isLoading,
  } = useFetch<ProductRequest>(
    `${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL!}/api/products/${
      params.productId
    }?populate=*`
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Product</h1>
      <Link href="/products">Go to products</Link>

      {isError && <p>Error</p>}

      {isLoading && <p>Loading...</p>}

      {!isLoading && !isError && (
        <ProductCard
          name={product!.data.attributes.name}
          image={`${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL!}${
            product!.data.attributes.image.data.attributes.url
          }`}
          price={product!.data.attributes.price}
          key={product!.data.id}
        />
      )}
    </>
  );
}

function ProductCard({
  name,
  price,
  image,
}: {
  name: string;
  price: number;
  image: string;
}) {
  return (
    <div className="flex flex-col p-4 gap-2">
      <img
        src={image}
        alt={name}
        className="w-64 h-64 object-cover rounded-xl border-[1px] border-neutral-300"
      />
      <h2>{name}</h2>
      <p>R${price}</p>
    </div>
  );
}
