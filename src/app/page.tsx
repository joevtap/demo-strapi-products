import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <Link href="/products">Go to products</Link>
    </>
  );
}
