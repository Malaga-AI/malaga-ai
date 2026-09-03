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
  PerspectiveCamera,
  NormalBlending,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { Button } from '@/components/ui/button'
import { useTheme, type Theme } from '@/lib/theme'
import { useTexts } from '@/lib/texts'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PARTICLE_COUNT = 12800
const SHAPE_COUNT = 3

// Logo particle source: the SVG is rasterised to an offscreen canvas and its
// opaque pixels become the point cloud that the particles assemble into.
const LOGO_SRC = '/logo-particles.svg'
const RASTER_SIZE = 620
const LOGO_ALPHA_CUTOFF = 40
const LOGO_SPAN = 3.1
// World-space offset of the assembled logo. Positive x shifts it right.
const LOGO_OFFSET_X = 1.15
const LOGO_OFFSET_Y = 0
// On scroll the whole particle cloud slides left into the second page's
// negative space (text is right-aligned there), then re-centres for the
// centered third page. Roughly mirrors the logo across to the left.
// Keep the Events artwork fully on the left, leaving the right side clear for
// its copy. The prior offset left an unnecessary empty strip on wide screens.
const SCROLL_SHIFT_X = -3.05

// Particle colours per theme. Dark leans on white/cyan over near-black; light
// leans on brand navy/teal over a pale stage.
const STAGE_PALETTE: Record<Theme, string[]> = {
  dark: ['#18DAE3', '#e5e7eb', '#8ef0f5', '#ffffff'],
  light: ['#18DAE3', '#090E2A', '#0e7c8f', '#1f2a52'],
}
const STAGE_ACCENT: Record<Theme, string> = { dark: '#facc15', light: '#b45309' }
// Core highlight direction: brighten on dark, darken on light.
const STAGE_GLOW: Record<Theme, number> = { dark: 0.28, light: -0.22 }

const panelLayouts = ['left', 'right', 'center'] as const

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
uniform float uGlow;

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

  gl_FragColor = vec4(vColor + glow * uGlow, alpha);
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

// Soft disc of points shown while the logo SVG is still rasterising.
function makeDiscFallback(index: number) {
  const radius = Math.sqrt(random(index + 10)) * 1.45
  const theta = random(index + 20) * Math.PI * 2
  return {
    x: Math.cos(theta) * radius,
    y: Math.sin(theta) * radius * 0.92,
    z: centeredRand(index + 30) * 0.1,
  }
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

type LogoPool = {
  points: Float32Array
  count: number
  centerX: number
  centerY: number
  extent: number
}

// Rasterise the logo image and collect every opaque pixel, plus the bounding
// box of the artwork so it can be centred and scaled independently of margins.
function collectOpaquePixels(image: HTMLImageElement): LogoPool | null {
  const canvas = document.createElement('canvas')
  canvas.width = RASTER_SIZE
  canvas.height = RASTER_SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const naturalW = image.naturalWidth || image.width || RASTER_SIZE
  const naturalH = image.naturalHeight || image.height || RASTER_SIZE
  const fit = Math.min(RASTER_SIZE / naturalW, RASTER_SIZE / naturalH)
  const drawW = naturalW * fit
  const drawH = naturalH * fit
  ctx.drawImage(image, (RASTER_SIZE - drawW) / 2, (RASTER_SIZE - drawH) / 2, drawW, drawH)

  const { data } = ctx.getImageData(0, 0, RASTER_SIZE, RASTER_SIZE)
  const collected: number[] = []
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (let py = 0; py < RASTER_SIZE; py += 1) {
    for (let px = 0; px < RASTER_SIZE; px += 1) {
      const alpha = data[(py * RASTER_SIZE + px) * 4 + 3]
      if (alpha > LOGO_ALPHA_CUTOFF) {
        collected.push(px, py)
        if (px < minX) minX = px
        if (px > maxX) maxX = px
        if (py < minY) minY = py
        if (py > maxY) maxY = py
      }
    }
  }

  if (collected.length === 0) return null

  return {
    points: Float32Array.from(collected),
    count: collected.length / 2,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    extent: Math.max(maxX - minX, maxY - minY) || RASTER_SIZE,
  }
}

// Sample the opaque-pixel pool into a full particle shape, mapped to centred
// world coordinates. seedOffset lets shape0/shape1 draw slightly different
// samples so the logo gently shimmers during the first morph segment.
function makeLogoShape(pool: LogoPool, seedOffset: number) {
  const target = new Float32Array(PARTICLE_COUNT * 3)

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const pick = Math.floor(random(i + seedOffset) * pool.count) * 2
    const px = pool.points[pick]
    const py = pool.points[pick + 1]
    const x = ((px - pool.centerX) / pool.extent) * LOGO_SPAN + LOGO_OFFSET_X + centeredRand(i + seedOffset + 1) * 0.012
    const y = (-(py - pool.centerY) / pool.extent) * LOGO_SPAN + LOGO_OFFSET_Y + centeredRand(i + seedOffset + 2) * 0.012
    const z = centeredRand(i + seedOffset + 3) * 0.08
    writeShape(target, i, x, y, z)
  }

  return target
}

