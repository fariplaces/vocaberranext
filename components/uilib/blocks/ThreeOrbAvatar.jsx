"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeOrbAvatar({
  color = "#D9A441",
  wireframe = false,
  speed = 1,
  size = 160,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || size;
    const height = mount.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color,
      wireframe,
      roughness: 0.35,
      metalness: 0.2,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const point = new THREE.PointLight(0xffffff, 1.2);
    point.position.set(2, 2, 3);
    scene.add(ambient, point);

    let raf;
    const animate = () => {
      mesh.rotation.x += 0.004 * speed;
      mesh.rotation.y += 0.006 * speed;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [color, wireframe, speed, size]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      className="rounded-xl overflow-hidden bg-[#0D1016] border border-[#242832] flex items-center justify-center"
    />
  );
}

export default ThreeOrbAvatar;
