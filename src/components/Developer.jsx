/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, useMemo } from "react";
import { useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

const DEVELOPER_MODEL = "./models/animations/developer.glb";
const ANIM_CLIPS = [
  { name: "idle", path: "./models/animations/idle.fbx" },
  { name: "salute", path: "./models/animations/salute.fbx" },
  { name: "clapping", path: "./models/animations/clapping.fbx" },
  { name: "victory", path: "./models/animations/victory.fbx" },
];

function Developer({ animationName = "idle", ...props }) {
  const group = useRef();

  const { scene } = useGLTF(DEVELOPER_MODEL);
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clonedScene);

  const { animations: idleAnims } = useFBX(ANIM_CLIPS[0].path);
  const { animations: saluteAnims } = useFBX(ANIM_CLIPS[1].path);
  const { animations: clappingAnims } = useFBX(ANIM_CLIPS[2].path);
  const { animations: victoryAnims } = useFBX(ANIM_CLIPS[3].path);

  const clips = useMemo(() => {
    const mapClip = (anims, name) => {
      const clip = anims[0];
      clip.name = name;
      return clip;
    };
    return [
      mapClip(idleAnims, "idle"),
      mapClip(saluteAnims, "salute"),
      mapClip(clappingAnims, "clapping"),
      mapClip(victoryAnims, "victory"),
    ];
  }, [idleAnims, saluteAnims, clappingAnims, victoryAnims]);

  const { actions } = useAnimations(clips, group);

  useEffect(() => {
    const action = actions[animationName];
    if (!action) return;
    action.reset().fadeIn(0.5).play();
    return () => action.fadeOut(0.5);
  }, [actions, animationName]);

  return (
    <group ref={group} dispose={null} {...props}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(DEVELOPER_MODEL);
ANIM_CLIPS.forEach(({ path }) => useFBX.preload(path));

export default React.memo(Developer);
