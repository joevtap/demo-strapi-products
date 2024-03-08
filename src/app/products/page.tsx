"use client";

import { ProductsRequest } from "@/utils/types/products";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/utils/fetchers/fetch";

export default function Products() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<ProductsRequest>(
    `${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL!}/api/products?populate=*`,
    fetcher
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <Link href="/">Go to home</Link>

      {error && <p>Error</p>}

      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        !error &&
        products?.data.map((product) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL!}${
            product.attributes.image.data.attributes.url
          }`;

          return (
            <ProductCard
              id={product.id.toString()}
              name={product.attributes.name}
              image={imageUrl}
              price={product.attributes.price}
              key={product.id}
            />
          );
        })}
    </>
  );
}

function ProductCard({
  id,
  name,
  price,
  image,
}: {
  id: string;
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
      <Link href={`/products/${id}`}>View More</Link>
    </div>
  );
}