function buildGeometry(theme: Theme) {
  const geometry = new BufferGeometry()
  const shapes = Array.from({ length: SHAPE_COUNT }, () => new Float32Array(PARTICLE_COUNT * 3))
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const seeds = new Float32Array(PARTICLE_COUNT)
  // Brand-led palette (matching the logo): cyan plus the theme's ink colour.
  // On dark that ink is white; on light it is the brand navy, because white
  // particles are invisible against a light stage. The rare warm spark is
  // rolled separately so it stays ~8% of particles.
  const palette = STAGE_PALETTE[theme].map((hex) => new Color(hex))
  const accent = new Color(STAGE_ACCENT[theme])

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const points = [makeDiscFallback(i), makeDiscFallback(i + 7000), makeScatter(i)]
    points.forEach((point, shapeIndex) => writeShape(shapes[shapeIndex], i, point.x, point.y, point.z))

    const color = random(i + 280) > 0.92 ? accent : palette[Math.floor(random(i + 260) * palette.length)]
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
  const { theme } = useTheme()
  const texts = useTexts().hero
  const panels = panelLayouts.map((layout, index) => ({ ...texts.panels[index], layout }))

  useGSAP(
    () => {
      const canvasHost = canvasRef.current
      if (!canvasHost) return undefined

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

      // Reduced motion skips the WebGL particle scene entirely rather than
      // just disabling its scroll-linked scrub: building shaders and driving
      // a render loop is non-essential motion work these users didn't ask for.
      if (reduceMotion) {
        return () => {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (textItems.includes(trigger.trigger as HTMLElement)) trigger.kill()
          })
        }
      }

      const geometry = buildGeometry(theme)
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
        // Additive blending only reads well over a dark stage; on light it
        // washes every particle out to the background colour.
        blending: theme === 'light' ? NormalBlending : AdditiveBlending,
        uniforms: {
          uGlow: { value: STAGE_GLOW[theme] },
          uMorph: { value: 0 },
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.7) },
          uPointSize: { value: window.innerWidth < 768 ? 12 : 8.5 },
          uPointer: { value: new Vector2(8, 8) },
        },
      })

      const particles = new Points(geometry, material)
      scene.add(particles)

      const logoImage = new Image()
      logoImage.crossOrigin = 'anonymous'
      logoImage.decoding = 'async'
      logoImage.onload = () => {
        const pool = collectOpaquePixels(logoImage)
        if (!pool) return

        const logoShape0 = makeLogoShape(pool, 500)
        const logoShape1 = makeLogoShape(pool, 900000)
        geometry.setAttribute('position', new BufferAttribute(logoShape0, 3))
        geometry.setAttribute('aShape0', new BufferAttribute(logoShape0, 3))
        geometry.setAttribute('aShape1', new BufferAttribute(logoShape1, 3))
        geometry.attributes.position.needsUpdate = true
        geometry.attributes.aShape0.needsUpdate = true
        geometry.attributes.aShape1.needsUpdate = true
        geometry.computeBoundingSphere()
        ScrollTrigger.refresh()
      }
      logoImage.src = LOGO_SRC

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
      const pointerPlane = new Vector2()
      let hasPointer = false

      // The shader receives positions in the particle object's local space,
      // while the raycast below produces world-space coordinates. Recalculate
      // this whenever the object moves as well as when the pointer moves.
      const updatePointer = () => {
        if (!hasPointer) return
        xTo(pointerPlane.x - particles.position.x)
        yTo(pointerPlane.y - particles.position.y)
      }

      const onPointerMove = (event: PointerEvent) => {
        const rect = canvasHost.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const ndcY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
        pointerWorld.set(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize()

        const distanceToParticlePlane = -camera.position.z / pointerWorld.z
        pointerPlane.set(
          camera.position.x + pointerWorld.x * distanceToParticlePlane,
          camera.position.y + pointerWorld.y * distanceToParticlePlane,
        )
        hasPointer = true
        updatePointer()
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

      const scrollShiftX = reduceMotion ? 0 : SCROLL_SHIFT_X
      timeline
        // Page 1 -> Page 2: logo shimmers while sliding left into the negative space.
        .to(material.uniforms.uMorph, { value: reduceMotion ? 2 : 1, ease: 'none', duration: 1 })
        .to(particles.position, { x: scrollShiftX, ease: 'none', duration: 1 }, '<')
        // Page 2 -> Page 3: particles scatter and re-centre behind the centered copy.
        .to(material.uniforms.uMorph, { value: 2, ease: 'none', duration: 1 })
        .to(particles.position, { x: 0, ease: 'none', duration: 1 }, '<')
      timeline.eventCallback('onUpdate', updatePointer)

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
    { scope: rootRef, dependencies: [theme] },
  )

  return (
    <section id="top" ref={rootRef} className="dala-stage relative min-h-[330vh] overflow-clip bg-hero-bg">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--hero-fog)]" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--hero-grid)_1px,transparent_1px),linear-gradient(90deg,var(--hero-grid-cross)_1px,transparent_1px)] bg-[size:46px_46px] opacity-70" />
        <div ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-hero-bg to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {panels.map((panel, index) => (
          <article
            key={panel.title}
            className={`dala-panel mx-auto flex min-h-screen max-w-7xl px-4 py-24 sm:px-6 lg:px-8 ${panel.layout === 'center' ? 'items-center justify-center text-center' : 'items-center'
              }`}
          >
            <div
              className={`${panel.layout === 'right'
                ? 'ml-auto max-w-lg text-left lg:text-left'
                : panel.layout === 'center'
                  ? 'mx-auto max-w-6xl'
                  : 'max-w-2xl pt-16'
                }`}
            >
              {panel.layout !== 'center' && (
                <p className="text-xs font-black uppercase tracking-[0.12em] text-hero-kicker">{panel.kicker}</p>
              )}
              {index === 0 ? (
                <h1 className="mt-5 font-safiro text-6xl font-semibold leading-[0.9] tracking-normal text-hero-ink drop-shadow-hero sm:text-7xl lg:text-8xl">
                  {panel.title}
                </h1>
              ) : (
                <h2
                  className={`font-sans font-medium tracking-[-0.07em] text-hero-ink ${panel.layout === 'center'
                    ? 'text-4xl leading-[1.08] drop-shadow-hero sm:text-5xl lg:text-6xl'
                    : 'mt-5 text-4xl leading-[1.08] drop-shadow-hero sm:text-5xl lg:text-6xl'
                    }`}
                >
                  {panel.title}
                </h2>
              )}
              <p
                className={`mt-6 text-base leading-8 text-hero-ink-muted drop-shadow-hero sm:text-lg ${panel.layout === 'center' ? 'mx-auto max-w-5xl text-3xl leading-tight sm:text-4xl' : 'max-w-xl'
                  }`}
              >
                {panel.copy}
              </p>
              {index === 0 && (
                <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#contact-form">
                    {texts.contactCta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              {index === 1 && (
                <div className="pointer-events-auto mt-8 flex">
                  <Button href="#events" variant="secondary">
                    {texts.eventsCta} <ArrowRight className="ml-2 h-4 w-4" />
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
