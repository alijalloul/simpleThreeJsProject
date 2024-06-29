"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import { changeColor, changeSelectedMesh } from "../store/shirtSlice";

const ClickableModel = ({ path, targetRotation, canvasRef }) => {
  const dispatch = useDispatch();

  const { skinColor, noseColor, shirtColor, pantsColor } = useSelector(
    (state) => state.shirt
  );

  const mouse = { x: 0, y: 0 };

  const { camera } = useThree();
  const { materials, scene } = useGLTF(path);
  const meshRef = useRef();

  const raycaster = new THREE.Raycaster();

  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const name = intersects[0].object.material.name;

      let color;

      if (name === "Skin") {
        color = skinColor;
      } else if (name === "Nose") {
        color = noseColor;
      } else if (name === "Shirt") {
        color = shirtColor;
      } else if (name === "Pants") {
        color = pantsColor;
      }

      dispatch(changeSelectedMesh(name));

      dispatch(changeColor(color));
    }
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      easing.damp2(meshRef.current.rotation, targetRotation, 0.25, delta);
    }

    easing.dampC(materials.Skin.color, skinColor, 0.25, delta);
    easing.dampC(materials.Nose.color, noseColor, 0.25, delta);
    easing.dampC(materials.Shirt.color, shirtColor, 0.25, delta);
    easing.dampC(materials.Pants.color, pantsColor, 0.25, delta);
  });

  return <primitive ref={meshRef} object={scene} onClick={handleClick} />;
};

const ThreeCanvas = () => {
  const canvasRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  const rotationSpeed = 0.005;

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };

    setTargetRotation({
      x: targetRotation.x + deltaMove.y * rotationSpeed,
      y: targetRotation.y + deltaMove.x * rotationSpeed,
    });

    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      className=" w-[80%] h-full"
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
    >
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[0, 5, 0]} intensity={1} />
        <Environment preset="city" intensity={1} />

        <Center>
          <ClickableModel
            path="/animalcrossingcharacter.glb"
            targetRotation={targetRotation}
            canvasRef={canvasRef}
          />
        </Center>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
