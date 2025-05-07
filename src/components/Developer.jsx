/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useMemo } from "react";
import { useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

const Developer = ({ animationName = "idle", ...props }) => {
  const group = useRef();
  const { scene } = useGLTF("./models/animations/developer.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations: idleAnimation } = useFBX("./models/animations/idle.fbx");
  const { animations: saluteAnimation } = useFBX(
    "./models/animations/salute.fbx",
  );
  const { animations: clappingAnimation } = useFBX(
    "./models/animations/clapping.fbx",
  );
  const { animations: victoryAnimation } = useFBX(
    "./models/animations/victory.fbx",
  );

  idleAnimation[0].name = "idle";
  saluteAnimation[0].name = "salute";
  clappingAnimation[0].name = "clapping";
  victoryAnimation[0].name = "victory";

  const { actions } = useAnimations(
    [
      idleAnimation[0],
      saluteAnimation[0],
      clappingAnimation[0],
      victoryAnimation[0],
    ],
    group,
  );

  useEffect(() => {
    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions[animationName]) {
        actions[animationName].fadeOut(0.5);
      }
    };
  }, [animationName, actions]);

  return (
    <group ref={group} {...props}>
      <primitive object={clone} />
    </group>
  );
};

useGLTF.preload("./models/animations/developer.glb");
useFBX.preload("./models/animations/idle.fbx");
useFBX.preload("./models/animations/salute.fbx");
useFBX.preload("./models/animations/clapping.fbx");
useFBX.preload("./models/animations/victory.fbx");

export default Developer;
