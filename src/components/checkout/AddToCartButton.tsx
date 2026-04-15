"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addItemToCart } from "@/lib/checkout";

type AddToCartButtonProps = {
  item: {
    id: string;
    name: string;
    type: string;
    styleId: string;
    handle: string;
    image: string;
    price: number;
    quantity?: number;
  };
};

export default function AddToCartButton({ item }: AddToCartButtonProps) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItemToCart(item);
    router.push("/cart");
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-primary py-5 text-on-primary font-headline font-black text-xl tracking-tighter uppercase hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-wait"
    >
      {isAdding ? "ADDING..." : "ADD TO CART"}
      <span className="material-symbols-outlined font-bold">bolt</span>
    </button>
  );
}
