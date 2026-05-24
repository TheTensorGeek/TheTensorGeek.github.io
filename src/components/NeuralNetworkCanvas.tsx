import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec2 rotate(vec2 p, float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a)) * p;
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  return length(p - mix(a, b, clamp(dot(p - a, b - a) / dot(b - a, b - a), 0.0, 1.0)));
}

vec4 node(vec2 p, float t, float id, vec2 pos, float nodeSize, float activeVal, float pulseVal) {
  float d = length(p - pos);
  float isActive = step(0.5, activeVal);
  float pulse = pulseVal * (0.5 + 0.5 * sin(t * 2.0 + id * 10.0));
  float nGlow = exp(-d * d * (3.5 - pulse * 1.5) / nodeSize) * (0.3 + 0.7 * isActive);
  float nRing = exp(-pow(abs(d - nodeSize * 0.6), 2.0) * 15.0 / nodeSize) * (0.15 + 0.35 * isActive);
  float nCore = smoothstep(nodeSize * 0.08, 0.0, d) * (0.5 + 0.5 * isActive);
  return vec4(nGlow, nRing, nCore, isActive);
}

vec3 connection(vec2 p, vec2 a, vec2 b, float aActive, float bActive, float pulseVal) {
  float d = sdSegment(p, a, b);
  float isActive = aActive * bActive;
  float cGlow = exp(-d * d * 25.0) * (0.04 + 0.16 * isActive + 0.08 * pulseVal);
  return vec3(cGlow, isActive, pulseVal);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = u_time * 0.4;

  vec2 mouseDistort = vec2(0.0);
  if (u_mouse.x > 0.0) {
    vec2 mNorm = (u_mouse / u_resolution - 0.5) * vec2(aspect, 1.0);
    mouseDistort = -(mNorm - p) * 0.15 * exp(-length(p - mNorm) * 4.0);
  }
  p += mouseDistort;

  vec3 colPrimary = vec3(0.145, 0.388, 0.922);
  vec3 colSecondary = vec3(0.023, 0.713, 0.831);
  vec3 colTertiary = vec3(0.925, 0.286, 0.6);
  vec3 colWhite = vec3(0.98, 0.98, 0.98);
  vec3 colNode = vec3(0.05, 0.05, 0.06);

  vec3 col = vec3(0.035, 0.035, 0.04);
  col += mix(colPrimary * 0.06, colSecondary * 0.05, uv.x) * exp(-length(p) * 1.5);

  float r1 = length(p * rotate(vec2(1.0, 0.0), t * 0.05));
  float ring1 = max(exp(-pow(abs(r1 - 0.3), 2.0) * 200.0) * 0.06, 0.0);
  col += mix(colPrimary, colSecondary, 0.5) * ring1 * (0.8 + 0.2 * sin(t));

  float r2 = length(p * rotate(vec2(1.0, 0.0), -t * 0.08 + 1.0));
  float ring2 = max(exp(-pow(abs(r2 - 0.55), 2.0) * 400.0) * 0.04, 0.0);
  col += mix(colSecondary, colTertiary, 0.5) * ring2 * (0.8 + 0.2 * sin(t * 1.3 + 2.0));

  vec2 nodes[10];
  nodes[0] = vec2(-0.42, 0.12);
  nodes[1] = vec2(-0.18, 0.28);
  nodes[2] = vec2(0.08, 0.15);
  nodes[3] = vec2(0.32, 0.32);
  nodes[4] = vec2(-0.28, -0.15);
  nodes[5] = vec2(0.0, -0.05);
  nodes[6] = vec2(0.25, -0.12);
  nodes[7] = vec2(-0.12, -0.32);
  nodes[8] = vec2(0.18, -0.28);
  nodes[9] = vec2(0.42, -0.05);

  float nodeSize = 0.055;
  float totalGlow = 0.0;
  float totalRing = 0.0;
  float totalCore = 0.0;
  float activeCount = 0.0;
  float activations[10];

  for (int i = 0; i < 10; i++) {
    float fi = float(i);
    float seed = fi * 37.0;
    float driftX = sin(t * 0.3 + seed) * 0.015;
    float driftY = cos(t * 0.25 + seed + 10.0) * 0.012;
    nodes[i] += vec2(driftX, driftY);

    float act1 = noise(vec2(fi * 3.7 + 100.0, t * 0.15));
    float act2 = noise(vec2(fi * 2.3 + 200.0, t * 0.2 + 50.0));
    float active = step(0.55, act1 * act2);
    vec4 n = node(p, t, fi, nodes[i], nodeSize, active, 0.0);
    totalGlow += n.x;
    totalRing += n.y;
    totalCore += n.z;
    activeCount += n.w;
    activations[i] = n.w;
  }

  // Connections
  #define CONNECT(i, j) { \
    vec2 a = nodes[i]; \
    vec2 b = nodes[j]; \
    float aActive = activations[i]; \
    float bActive = activations[j]; \
    float pDist = length(a - b); \
    float isPairActive = aActive * bActive; \
    float pulse = noise(vec2(float(i) * 13.0 + float(j) * 7.0 + 300.0, t * 0.4)) * isPairActive; \
    vec3 c = connection(p, a, b, aActive, bActive, pulse); \
    float att = 1.0 / (1.0 + pDist * pDist * 8.0); \
    vec3 colMix = mix(mix(colPrimary, colSecondary, pDist * 1.5), colTertiary, pulse); \
    col += colMix * c.x * att * (1.0 + c.y * 0.5); \
    totalGlow += c.x * att * 2.0 * (0.5 + c.z); \
  }

  CONNECT(0, 1)
  CONNECT(1, 2)
  CONNECT(2, 3)
  CONNECT(0, 4)
  CONNECT(1, 5)
  CONNECT(2, 6)
  CONNECT(3, 6)
  CONNECT(4, 5)
  CONNECT(5, 6)
  CONNECT(4, 7)
  CONNECT(5, 7)
  CONNECT(5, 8)
  CONNECT(6, 9)
  CONNECT(7, 8)
  CONNECT(8, 9)

  vec3 nodeCol = mix(mix(colPrimary, colSecondary, 0.5), colTertiary, activeCount * 0.15);
  col += colWhite * totalGlow * 0.5 * nodeCol;
  col += colWhite * totalRing * 0.6 * nodeCol;
  col = mix(col, colNode, totalCore);
  col += colWhite * totalCore * 0.5;

  col *= 0.97 + 0.03 * sin(gl_FragCoord.y * 1.5);
  col *= 1.0 - smoothstep(0.3, 1.1, length(p)) * 0.5;
  col = pow(max(col, vec3(0.0)), vec3(0.95, 1.0, 1.05));

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Full-screen triangle
    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    startTimeRef.current = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    function render() {
      if (!gl || !program) return;
      const time = (performance.now() - startTimeRef.current) * 0.001;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      mouseRef.current = {
        x: e.clientX * dpr,
        y: (window.innerHeight - e.clientY) * dpr,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
