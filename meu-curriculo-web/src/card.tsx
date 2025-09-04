import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import type { ReactThreeFiber } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')
useTexture.preload('/textures/future.png')

type InteractiveBadgeProps = { scale?: number; textureZoom?: number; textureOffsetX?: number; textureOffsetY?: number; textureRotation?: number }

export function InteractiveBadge({ scale = 2, textureZoom = 1.3, textureOffsetX = 0, textureOffsetY = 0, textureRotation = 0 }: InteractiveBadgeProps) {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band scale={scale} textureZoom={textureZoom} textureOffsetX={textureOffsetX} textureOffsetY={textureOffsetY} textureRotation={textureRotation} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10, scale = 2, textureZoom = 1.3, textureOffsetX = 0, textureOffsetY = 0, textureRotation = 0 }: { maxSpeed?: number; minSpeed?: number; scale?: number; textureZoom?: number; textureOffsetX?: number; textureOffsetY?: number; textureRotation?: number }) {
  const band = useRef<any>()
  const fixed = useRef<any>()
  const j1 = useRef<any>()
  const j2 = useRef<any>()
  const j3 = useRef<any>()
  const card = useRef<any>()
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 2, linearDamping: 2 }
  const { nodes, materials } = useGLTF('https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb')
  const badgeTexture = useTexture('/textures/future.png')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState<any>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (badgeTexture.image) {
      const cardGeometry = (nodes.card as THREE.Mesh).geometry;
      cardGeometry.computeBoundingBox();
      const cardSize = cardGeometry.boundingBox!.getSize(new THREE.Vector3());
       
      const cardAspect = cardSize.x / cardSize.y;
      const imageAspect = badgeTexture.image.width / badgeTexture.image.height;

      // Ajusta a repetição da textura para simular "background-size: cover"
      let repeatX = 1;
      let repeatY = 1;
      if (imageAspect > cardAspect) {
        repeatX = cardAspect / imageAspect;
        repeatY = 1;
      } else {
        repeatX = 1;
        repeatY = imageAspect / cardAspect;
      }
      
      // Aplicar zoom da textura
      const zoom = Math.max(repeatX, repeatY) * textureZoom;
      badgeTexture.repeat.set(zoom, zoom);

      badgeTexture.offset.set(
        (1 - zoom) /2 +textureOffsetX,
        (1 - zoom) /2 +textureOffsetY
      );
      
      badgeTexture.wrapS = badgeTexture.wrapT = THREE.ClampToEdgeWrapping;
      badgeTexture.rotation = textureRotation;
      badgeTexture.needsUpdate = true;
    }
  }, [badgeTexture, nodes.card, textureZoom, textureOffsetX, textureOffsetY, textureRotation]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'
  badgeTexture.flipY = false
  badgeTexture.anisotropy = 8

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={scale}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const target = e.currentTarget as unknown as Element & { releasePointerCapture: (id: number) => void }
              target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e) => {
              const target = e.currentTarget as unknown as Element & { setPointerCapture: (id: number) => void }
              target.setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}>
            <mesh geometry={(nodes.card as any).geometry}>
              <meshPhysicalMaterial map={badgeTexture} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={(nodes.clip as any).geometry} material={(materials.metal as any)} material-roughness={0.3} />
            <mesh geometry={(nodes.clamp as any).geometry} material={(materials.metal as any)} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="#0D0000" depthTest={false} resolution={[width, height]} lineWidth={1} />
      </mesh>
    </>
  )
}

export function VercelBadge({ scale = 10, textureZoom = 1, textureOffsetX = 0, textureOffsetY = 0, textureRotation = 0 }: { scale?: number; textureZoom?: number; textureOffsetX?: number; textureOffsetY?: number; textureRotation?: number }) {
  return <InteractiveBadge scale={scale} textureZoom={textureZoom} textureOffsetX={textureOffsetX} textureOffsetY={textureOffsetY} textureRotation={textureRotation} />
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}