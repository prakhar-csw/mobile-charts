import React from "react";
import { Button } from "../ui/button";

const ButtonContainer = ({onBuyClick, onSellClick}: any) => {
  const textClass = "text-base font-extrabold text-center";
  return (
    <section className="h-24 flex items-center justify-center gap-2.5 w-full border border-[#F4F4F6] bg-[#ffffff] max-h-[360px]">
      <Button size={"xlg"} variant="primary" onClick={onBuyClick}>
        <span className={textClass}>Buy</span>
      </Button>
      <Button variant={"outline"} size={"xlg"} onClick={onSellClick}>
        <span className={textClass}>Sell</span>
      </Button>
    </section>
  );
};

export default ButtonContainer;
