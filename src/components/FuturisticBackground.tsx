"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    camera.position.y = 10;
    camera.rotation.x = -0.2;

    const gridSize = 100;
    const gridDivisions = 20;
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    });

    const gridGeometry = new THREE.BufferGeometry();
    const gridPositions: number[] = [];

    for (let i = 0; i <= gridDivisions; i++) {
      const y = 0;
      const x = -gridSize / 2;
      const z = -gridSize / 2 + (i * gridSize) / gridDivisions;

      gridPositions.push(x, y, z);
      gridPositions.push(-x, y, z);
    }

    for (let i = 0; i <= gridDivisions; i++) {
      const y = 0;
      const x = -gridSize / 2 + (i * gridSize) / gridDivisions;
      const z = -gridSize / 2;

      gridPositions.push(x, y, z);
      gridPositions.push(x, y, -z);
    }

    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(gridPositions, 3)
    );

    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(grid);

    const createMountains = () => {
      const createMountainRange = (
        baseZ: number,
        maxHeight: number,
        width: number,
        segments: number,
        opacity: number
      ) => {
        const mountainGeometry = new THREE.BufferGeometry();
        const mountainPositions: number[] = [];

        for (let i = 0; i <= segments; i++) {
          const x = -width / 2 + (i * width) / segments;

          const noise =
            Math.sin((i / segments) * Math.PI) *
            Math.sin(i * 0.4) *
            Math.sin(i * 0.7 + 2) *
            Math.sin(i * 1.3 + 4);

          const height = Math.max(0, maxHeight * (0.2 + 0.8 * Math.abs(noise)));

          mountainPositions.push(x, 0, baseZ);
          mountainPositions.push(x, height, baseZ);
        }

        mountainGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(mountainPositions, 3)
        );

        const mountainMaterial = new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            color1: { value: new THREE.Color(0xffffff) },
            color2: { value: new THREE.Color(0x888888) },
            opacity: { value: opacity },
          },
          vertexShader: `
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float opacity;
            varying vec3 vPosition;
            void main() {
              float gradient = smoothstep(0.0, 1.0, vPosition.y / 10.0);
              vec3 color = mix(color2, color1, gradient);
              gl_FragColor = vec4(color, opacity * (0.5 + gradient * 0.5));
            }
          `,
        });

        const mountains = new THREE.LineSegments(
          mountainGeometry,
          mountainMaterial
        );
        scene.add(mountains);
        return mountains;
      };

      const mountainRanges = [
        createMountainRange(-50, 15, gridSize, 40, 0.4),
        createMountainRange(-45, 12, gridSize * 0.9, 35, 0.5),
        createMountainRange(-40, 8, gridSize * 0.8, 30, 0.6),
      ];

      return mountainRanges;
    };

    const mountainRanges = createMountains();

    const createSimpleWhiteTexture = () => {
      const size = 256;
      const data = new Uint8Array(size * size * 4);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const distFromCenter =
            Math.sqrt(Math.pow(x - size / 2, 2) + Math.pow(y - size / 2, 2)) /
            (size / 2);

          let value = 230 - Math.pow(distFromCenter, 1.5) * 100;

          value += (Math.random() - 0.5) * 10;

          value = Math.min(Math.max(value, 200), 255);

          const index = (y * size + x) * 4;
          data[index] = value;
          data[index + 1] = value;
          data[index + 2] = value;
          data[index + 3] = 255;
        }
      }

      const proceduralTexture = new THREE.DataTexture(
        data,
        size,
        size,
        THREE.RGBAFormat
      );
      proceduralTexture.needsUpdate = true;
      return proceduralTexture;
    };

    const whiteTexture = createSimpleWhiteTexture();

    const createSimpleBlackTexture = () => {
      const size = 256;
      const data = new Uint8Array(size * size * 4);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const distFromCenter =
            Math.sqrt(Math.pow(x - size / 2, 2) + Math.pow(y - size / 2, 2)) /
            (size / 2);

          let value = 20 + Math.pow(distFromCenter, 1.5) * 30;

          value += (Math.random() - 0.5) * 5;

          value = Math.min(Math.max(value, 5), 50);

          const index = (y * size + x) * 4;
          data[index] = value;
          data[index + 1] = value;
          data[index + 2] = value;
          data[index + 3] = 255;
        }
      }

      const proceduralTexture = new THREE.DataTexture(
        data,
        size,
        size,
        THREE.RGBAFormat
      );
      proceduralTexture.needsUpdate = true;
      return proceduralTexture;
    };

    const blackTexture = createSimpleBlackTexture();

    const circles: THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshStandardMaterial
    >[] = [];
    const circleCount = 12;

    const MAX_CIRCLE_RADIUS = 5;

    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x88ccff, 1, 50);
    pointLight1.position.set(0, 15, -20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff88cc, 1, 50);
    pointLight2.position.set(-20, 5, -20);
    scene.add(pointLight2);

    const createSphere = (radius: number, x: number, y: number, z: number) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const isWhite = Math.random() > 0.5;
      const material = new THREE.MeshStandardMaterial({
        color: isWhite ? 0xffffff : 0x000000,
        roughness: 0.2,
        metalness: 0.8,
        envMapIntensity: 1.0,
        transparent: true,
        opacity: Math.random() * 0.2 + 0.4,
        emissive: isWhite ? 0x222222 : 0x000000,
      });

      if (isWhite) {
        material.map = whiteTexture;
      } else {
        material.map = blackTexture;
      }

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);

      sphere.userData.velocity = {
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003,
      };

      sphere.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
      };

      sphere.userData.pulseSpeed = Math.random() * 0.02 + 0.01;
      sphere.userData.pulseTime = Math.random() * Math.PI * 2;
      sphere.userData.originalRadius = radius;

      scene.add(sphere);
      circles.push(sphere);
      return sphere;
    };

    const rightSideX = 10;

    for (let i = 0; i < circleCount; i++) {
      const radius = Math.random() * 2 + 1;

      const x = Math.random() * 20 + rightSideX;
      const y = Math.random() * 20 + 5;
      const z = Math.random() * -40 - 20;

      createSphere(radius, x, y, z);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      camera.position.x = mouseX * 5;
      grid.rotation.y = mouseX * 0.1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function animate() {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      circles.forEach((circle, index) => {
        circle.position.x += circle.userData.velocity.x;
        circle.position.y += circle.userData.velocity.y;
        circle.position.z += circle.userData.velocity.z;

        circle.rotation.x += circle.userData.rotationSpeed.x;
        circle.rotation.y += circle.userData.rotationSpeed.y;
        circle.rotation.z += circle.userData.rotationSpeed.z;

        circle.userData.pulseTime += circle.userData.pulseSpeed;
        const pulse = Math.sin(circle.userData.pulseTime) * 0.1 + 1;
        circle.scale.set(pulse, pulse, pulse);

        if (circle.position.x < rightSideX) {
          circle.position.x = rightSideX + Math.random() * 5;
          circle.userData.velocity.x = Math.abs(circle.userData.velocity.x);
        }

        if (circle.position.x > rightSideX + 30) {
          circle.userData.velocity.x *= -1;
        }

        if (circle.position.y < 1 || circle.position.y > 25) {
          circle.userData.velocity.y *= -1;
        }

        if (circle.position.z < -60 || circle.position.z > -10) {
          circle.userData.velocity.z *= -1;
        }

        if (Math.random() < 0.0002) {
          circle.userData.velocity.x = (Math.random() - 0.3) * 0.005;
          circle.userData.velocity.y = (Math.random() - 0.5) * 0.005;
          circle.userData.velocity.z = (Math.random() - 0.5) * 0.005;
        }

        if (Math.random() < 0.0008) {
          const animateFlash = () => {
            const originalColor = circle.material.color.clone();
            const originalEmissive = circle.material.emissive
              ? circle.material.emissive.clone()
              : new THREE.Color(0x000000);
            const originalEmissiveIntensity =
              circle.material.emissiveIntensity || 0;
            const originalOpacity = circle.material.opacity;

            circle.material.emissive = new THREE.Color(0x444444);
            circle.material.emissiveIntensity = 0.3;
            circle.material.opacity = Math.min(originalOpacity * 1.5, 0.8);

            setTimeout(() => {
              circle.material.emissive = originalEmissive;
              circle.material.emissiveIntensity = originalEmissiveIntensity;
              circle.material.opacity = originalOpacity;
            }, 200);
          };

          animateFlash();
        }
      });

      grid.rotation.x = Math.sin(time * 0.1) * 0.05;
      grid.position.z = Math.sin(time * 0.2) * 5;

      mountainRanges.forEach((mountain, index) => {
        mountain.position.z = Math.sin(time * 0.1 + index * 0.1) * 2;
      });

      pointLight1.position.x = Math.sin(time * 0.3) * 15;
      pointLight1.position.z = Math.cos(time * 0.2) * 15 - 20;

      pointLight2.position.x = Math.sin(time * 0.4 + 2) * 15;
      pointLight2.position.z = Math.cos(time * 0.3 + 2) * 15 - 20;

      if (Math.random() < 0.0003) {
        const randomIndex = Math.floor(Math.random() * circles.length);
        const circle = circles[randomIndex];

        const originalVelocity = { ...circle.userData.velocity };
        const originalRotationSpeed = { ...circle.userData.rotationSpeed };

        circle.userData.velocity = {
          x: originalVelocity.x * 2,
          y: originalVelocity.y * 2,
          z: originalVelocity.z * 2,
        };

        circle.userData.rotationSpeed = {
          x: originalRotationSpeed.x * 2,
          y: originalRotationSpeed.y * 2,
          z: originalRotationSpeed.z * 2,
        };

        setTimeout(() => {
          circle.userData.velocity = originalVelocity;
          circle.userData.rotationSpeed = originalRotationSpeed;
        }, 1000);
      }

      if (Math.random() < 0.0001) {
        const randomX = Math.random() * 20 + rightSideX;
        const randomY = Math.random() * 20 + 5;
        const randomZ = Math.random() * -40 - 20;
        const radius = Math.random() * 2 + 1;

        const newSphere = createSphere(radius, randomX, randomY, randomZ);

        const animateBurst = () => {
          const originalScale = { x: 0, y: 0, z: 0 };
          const targetScale = { x: 1, y: 1, z: 1 };
          const duration = 1000;
          const startTime = Date.now();

          function updateScale() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutBack = (x: number) => {
              const c1 = 1.70158;
              const c3 = c1 + 1;
              return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
            };

            const easedProgress = easeOutBack(progress);

            const scaleX =
              originalScale.x +
              (targetScale.x - originalScale.x) * easedProgress;
            const scaleY =
              originalScale.y +
              (targetScale.y - originalScale.y) * easedProgress;
            const scaleZ =
              originalScale.z +
              (targetScale.z - originalScale.z) * easedProgress;

            newSphere.scale.set(scaleX, scaleY, scaleZ);

            if (progress < 1) {
              requestAnimationFrame(updateScale);
            }
          }

          updateScale();
        };

        animateBurst();
      }

      if (Math.random() < 0.0002) {
        const randomIndex = Math.floor(Math.random() * circles.length);
        if (circles.length > circleCount) {
          const circleToRemove = circles[randomIndex];
          scene.remove(circleToRemove);
          circleToRemove.geometry.dispose();
          if (circleToRemove.material instanceof THREE.Material) {
            circleToRemove.material.dispose();
          }
          circles.splice(randomIndex, 1);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      circles.forEach(circle => {
        scene.remove(circle);
        circle.geometry.dispose();
        if (circle.material instanceof THREE.Material) {
          circle.material.dispose();
        }
      });

      mountainRanges.forEach(mountain => {
        scene.remove(mountain);
        if (mountain.geometry) mountain.geometry.dispose();
        if (mountain.material instanceof THREE.Material) {
          mountain.material.dispose();
        }
      });

      scene.remove(grid);
      grid.geometry.dispose();
      if (grid.material instanceof THREE.Material) {
        grid.material.dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
  );
}
