'use client';
import { useEffect, useRef } from 'react';
import { WEBGL_SHADER } from '@/lib/constants';

export function WebGLShaderBackground({
  className,
  reducedMotion = false,
}: {
  className?: string;
  reducedMotion?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    container.appendChild(canvas);
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;
    const syncSize = () => {
      const w = canvas.clientWidth || container.clientWidth || 1280;
      const h = canvas.clientHeight || container.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null;
    if (ro) ro.observe(canvas);
    const webgl = gl;
    const createShader = (type: number, src: string) => {
      const s = webgl.createShader(type)!;
      webgl.shaderSource(s, src);
      webgl.compileShader(s);
      return s;
    };
    const prog = webgl.createProgram()!;
    webgl.attachShader(prog, createShader(webgl.VERTEX_SHADER, WEBGL_SHADER.vertexShader));
    webgl.attachShader(prog, createShader(webgl.FRAGMENT_SHADER, WEBGL_SHADER.fragmentShader));
    webgl.linkProgram(prog);
    webgl.useProgram(prog);
    const buf = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buf);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), webgl.STATIC_DRAW);
    const pos = webgl.getAttribLocation(prog, 'a_position');
    webgl.enableVertexAttribArray(pos);
    webgl.vertexAttribPointer(pos, 2, webgl.FLOAT, false, 0, 0);
    const uTime = webgl.getUniformLocation(prog, 'u_time');
    const uRes = webgl.getUniformLocation(prog, 'u_resolution');
    const uMouse = webgl.getUniformLocation(prog, 'u_mouse');
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      mouse.y = (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
    };
    window.addEventListener('mousemove', onMouseMove);
    let raf = 0;
    const render = (t: number) => {
      webgl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) webgl.uniform1f(uTime, t * 0.001);
      if (uRes) webgl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) webgl.uniform2f(uMouse, mouse.x, mouse.y);
      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      if (ro) ro.disconnect();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return <div ref={containerRef} id="shader-canvas-container" className={`fixed inset-0 z-0 opacity-60 ${className || ''}`} style={{ display: 'block' }} />;
}
