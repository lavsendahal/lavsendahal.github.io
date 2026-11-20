/* Frameless 3D respiratory point-cloud renderer driven by exported anatomical poses. */
(() => {
  'use strict';
  const stage = document.getElementById('pc-stage');
  const canvas = document.getElementById('pc-canvas');
  const pauseBtn = document.getElementById('pc-pause');
  if (!stage || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const base = 'assets/hero/';
  const state = {
    paused: reduce.matches, time: 0, raf: 0, last: 0, drawn: 0,
    visible: true, width: 320, height: 320, period: 5, model: null
  };

  function updateBtn() {
    if (!pauseBtn) return;
    pauseBtn.textContent = state.paused ? 'Resume' : 'Pause';
    pauseBtn.setAttribute('aria-pressed', String(state.paused));
  }

  function project(x, y, z) {
    const yaw = -0.22;
    const depth = x * Math.sin(yaw) + y * Math.cos(yaw);
    const scale = Math.min((state.height * 0.88) / 660, (state.width * 0.78) / 400);
    return {
      x: state.width * 0.50 + (-x * Math.cos(yaw) + y * Math.sin(yaw)) * scale,
      y: state.height * 0.51 + (-z + 0.10 * depth) * scale,
      z: depth
    };
  }

  function draw() {
    const data = state.model;
    if (!data) return;
    ctx.clearRect(0, 0, state.width, state.height);
    const count = data.spec.pointCount;
    const frames = data.spec.frames;
    const phase = frames > 1 ? ((state.time / state.period) % 1) * frames : 0;
    const first = Math.floor(phase);
    const next = (first + 1) % frames;
    const blend = phase - first;
    const stride = state.width < 280 ? 2 : 1;
    const points = [];

    for (let i = 0; i < count; i += stride) {
      const a = (first * count + i) * 3;
      const b = (next * count + i) * 3;
      const x = (data.coords[a] * (1 - blend) + data.coords[b] * blend) * 0.1;
      const y = (data.coords[a + 1] * (1 - blend) + data.coords[b + 1] * blend) * 0.1;
      const z = (data.coords[a + 2] * (1 - blend) + data.coords[b + 2] * blend) * 0.1;
      const p = project(x, y, z);
      p.group = data.groups[i];
      points.push(p);
    }
    points.sort((a, b) => a.z - b.z);

    if (data.ribLines) {
      const spec = data.spec.ribLines;
      const lines = data.ribLines;
      ctx.strokeStyle = 'rgba(24, 74, 140, 0.24)';
      ctx.lineWidth = 0.75;
      for (let l = 0; l < spec.lineCount; l++) {
        ctx.beginPath();
        for (let j = 0; j < spec.samplesPerLine; j++) {
          const a = ((first * spec.lineCount + l) * spec.samplesPerLine + j) * 3;
          const b = ((next * spec.lineCount + l) * spec.samplesPerLine + j) * 3;
          const p = project(
            (lines[a] * (1 - blend) + lines[b] * blend) * 0.1,
            (lines[a + 1] * (1 - blend) + lines[b + 1] * blend) * 0.1,
            (lines[a + 2] * (1 - blend) + lines[b + 2] * blend) * 0.1
          );
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    }

    for (const p of points) {
      const lung = p.group === 1 || p.group === 2;
      const body = p.group === 0;
      const bone = p.group === 9 || p.group === 10 || (p.group >= 20 && p.group <= 51);
      const alpha = body ? 0.13 : lung ? 0.70 : bone ? 0.48 : 0.34;
      ctx.fillStyle = lung
        ? 'rgba(190, 82, 45, ' + alpha + ')'
        : body
          ? 'rgba(90, 98, 112, ' + alpha + ')'
          : bone
            ? 'rgba(24, 74, 140, ' + alpha + ')'
            : 'rgba(60, 92, 130, ' + alpha + ')';
      const radius = body ? 0.65 : lung ? 1.15 : bone ? 0.8 : 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function tick(now) {
    state.raf = 0;
    if (state.paused || !state.visible || document.hidden) return;
    if (state.last) state.time += Math.min((now - state.last) / 1000, 0.08);
    state.last = now;
    if (now - state.drawn > 1000 / 30) {
      state.drawn = now;
      draw();
    }
    state.raf = requestAnimationFrame(tick);
  }

  function stop() { cancelAnimationFrame(state.raf); state.raf = 0; state.last = 0; }
  function start() { if (!state.raf && !state.paused && state.visible && !document.hidden) { state.last = 0; state.raf = requestAnimationFrame(tick); } }
  function resize() {
    state.width = stage.clientWidth;
    state.height = stage.clientHeight;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * d);
    canvas.height = Math.round(state.height * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    draw();
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      state.paused = !state.paused;
      updateBtn();
      if (state.paused) { stop(); draw(); } else start();
    });
  }
  reduce.addEventListener('change', () => { if (reduce.matches) { state.paused = true; stop(); } updateBtn(); draw(); });
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(entries => {
    state.visible = entries[0].isIntersecting;
    if (state.visible) start(); else stop();
  }).observe(stage);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });

  updateBtn();
  resize();

  fetch(base + 'manifest.json')
    .then(r => r.json())
    .then(async manifest => {
      state.period = manifest.motion.periodSeconds || 5;
      const spec = manifest.motion;
      const [cRes, gRes] = await Promise.all([fetch(base + spec.file), fetch(base + spec.groups)]);
      const [cBuf, gBuf] = await Promise.all([cRes.arrayBuffer(), gRes.arrayBuffer()]);
      const model = { spec, coords: new Int16Array(cBuf), groups: new Uint8Array(gBuf) };
      if (spec.ribLines) {
        try {
          const rRes = await fetch(base + spec.ribLines.file);
          if (rRes.ok) model.ribLines = new Int16Array(await rRes.arrayBuffer());
        } catch (_) {}
      }
      state.model = model;
      draw();
      start();
    })
    .catch(() => {});
})();
