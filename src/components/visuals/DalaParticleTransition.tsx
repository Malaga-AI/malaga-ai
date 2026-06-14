import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PARTICLE_COUNT = 12800
const SHAPE_COUNT = 3

const panels = [
  {
    kicker: 'Stop managing knowledge. Start using it.',
    title: 'Unlock collective wisdom.',
    copy: 'Plug into Malaga AI’s shared brainpower. Find events, builders, projects, partners, and practical AI knowledge in one connected community.',
    layout: 'left',
  },
  {
    kicker: 'Manifesto',
    title: 'Make decisions with confidence',
    copy: 'A stronger local AI scene helps builders move faster: shared context, useful demos, and people who can turn ideas into real systems.',
    layout: 'right',
  },
  {
    kicker: 'Shared context',
    title:
      'This is your community today. Countless fragments of critical knowledge scattered across meetups, teams, projects, and partners.',
    copy: 'Spend less time searching for the right people and more time learning, building, and sharing what works.',
    layout: 'center',
  },
] as const

const vertexShader = `
attribute vec3 aShape0;
attribute vec3 aShape1;
attribute vec3 aShape2;
attribute vec3 aColor;
attribute float aSeed;

uniform float uMorph;
uniform float uTime;
uniform float uPixelRatio;
uniform float uPointSize;
uniform vec2 uPointer;

varying vec3 vColor;
varying float vAlpha;
varying float vTwist;

vec3 getShape(float index) {
  if (index < 0.5) return aShape0;
  if (index < 1.5) return aShape1;
  return aShape2;
}

void main() {
  float m = clamp(uMorph, 0.0, 2.0);
  float segment = min(floor(m), 1.0);
  float localProgress = smoothstep(0.0, 1.0, m - segment);
  vec3 fromPos = getShape(segment);
  vec3 toPos = getShape(segment + 1.0);
  vec3 pos = mix(fromPos, toPos, localProgress);

  float transitionLift = sin(localProgress * 3.14159265359);
  vec3 drift = vec3(
    sin(aSeed * 31.7 + uTime * 0.45),
    cos(aSeed * 19.3 + uTime * 0.34),
    sin(aSeed * 23.1 - uTime * 0.28)
  );
  pos += drift * transitionLift * mix(0.18, 0.42, step(0.5, segment));
  pos.x += sin(uTime * 0.18 + aSeed * 12.0) * 0.025;
  pos.y += cos(uTime * 0.16 + aSeed * 7.0) * 0.018;

  float pointerDistance = distance(pos.xy, uPointer);
  float pointerPush = smoothstep(0.55, 0.0, pointerDistance) * 0.16;
  pos.xy += normalize(pos.xy - uPointer + 0.001) * pointerPush;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uPointSize * uPixelRatio * (1.1 + aSeed * 1.05) / max(0.72, -mvPosition.z);

  vColor = aColor;
  vAlpha = 0.66 + transitionLift * 0.28;
  vTwist = fract(aSeed * 7.31 + uMorph * 0.37);
}
`

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;
varying float vTwist;

float edge(vec2 p, vec2 a, vec2 b) {
  return (p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x);
}

