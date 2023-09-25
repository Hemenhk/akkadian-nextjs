import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuantitySelector({
  quantity,
  setQuantity,
}: QuantitySelectorProps) {
  const increaseQuantityHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">Quantity:</p>
      <div className="flex items-center justify-between gap-4 border border-[#dbdbdb] rounded px-[20px] py-[6px]  w-[125px]">
        <AiOutlineMinus
          size={15}
          cursor={"pointer"}
          onClick={decreaseQuantityHandler}
        />
        <p>{quantity}</p>
        <AiOutlinePlus
          size={15}
          cursor={"pointer"}
          onClick={increaseQuantityHandler}
        />
      </div>
    </div>
  );
}
