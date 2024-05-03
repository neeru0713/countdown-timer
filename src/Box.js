import React from "react";

export const Box = ({value, timePlaceholder}) => {
  return (
    <div className=" box bg-[#88b0ff] w-[160px] h-[160px] border rounded-lg border-2 flex flex-col items-center justify-center gap-2">
      <div className="text-white text-4xl font-bold">{value}</div>
      <div className="text-2xl text-gray-200 font-bold">{timePlaceholder}</div>
    </div>
  );
};
