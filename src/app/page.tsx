import React from "react";
import ThreeCanvas from "./_components/ThreeCanvas";
import ColorPicker from "./_components/ColorPicker";

const page = () => {
  return (
    <div className="w-full h-full flex justify-between items-center px-10">
      <ColorPicker />

      <ThreeCanvas />
    </div>
  );
};

export default page;