void main() {
  vec2 p = gl_PointCoord - vec2(0.5);
  float angle = vTwist * 6.28318530718;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  p = rot * p;

  vec2 a = vec2(0.0, 0.42);
  vec2 b = vec2(-0.42, -0.34);
  vec2 c = vec2(0.42, -0.34);
  float e1 = edge(p, a, b);
  float e2 = edge(p, b, c);
  float e3 = edge(p, c, a);
  float inside = step(0.0, e1) * step(0.0, e2) * step(0.0, e3);
  float line = 1.0 - smoothstep(0.012, 0.052, min(min(abs(e1), abs(e2)), abs(e3)));
  float glow = smoothstep(0.52, 0.06, length(p)) * 0.28;
  float alpha = max(line, inside * 0.2 + glow) * vAlpha;

  gl_FragColor = vec4(vColor + glow * 0.28, alpha);
}
`

function random(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123
  return value - Math.floor(value)
}

function centeredRand(seed: number) {
  return random(seed) * 2 - 1
}

function writeShape(target: Float32Array, index: number, x: number, y: number, z: number) {
  const offset = index * 3
  target[offset] = x
  target[offset + 1] = y
  target[offset + 2] = z
}

function rotateY(x: number, z: number, angle: number) {
  return {
    x: x * Math.cos(angle) + z * Math.sin(angle),
    z: -x * Math.sin(angle) + z * Math.cos(angle),
  }
}

function rotateZ(x: number, y: number, angle: number) {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  }
}

function transformPoint(
  x: number,
  y: number,
  z: number,
  options: { scale: number; x: number; y: number; z: number; rotateY: number; rotateZ: number },
) {
  const yz = rotateY(x, z, options.rotateY)
  const xy = rotateZ(yz.x, y, options.rotateZ)
  return {
    x: xy.x * options.scale + options.x,
    y: xy.y * options.scale + options.y,
    z: yz.z * options.scale + options.z,
  }
}

function makeBrainFallback(index: number, side: 'right' | 'left') {
  const r1 = random(index + 10)
  const r2 = random(index + 20)
  const r3 = random(index + 30)
  const hemisphere = random(index + 40) > 0.5 ? 1 : -1
  const theta = r1 * Math.PI * 2
  const phi = Math.acos(2 * r2 - 1)
  const radius = 0.55 + Math.pow(r3, 2.2) * 0.48
  const fold = Math.sin(theta * 5 + r3 * 9) * 0.09
  const point = {
    x: hemisphere * 0.42 + Math.sin(phi) * Math.cos(theta) * radius * 0.58 + fold * hemisphere,
    y: Math.cos(phi) * radius * 0.82 + Math.sin(theta * 3) * 0.05,
    z: Math.sin(phi) * Math.sin(theta) * radius * 0.64,
  }

  return transformPoint(point.x, point.y, point.z, {
    scale: side === 'right' ? 1.62 : 2.25,
    x: side === 'right' ? 1.22 : -1.05,
    y: side === 'right' ? 0.02 : 0.02,
    z: 0,
    rotateY: side === 'right' ? -0.22 : 1.12,
    rotateZ: side === 'right' ? 0.02 : -0.06,
  })
}

function makeScatter(index: number) {
  const row = Math.floor(index / 160)
  const col = index % 160
  const x = (col / 159 - 0.5) * 5.25
  const y = (row / Math.ceil(PARTICLE_COUNT / 160) - 0.5) * 2.7
  const wave = Math.sin(x * 2.1 + row * 0.12) * 0.34
  const arc = Math.sin((col / 159) * Math.PI) * 0.68

  return {
    x: x + centeredRand(index + 200) * 0.16,
    y: y + wave + arc * 0.34 + centeredRand(index + 201) * 0.1,
    z: centeredRand(index + 202) * 1.15,
  }
}

function normaliseModel(source: ArrayLike<number>) {
  const sourceCount = Math.floor(source.length / 3)
  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity

  for (let i = 0; i < sourceCount; i += 1) {
    const x = source[i * 3]
    const y = source[i * 3 + 1]
    const z = source[i * 3 + 2]
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    minZ = Math.min(minZ, z)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    maxZ = Math.max(maxZ, z)
  }

  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const centerZ = (minZ + maxZ) / 2
  const scale = 1 / Math.max(maxX - minX, maxY - minY, maxZ - minZ)

  return { centerX, centerY, centerZ, scale, sourceCount }
}

function makeBrainFromModel(source: ArrayLike<number>, side: 'right' | 'left') {
  const target = new Float32Array(PARTICLE_COUNT * 3)
  const model = normaliseModel(source)

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const sourceIndex = (i * 7) % model.sourceCount
    const point = transformPoint(
      (source[sourceIndex * 3] - model.centerX) * model.scale,
      (source[sourceIndex * 3 + 1] - model.centerY) * model.scale,
      (source[sourceIndex * 3 + 2] - model.centerZ) * model.scale,
      {
        scale: side === 'right' ? 2.45 : 3.25,
        x: side === 'right' ? 1.25 : -1.15,
        y: side === 'right' ? 0.02 : 0.02,
        z: 0,
        rotateY: side === 'right' ? -0.16 : 1.18,
        rotateZ: side === 'right' ? 0.02 : -0.05,
      },
    )
    writeShape(target, i, point.x, point.y, point.z)
  }

  return target
}

function buildGeometry() {
  const geometry = new BufferGeometry()
  const shapes = Array.from({ length: SHAPE_COUNT }, () => new Float32Array(PARTICLE_COUNT * 3))
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const seeds = new Float32Array(PARTICLE_COUNT)
  const palette = [new Color('#facc15'), new Color('#8b5cf6'), new Color('#14b8a6'), new Color('#e5e7eb')]

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const points = [makeBrainFallback(i, 'right'), makeBrainFallback(i, 'left'), makeScatter(i)]
    points.forEach((point, shapeIndex) => writeShape(shapes[shapeIndex], i, point.x, point.y, point.z))

    const color = palette[Math.floor(random(i + 260) * palette.length)]
    const cOffset = i * 3
    colors[cOffset] = color.r
    colors[cOffset + 1] = color.g
    colors[cOffset + 2] = color.b
    seeds[i] = random(i + 300)
  }

  geometry.setAttribute('position', new BufferAttribute(shapes[0], 3))
  shapes.forEach((shape, index) => geometry.setAttribute(`aShape${index}`, new BufferAttribute(shape, 3)))
  geometry.setAttribute('aColor', new BufferAttribute(colors, 3))
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))
  geometry.computeBoundingSphere()
  return geometry
}

export function DalaParticleTransition() {
  const rootRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const canvasHost = canvasRef.current
      if (!canvasHost) return undefined

      const geometry = buildGeometry()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const scene = new Scene()
      const camera = new PerspectiveCamera(42, 1, 0.1, 100)
      camera.position.set(0, 0, 4.25)

      const renderer = new WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio <= 1.5,
        preserveDrawingBuffer: import.meta.env.DEV,
      })
      renderer.setClearAlpha(0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
      canvasHost.appendChild(renderer.domElement)

      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uMorph: { value: 0 },
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.7) },
          uPointSize: { value: window.innerWidth < 768 ? 12 : 8.5 },
          uPointer: { value: new Vector2(8, 8) },
        },
      })

      const particles = new Points(geometry, material)
      scene.add(particles)

      const loader = new GLTFLoader()
      loader.load('/brain.glb', (gltf) => {
        let source: ArrayLike<number> | null = null

        gltf.scene.traverse((child) => {
          if (child instanceof Mesh && !source) {
            source = child.geometry.getAttribute('position')?.array ?? null
          }
        })

        if (!source) return

        const rightBrain = makeBrainFromModel(source, 'right')
        const leftBrain = makeBrainFromModel(source, 'left')
        geometry.setAttribute('position', new BufferAttribute(rightBrain, 3))
        geometry.setAttribute('aShape0', new BufferAttribute(rightBrain, 3))
        geometry.setAttribute('aShape1', new BufferAttribute(leftBrain, 3))
        geometry.attributes.position.needsUpdate = true
        geometry.attributes.aShape0.needsUpdate = true
        geometry.attributes.aShape1.needsUpdate = true
        geometry.computeBoundingSphere()
        ScrollTrigger.refresh()
      })

      const setSize = () => {
        const width = canvasHost.clientWidth
        const height = canvasHost.clientHeight
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.position.z = width < 768 ? 5.3 : 4.25
        camera.updateProjectionMatrix()
        material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.7)
        material.uniforms.uPointSize.value = width < 768 ? 12 : 8.5
      }
      setSize()

      const xTo = gsap.quickTo(material.uniforms.uPointer.value, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(material.uniforms.uPointer.value, 'y', { duration: 0.45, ease: 'power3.out' })
      const pointerWorld = new Vector3()

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvasHost.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const ndcY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
        pointerWorld.set(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize()

        const distanceToParticlePlane = -camera.position.z / pointerWorld.z
        const x = camera.position.x + pointerWorld.x * distanceToParticlePlane
        const y = camera.position.y + pointerWorld.y * distanceToParticlePlane
        xTo(x)
        yTo(y)
      }

      window.addEventListener('resize', setSize, { passive: true })
      window.addEventListener('pointermove', onPointerMove, { passive: true })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: reduceMotion ? false : 1,
        },
      })

      timeline
        .to(material.uniforms.uMorph, { value: reduceMotion ? 2 : 1, ease: 'none', duration: 1 })
        .to(material.uniforms.uMorph, { value: 2, ease: 'none', duration: 1 })

      const textItems = gsap.utils.toArray<HTMLElement>('.dala-panel', rootRef.current)
      textItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 42, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 66%',
              end: 'center center',
              scrub: reduceMotion ? false : 0.7,
            },
          },
        )
      })

      let frame = 0
      const renderFrame = (time: number) => {
        frame += 1
        if (frame % 2 === 0) {
          material.uniforms.uTime.value = time
          renderer.render(scene, camera)
        }
      }
      gsap.ticker.add(renderFrame)

      renderer.render(scene, camera)

      return () => {
        gsap.ticker.remove(renderFrame)
        window.removeEventListener('resize', setSize)
        window.removeEventListener('pointermove', onPointerMove)
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === rootRef.current || textItems.includes(trigger.trigger as HTMLElement)) trigger.kill()
        })
        timeline.kill()
        scene.remove(particles)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    },
    { scope: rootRef },
  )

  return (
    <section id="top" ref={rootRef} className="dala-stage relative min-h-[330vh] overflow-clip bg-[#05070d]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(250,204,21,0.1),transparent_30%),radial-gradient(circle_at_18%_70%,rgba(20,184,166,0.14),transparent_28%),linear-gradient(180deg,rgba(5,7,13,0.12),#05070d_96%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:46px_46px] opacity-70" />
        <div ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d] to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {panels.map((panel, index) => (
          <article
            key={panel.title}
            className={`dala-panel mx-auto flex min-h-screen max-w-7xl px-4 py-24 sm:px-6 lg:px-8 ${
              panel.layout === 'center' ? 'items-center justify-center text-center' : 'items-center'
            }`}
          >
            <div
              className={`${
                panel.layout === 'right'
                  ? 'ml-auto max-w-lg text-left lg:text-left'
                  : panel.layout === 'center'
                    ? 'mx-auto max-w-6xl'
                    : 'max-w-2xl pt-16'
              }`}
            >
              {panel.layout !== 'center' && (
                <p className="text-xs font-black uppercase tracking-[0.12em] text-yellow-300">{panel.kicker}</p>
              )}
              {index === 0 ? (
              <h1 className="mt-5 font-sans text-6xl font-semibold leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)] sm:text-7xl lg:text-8xl">
                  {panel.title}
                </h1>
              ) : (
                <h2
                  className={`font-sans font-medium tracking-[-0.07em] text-white ${
                    panel.layout === 'center'
                      ? 'text-4xl leading-[1.08] drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)] sm:text-5xl lg:text-6xl'
                      : 'mt-5 text-4xl leading-[1.08] drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)] sm:text-5xl lg:text-6xl'
                  }`}
                >
                  {panel.title}
                </h2>
              )}
              <p
                className={`mt-6 text-base leading-8 text-slate-100 sm:text-lg ${
                  panel.layout === 'center' ? 'mx-auto max-w-5xl text-3xl leading-tight sm:text-4xl' : 'max-w-xl'
                }`}
              >
                {panel.copy}
              </p>
              {index === 0 && (
                <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#join-form">
                    Join the community <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button href="#events" variant="secondary">
                    Explore events
                  </Button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
