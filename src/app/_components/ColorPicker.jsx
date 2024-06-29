"use client";

import React from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../store/shirtSlice";

const ColorPicker = () => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.shirt.color);

  const selectedMesh = useSelector((state) => state.shirt.selectedMesh);

  function getReadableTextColor(hex) {
    // Remove the hash symbol if present
    hex = hex.replace("#", "");

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white depending on the brightness
    return brightness > 128 ? "#000000" : "#FFFFFF";
  }

  const meshName = selectedMesh;
  const readableTextColor = getReadableTextColor(color);

  return (
    <div className="h-full w-[220px] flex flex-col space-y-5 justify-center items-center ">
      <div className="p-2 w-full border-[1px] rounded-lg flex flex-col space-y-4 shadow-md">
        <h3>
          -You can drag the mesh by holding and moving the left-mouse-click.
        </h3>
        <h3>-By clicking on a part of the mesh, you can change its color.</h3>
      </div>

      <div className="w-full flex flex-col space-y-2">
        <div
          className={`w-full py-2 flex justify-center items-center rounded-md pointer-events-none select-none`}
          style={{ backgroundColor: `${color}`, color: `${readableTextColor}` }}
        >
          <h2>{meshName}</h2>
        </div>

        <SketchPicker
          color={color}
          disableAlpha
          onChange={(color) => {
            dispatch(changeColor(color.hex));
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
