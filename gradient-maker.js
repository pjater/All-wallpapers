const gradientPresets = [
  {
    name: "Midnight",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#0a0a0f", pos: 0 },
      { color: "#1a1a2e", pos: 50 },
      { color: "#2f8cff", pos: 100 }
    ]
  },
  {
    name: "Aurora",
    type: "linear",
    angle: 160,
    stops: [
      { color: "#00c9a7", pos: 0 },
      { color: "#845ec2", pos: 50 },
      { color: "#ff6f91", pos: 100 }
    ]
  },
  {
    name: "Ember",
    type: "radial",
    stops: [
      { color: "#ff4e50", pos: 0 },
      { color: "#f9d423", pos: 100 }
    ],
    shape: "ellipse",
    position: "center"
  },
  {
    name: "Ocean",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#0f2027", pos: 0 },
      { color: "#203a43", pos: 50 },
      { color: "#2c5364", pos: 100 }
    ]
  },
  {
    name: "Neon Dusk",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#f953c6", pos: 0 },
      { color: "#b91d73", pos: 100 }
    ]
  },
  {
    name: "Arctic",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#e0eafc", pos: 0 },
      { color: "#cfdef3", pos: 100 }
    ]
  },
  {
    name: "Void",
    type: "radial",
    stops: [
      { color: "#200122", pos: 0 },
      { color: "#6f0000", pos: 100 }
    ],
    shape: "circle",
    position: "center"
  },
  {
    name: "Holo",
    type: "conic",
    angle: 0,
    stops: [
      { color: "#ff0080", pos: 0 },
      { color: "#ff8c00", pos: 25 },
      { color: "#40e0d0", pos: 50 },
      { color: "#ff0080", pos: 100 }
    ]
  }
];

const gradientTypeOptions = [
  { id: "linear", label: "Linear" },
  { id: "radial", label: "Radial" },
  { id: "conic", label: "Conic" },
  { id: "mesh", label: "Mesh" }
];

const resolutionOptions = [
  { id: "hd", label: "HD 1080p", width: 1920, height: 1080 },
  { id: "qhd", label: "QHD 1440p", width: 2560, height: 1440 },
  { id: "4k", label: "4K", width: 3840, height: 2160 },
  { id: "5k", label: "5K", width: 5120, height: 2880 },
  { id: "ultrawide", label: "Ultrawide 1440p", width: 3440, height: 1440 },
  { id: "custom", label: "Custom", width: 1920, height: 1080 }
];

const radialPositions = [
  { id: "center", label: "Center" },
  { id: "top-left", label: "Top Left" },
  { id: "top-right", label: "Top Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-right", label: "Bottom Right" },
  { id: "custom", label: "Custom" }
];

const radialShapes = [
  { id: "circle", label: "Circle" },
  { id: "ellipse", label: "Ellipse" }
];

const MAX_STOPS = 6;
const MAX_GLOW_SPOTS = 10;
const MAX_CUSTOM_WIDTH = 7680;
const MAX_CUSTOM_HEIGHT = 4320;
const GLOW_PREVIEW_RENDER_MS = 32;

let stopIdCounter = 0;
let glowSpotIdCounter = 0;
let noiseCache = new Map();
let renderDebounceTimer = 0;
let glowPreviewDebounceTimer = 0;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const gcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y) {
    const temp = y;
    y = x % y;
    x = temp;
  }

  return x || 1;
};

const formatAspectRatio = (width, height) => {
  const ratio = gcd(width, height);
  return `${Math.round(width / ratio)}:${Math.round(height / ratio)}`;
};

const normalizeAngle = (value) => ((Number(value) % 360) + 360) % 360;

const createStop = (color, pos) => ({
  id: `stop-${stopIdCounter += 1}`,
  color,
  pos: clamp(Math.round(pos), 0, 100)
});

const createGlowSpot = (color = "#ffffff", x = 50, y = 50, opacity = 30, feather = 50, shape = "circle") => ({
  id: `glow-${glowSpotIdCounter += 1}`,
  color,
  x: clamp(Math.round(x), 0, 100),
  y: clamp(Math.round(y), 0, 100),
  opacity: clamp(Math.round(opacity), 0, 100),
  feather: clamp(Math.round(feather), 0, 100),
  shape
});

const createDefaultState = () => ({
  type: "linear",
  angle: 135,
  stops: [createStop("#2f8cff", 0), createStop("#7c3aed", 100)],
  shape: "circle",
  position: "center",
  customX: 50,
  customY: 50,
  effects: {
    grain: { enabled: false, intensity: 30 },
    vignette: { enabled: false, intensity: 35 },
    glow: { enabled: false, spots: [createGlowSpot("#ffffff", 50, 50, 30, 50, "circle")] }
  },
  resolutionId: "hd",
  width: 1920,
  height: 1080,
  activePreset: ""
});

const getResolutionOption = (resolutionId) =>
  resolutionOptions.find((option) => option.id === resolutionId) || resolutionOptions[0];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const hslToHex = (h, s, l) => {
  const hue = normalizeAngle(h) / 360;
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;

  const hueToRgb = (p, q, t) => {
    let adjusted = t;
    if (adjusted < 0) adjusted += 1;
    if (adjusted > 1) adjusted -= 1;
    if (adjusted < 1 / 6) return p + (q - p) * 6 * adjusted;
    if (adjusted < 1 / 2) return q;
    if (adjusted < 2 / 3) return p + (q - p) * (2 / 3 - adjusted) * 6;
    return p;
  };

  let r;
  let g;
  let b;

  if (saturation === 0) {
    r = g = b = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    r = hueToRgb(p, q, hue + 1 / 3);
    g = hueToRgb(p, q, hue);
    b = hueToRgb(p, q, hue - 1 / 3);
  }

  const toHex = (channel) => Math.round(channel * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const randomPleasingColor = (baseHue = randomInt(0, 359), hueShift = randomInt(-36, 36)) =>
  hslToHex(baseHue + hueShift, randomInt(60, 90), randomInt(40, 65));

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const chunk = normalized.length === 3 ? normalized.split("").map((part) => `${part}${part}`).join("") : normalized;
  const value = Number.parseInt(chunk, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

const toRgba = (hex, alpha) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
};

const getRadialPosition = (config) => {
  if (config.position === "custom") {
    return {
      x: clamp(Number(config.customX) || 50, 0, 100) / 100,
      y: clamp(Number(config.customY) || 50, 0, 100) / 100,
      css: `${clamp(Number(config.customX) || 50, 0, 100)}% ${clamp(Number(config.customY) || 50, 0, 100)}%`
    };
  }

  const map = {
    center: { x: 0.5, y: 0.5, css: "center" },
    "top-left": { x: 0, y: 0, css: "top left" },
    "top-right": { x: 1, y: 0, css: "top right" },
    "bottom-left": { x: 0, y: 1, css: "bottom left" },
    "bottom-right": { x: 1, y: 1, css: "bottom right" }
  };

  return map[config.position] || map.center;
};

const ensureStopCoverage = (stops) => {
  if (!stops.length) {
    return [
      { color: "#2f8cff", pos: 0 },
      { color: "#7c3aed", pos: 100 }
    ];
  }

  const normalized = stops.map((stop) => ({ color: stop.color, pos: clamp(stop.pos, 0, 100) }));
  if (normalized[0].pos > 0) {
    normalized.unshift({ color: normalized[0].color, pos: 0 });
  }
  if (normalized[normalized.length - 1].pos < 100) {
    normalized.push({ color: normalized[normalized.length - 1].color, pos: 100 });
  }
  return normalized;
};

const addGradientStops = (gradient, stops) => {
  ensureStopCoverage(stops).forEach((stop) => {
    gradient.addColorStop(stop.pos / 100, stop.color);
  });
};

const drawLinearGradient = (ctx, width, height, config) => {
  const angle = normalizeAngle(config.angle);
  const radians = ((angle - 90) * Math.PI) / 180;
  const radius = Math.sqrt(width * width + height * height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const x1 = centerX - Math.cos(radians) * radius;
  const y1 = centerY - Math.sin(radians) * radius;
  const x2 = centerX + Math.cos(radians) * radius;
  const y2 = centerY + Math.sin(radians) * radius;
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);

  addGradientStops(gradient, config.stops);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const drawRadialGradient = (ctx, width, height, config) => {
  const radialPosition = getRadialPosition(config);
  const centerX = radialPosition.x * width;
  const centerY = radialPosition.y * height;

  if (config.shape === "ellipse") {
    const radiusX = Math.max(centerX, width - centerX) * 1.08;
    const radiusY = Math.max(centerY, height - centerY) * 1.08;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, radiusY / radiusX);

    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusX);
    addGradientStops(gradient, config.stops);

    ctx.fillStyle = gradient;
    ctx.fillRect(-width * 2, -height * 2, width * 4, height * 4);
    ctx.restore();
    return;
  }

  const radius = Math.max(
    Math.hypot(centerX, centerY),
    Math.hypot(width - centerX, centerY),
    Math.hypot(centerX, height - centerY),
    Math.hypot(width - centerX, height - centerY)
  );
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

  addGradientStops(gradient, config.stops);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const drawApproximateConic = (ctx, width, height, config) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.sqrt(width * width + height * height);
  const stops = ensureStopCoverage(config.stops);
  const segments = 180;

  const getColorAt = (position) => {
    for (let index = 0; index < stops.length - 1; index += 1) {
      const current = stops[index];
      const next = stops[index + 1];
      if (position >= current.pos && position <= next.pos) {
        const span = next.pos - current.pos || 1;
        const progress = (position - current.pos) / span;
        const start = hexToRgb(current.color);
        const end = hexToRgb(next.color);
        const mix = (from, to) => Math.round(from + (to - from) * progress);
        return `rgb(${mix(start.r, end.r)}, ${mix(start.g, end.g)}, ${mix(start.b, end.b)})`;
      }
    }

    return stops[stops.length - 1].color;
  };

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((normalizeAngle(config.angle) * Math.PI) / 180);

  for (let index = 0; index < segments; index += 1) {
    const startAngle = (index / segments) * Math.PI * 2;
    const endAngle = ((index + 1) / segments) * Math.PI * 2;
    const color = getColorAt((index / segments) * 100);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  ctx.restore();
};

const drawConicGradient = (ctx, width, height, config) => {
  if (typeof ctx.createConicGradient === "function") {
    const gradient = ctx.createConicGradient((normalizeAngle(config.angle) * Math.PI) / 180, width / 2, height / 2);
    addGradientStops(gradient, config.stops);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    return;
  }

  drawApproximateConic(ctx, width, height, config);
};

const getMeshCornerColors = (stops) => {
  const palette = stops.map((stop) => stop.color);
  if (palette.length >= 4) {
    return palette.slice(0, 4);
  }

  const expanded = [];
  for (let index = 0; index < 4; index += 1) {
    expanded.push(palette[index % palette.length] || "#2f8cff");
  }
  return expanded;
};

const drawMeshGradientNow = (ctx, width, height, config) => {
  const scale = Math.min(400 / width, 225 / height, 1);
  const meshWidth = Math.max(2, Math.round(width * scale));
  const meshHeight = Math.max(2, Math.round(height * scale));
  const offscreen = document.createElement("canvas");
  const corners = getMeshCornerColors(config.stops).map(hexToRgb);
  const [topLeft, topRight, bottomLeft, bottomRight] = corners;

  offscreen.width = meshWidth;
  offscreen.height = meshHeight;
  const offscreenCtx = offscreen.getContext("2d", { alpha: false });
  const imageData = offscreenCtx.createImageData(meshWidth, meshHeight);

  for (let y = 0; y < meshHeight; y += 1) {
    const v = y / (meshHeight - 1);
    for (let x = 0; x < meshWidth; x += 1) {
      const u = x / (meshWidth - 1);
      const topMix = {
        r: topLeft.r + (topRight.r - topLeft.r) * u,
        g: topLeft.g + (topRight.g - topLeft.g) * u,
        b: topLeft.b + (topRight.b - topLeft.b) * u
      };
      const bottomMix = {
        r: bottomLeft.r + (bottomRight.r - bottomLeft.r) * u,
        g: bottomLeft.g + (bottomRight.g - bottomLeft.g) * u,
        b: bottomLeft.b + (bottomRight.b - bottomLeft.b) * u
      };

      const index = (y * meshWidth + x) * 4;
      imageData.data[index] = Math.round(topMix.r + (bottomMix.r - topMix.r) * v);
      imageData.data[index + 1] = Math.round(topMix.g + (bottomMix.g - topMix.g) * v);
      imageData.data[index + 2] = Math.round(topMix.b + (bottomMix.b - topMix.b) * v);
      imageData.data[index + 3] = 255;
    }
  }

  offscreenCtx.putImageData(imageData, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(offscreen, 0, 0, width, height);
};

const getNoiseCanvas = (width, height, intensity) => {
  const cacheKey = `${width}x${height}-${intensity}`;
  if (noiseCache.has(cacheKey)) {
    return noiseCache.get(cacheKey);
  }

  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.width = width;
  noiseCanvas.height = height;
  const noiseCtx = noiseCanvas.getContext("2d");
  const imageData = noiseCtx.createImageData(width, height);

  for (let index = 0; index < imageData.data.length; index += 4) {
    const shade = Math.floor(Math.random() * 256);
    imageData.data[index] = shade;
    imageData.data[index + 1] = shade;
    imageData.data[index + 2] = shade;
    imageData.data[index + 3] = 255;
  }

  noiseCtx.putImageData(imageData, 0, 0);
  noiseCache.set(cacheKey, noiseCanvas);
  return noiseCanvas;
};

const getGlowRadius = (spot, width) => Math.max(6, (clamp(spot.feather, 0, 100) / 100) * (width * 0.5));

const drawCircleGlow = (ctx, spot, x, y, radius) => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, toRgba(spot.color, spot.opacity / 100));
  gradient.addColorStop(1, toRgba(spot.color, 0));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const drawEllipseGlow = (ctx, spot, x, y, radius) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1.6, 1);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  gradient.addColorStop(0, toRgba(spot.color, spot.opacity / 100));
  gradient.addColorStop(1, toRgba(spot.color, 0));
  ctx.fillStyle = gradient;
  ctx.fillRect(-ctx.canvas.width, -ctx.canvas.height, ctx.canvas.width * 2, ctx.canvas.height * 2);
  ctx.restore();
};

const drawSoftStarGlow = (ctx, spot, x, y, radius) => {
  ctx.save();
  ctx.translate(x, y);

  for (let index = 0; index < 5; index += 1) {
    ctx.save();
    ctx.rotate(((72 * index) * Math.PI) / 180);
    const beamGradient = ctx.createLinearGradient(0, 0, radius, 0);
    beamGradient.addColorStop(0, toRgba(spot.color, spot.opacity / 100));
    beamGradient.addColorStop(1, toRgba(spot.color, 0));
    ctx.strokeStyle = beamGradient;
    ctx.lineWidth = Math.max(8, radius * 0.12);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.stroke();
    ctx.restore();
  }

  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.35);
  core.addColorStop(0, toRgba(spot.color, Math.min(1, spot.opacity / 78)));
  core.addColorStop(1, toRgba(spot.color, 0));
  ctx.fillStyle = core;
  ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
  ctx.restore();
};

const drawDiamondGlow = (ctx, spot, x, y, radius) => {
  const size = radius * 1.15;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  const gradient = ctx.createLinearGradient(0, -size, 0, size);
  gradient.addColorStop(0, toRgba(spot.color, 0));
  gradient.addColorStop(0.5, toRgba(spot.color, spot.opacity / 100));
  gradient.addColorStop(1, toRgba(spot.color, 0));
  ctx.fillStyle = gradient;
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.restore();
};

const applyGlowEffect = (ctx, width, height, glowConfig) => {
  if (!glowConfig.enabled || !glowConfig.spots.length) {
    return;
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";

  glowConfig.spots.forEach((spot) => {
    const x = (spot.x / 100) * width;
    const y = (spot.y / 100) * height;
    const radius = getGlowRadius(spot, width);

    if (spot.shape === "ellipse") {
      drawEllipseGlow(ctx, spot, x, y, radius);
      return;
    }

    if (spot.shape === "soft-star") {
      drawSoftStarGlow(ctx, spot, x, y, radius);
      return;
    }

    if (spot.shape === "diamond") {
      drawDiamondGlow(ctx, spot, x, y, radius);
      return;
    }

    drawCircleGlow(ctx, spot, x, y, radius);
  });

  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
};

const applyVignetteEffect = (ctx, width, height, vignetteConfig) => {
  if (!vignetteConfig.enabled) {
    return;
  }

  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.18,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.72
  );
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(0.62, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, `rgba(0, 0, 0, ${clamp(vignetteConfig.intensity, 0, 100) / 100})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const applyGrainEffect = (ctx, width, height, grainConfig) => {
  if (!grainConfig.enabled) {
    return;
  }

  const noiseCanvas = getNoiseCanvas(width, height, grainConfig.intensity);
  ctx.save();
  ctx.globalAlpha = clamp(grainConfig.intensity, 0, 100) / 400;
  ctx.drawImage(noiseCanvas, 0, 0, width, height);
  ctx.restore();
};

const drawEffects = (ctx, width, height, config, options = {}) => {
  if (!options.skipGlowSpots) {
    applyGlowEffect(ctx, width, height, config.effects.glow);
  }
  applyVignetteEffect(ctx, width, height, config.effects.vignette);
  applyGrainEffect(ctx, width, height, config.effects.grain);
};

const renderCanvas = (canvas, config, options = {}) => {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: false });
  const width = canvas.width;
  const height = canvas.height;
  const meshFrames = renderCanvas._meshFrames || (renderCanvas._meshFrames = new WeakMap());
  const previousFrame = meshFrames.get(canvas);
  if (previousFrame) {
    cancelAnimationFrame(previousFrame);
    meshFrames.delete(canvas);
  }

  ctx.clearRect(0, 0, width, height);

  const drawBase = () => {
    if (config.type === "linear") {
      drawLinearGradient(ctx, width, height, config);
      return;
    }

    if (config.type === "radial") {
      drawRadialGradient(ctx, width, height, config);
      return;
    }

    if (config.type === "conic") {
      drawConicGradient(ctx, width, height, config);
      return;
    }

    drawMeshGradientNow(ctx, width, height, config);
  };

  if (config.type === "mesh") {
    const frameId = requestAnimationFrame(() => {
      drawBase();
      drawEffects(ctx, width, height, config, options);
    });
    meshFrames.set(canvas, frameId);
    return;
  }

  drawBase();
  drawEffects(ctx, width, height, config, options);
};

const buildGradientCss = (config) => {
  const stops = config.stops.map((stop) => `${stop.color} ${clamp(stop.pos, 0, 100)}%`).join(", ");

  if (config.type === "linear") {
    return `background: linear-gradient(${normalizeAngle(config.angle)}deg, ${stops});`;
  }

  if (config.type === "radial") {
    const radialPosition = getRadialPosition(config);
    return `background: radial-gradient(${config.shape} at ${radialPosition.css}, ${stops});`;
  }

  if (config.type === "conic") {
    return `background: conic-gradient(from ${normalizeAngle(config.angle)}deg at 50% 50%, ${stops});`;
  }

  const corners = getMeshCornerColors(config.stops);
  return `background: radial-gradient(circle at 0% 0%, ${corners[0]} 0%, transparent 55%), radial-gradient(circle at 100% 0%, ${corners[1]} 0%, transparent 55%), radial-gradient(circle at 0% 100%, ${corners[2]} 0%, transparent 55%), radial-gradient(circle at 100% 100%, ${corners[3]} 0%, transparent 55%), linear-gradient(135deg, ${corners[0]} 0%, ${corners[3]} 100%);`;
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

const applyButtonFeedback = (button, label) => {
  if (!button) {
    return;
  }

  if (!button.dataset.originalLabel) {
    button.dataset.originalLabel = button.textContent.trim();
  }

  button.textContent = label;
  button.classList.add("is-saved");

  if (button._feedbackTimer) {
    clearTimeout(button._feedbackTimer);
  }

  button._feedbackTimer = setTimeout(() => {
    button.textContent = button.dataset.originalLabel;
    button.classList.remove("is-saved");
  }, 2000);
};

const getRandomizedStops = () => {
  const count = randomInt(2, 4);
  const baseHue = randomInt(0, 359);
  const scheme = randomInt(0, 2);
  const hueOffsets =
    scheme === 0
      ? [0, 20, 42, 64]
      : scheme === 1
        ? [0, 32, 180, 212]
        : [0, 120, 180, 300];

  const stops = [];
  for (let index = 0; index < count; index += 1) {
    const basePosition = count === 1 ? 50 : (index / (count - 1)) * 100;
    const position = index === 0 || index === count - 1 ? basePosition : basePosition + randomInt(-12, 12);
    stops.push(createStop(randomPleasingColor(baseHue, hueOffsets[index]), position));
  }

  return stops.map((stop, index) => ({
    ...stop,
    pos: index === 0 ? 0 : index === stops.length - 1 ? 100 : clamp(stop.pos, 0, 100)
  }));
};

const createGradientMakerApp = () => {
  const canvas = document.getElementById("gradientCanvas");
  if (!canvas) {
    return null;
  }

  const refs = {
    canvas,
    makerPanel: document.querySelector(".maker-panel"),
    canvasMeta: document.getElementById("canvasMeta"),
    typeRow: document.getElementById("gradientTypeRow"),
    stopList: document.getElementById("colorStopsList"),
    addStopBtn: document.getElementById("addColorStopBtn"),
    glowList: document.getElementById("glowList"),
    addGlowBtn: document.getElementById("addGlowSpotBtn"),
    directionPanel: document.getElementById("directionPanel"),
    directionControls: document.getElementById("directionControls"),
    effectsStack: document.getElementById("effectsStack"),
    presetRow: document.getElementById("presetRow"),
    resolutionRow: document.getElementById("resolutionRow"),
    customResolutionFields: document.getElementById("customResolutionFields"),
    customWidthInput: document.getElementById("customWidthInput"),
    customHeightInput: document.getElementById("customHeightInput"),
    downloadBtn: document.getElementById("downloadGradientBtn"),
    copyCssBtn: document.getElementById("copyCssBtn"),
    randomizeBtn: document.getElementById("randomizeGradientBtn")
  };

  let state = createDefaultState();
  let dragCleanup = null;
  let activeGlowPopup = null;
  let draggedStopId = "";

  const syncCanvasResolution = () => {
    refs.canvas.width = state.width;
    refs.canvas.height = state.height;
  };

  const updateCanvasMeta = () => {
    if (!refs.canvasMeta) {
      return;
    }

    refs.canvasMeta.textContent = `${state.width} × ${state.height} · ${formatAspectRatio(state.width, state.height)}`;
  };

  const showMakerToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "maker-toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 250);
    }, 2000);
  };

  const scheduleGlowPreviewSync = () => {
    if (!activeGlowPopup) {
      return;
    }

    clearTimeout(glowPreviewDebounceTimer);
    glowPreviewDebounceTimer = setTimeout(() => {
      renderGlowPopupPreview();
    }, GLOW_PREVIEW_RENDER_MS);
  };

  const scheduleRender = () => {
    clearTimeout(renderDebounceTimer);
    renderDebounceTimer = setTimeout(() => {
      syncCanvasResolution();
      updateCanvasMeta();
      renderCanvas(refs.canvas, state);
      scheduleGlowPreviewSync();
    }, 16);
  };

  const renderTypeButtons = () => {
    refs.typeRow.innerHTML = gradientTypeOptions
      .map(
        (option) => `
          <button class="maker-pill${state.type === option.id ? " is-active" : ""}" type="button" data-gradient-type="${option.id}">
            ${option.label}
          </button>
        `
      )
      .join("");
  };

  const renderColorStops = () => {
    refs.stopList.innerHTML = state.stops
      .map(
        (stop, index) => `
          <div class="stop-row color-stop-row" data-stop-id="${stop.id}" draggable="true">
            <svg class="drag-handle" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="9" cy="5" r="1"></circle>
              <circle cx="9" cy="12" r="1"></circle>
              <circle cx="9" cy="19" r="1"></circle>
              <circle cx="15" cy="5" r="1"></circle>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="15" cy="19" r="1"></circle>
            </svg>
            <input class="stop-color" type="color" value="${stop.color}" aria-label="Color stop ${index + 1}" data-stop-color />
            <div class="stop-range-wrap">
              <div class="stop-range-label">
                <span>Position</span>
                <span class="stop-pos-value">${stop.pos}%</span>
              </div>
              <input class="stop-range" type="range" min="0" max="100" value="${stop.pos}" data-stop-pos />
            </div>
            <button class="stop-delete" type="button" data-stop-delete ${state.stops.length <= 2 ? "disabled" : ""} aria-label="Delete color stop">
              ×
            </button>
          </div>
        `
      )
      .join("");

    refs.addStopBtn.disabled = state.stops.length >= MAX_STOPS;
  };

  const updateGlowListRow = (spot) => {
    const row = refs.glowList?.querySelector(`[data-glow-id="${spot.id}"]`);
    if (!row) {
      return;
    }

    const dot = row.querySelector(".glow-item-dot");
    const hint = row.querySelector(".glow-item-hint");
    if (dot) {
      dot.style.background = spot.color;
    }
    if (hint) {
      hint.textContent = `${spot.x}% / ${spot.y}%`;
    }
  };

  const renderGlowList = () => {
    if (!refs.glowList) {
      return;
    }

    refs.glowList.innerHTML = state.effects.glow.spots
      .map(
        (spot, index) => `
          <li class="glow-item" data-glow-id="${spot.id}">
            <span class="glow-item-dot" style="background: ${spot.color};"></span>
            <span class="glow-item-label">Spot ${index + 1}</span>
            <span class="glow-item-spacer"></span>
            <span class="glow-item-hint">${spot.x}% / ${spot.y}%</span>
            <button class="glow-item-btn" type="button" data-glow-edit aria-label="Edit glow spot">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="glow-delete-btn" type="button" data-glow-delete aria-label="Delete glow spot">×</button>
          </li>
        `
      )
      .join("");
  };

  const cleanupStopDragIndicators = () => {
    refs.stopList.querySelectorAll(".color-stop-row").forEach((row) => {
      row.classList.remove("is-drag-over", "is-dragging");
    });
  };

  const getGlowSpotById = (spotId) => state.effects.glow.spots.find((spot) => spot.id === spotId);

  const closeGlowPopup = () => {
    if (!activeGlowPopup) {
      return;
    }

    const { element, cleanup } = activeGlowPopup;
    cleanup?.();
    activeGlowPopup = null;
    element.classList.remove("is-visible");
    setTimeout(() => element.remove(), 220);
  };

  const updateGlowPopupMeta = () => {
    if (!activeGlowPopup) {
      return;
    }

    const spot = getGlowSpotById(activeGlowPopup.spotId);
    if (!spot) {
      closeGlowPopup();
      return;
    }

    activeGlowPopup.xValue.textContent = `X: ${spot.x}%`;
    activeGlowPopup.yValue.textContent = `Y: ${spot.y}%`;
    activeGlowPopup.opacityValue.textContent = `${spot.opacity}%`;
    activeGlowPopup.featherValue.textContent = `${spot.feather}%`;
    activeGlowPopup.colorInput.value = spot.color;
    activeGlowPopup.opacityInput.value = String(spot.opacity);
    activeGlowPopup.featherInput.value = String(spot.feather);
    activeGlowPopup.shapeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.shape === spot.shape);
    });
  };

  const renderGlowPopupHandles = () => {
    if (!activeGlowPopup) {
      return;
    }

    const currentSpot = getGlowSpotById(activeGlowPopup.spotId);
    if (!currentSpot) {
      closeGlowPopup();
      return;
    }

    activeGlowPopup.handlesLayer.innerHTML = state.effects.glow.spots
      .map(
        (spot) => `
          <div
            class="mini-monitor-handle${spot.id === currentSpot.id ? " is-active" : ""}"
            data-handle-spot-id="${spot.id}"
            style="left: ${spot.x}%; top: ${spot.y}%; background: ${spot.color};"
          ></div>
        `
      )
      .join("");
  };

  const renderGlowPopupPreview = () => {
    if (!activeGlowPopup) {
      return;
    }

    renderCanvas(activeGlowPopup.previewCanvas, state, { skipGlowSpots: false });
    renderGlowPopupHandles();
    updateGlowPopupMeta();
  };

  const updateGlowSpotPosition = (spotId, clientX, clientY) => {
    const spot = getGlowSpotById(spotId);
    if (!spot || !activeGlowPopup) {
      return;
    }

    const rect = activeGlowPopup.monitor.getBoundingClientRect();
    spot.x = clamp(Math.round(((clientX - rect.left) / rect.width) * 100), 0, 100);
    spot.y = clamp(Math.round(((clientY - rect.top) / rect.height) * 100), 0, 100);
    state.effects.glow.enabled = true;
    updateGlowListRow(spot);
    renderGlowPopupHandles();
    updateGlowPopupMeta();
    scheduleRender();
  };

  const openGlowPopup = (spotId, button) => {
    const spot = getGlowSpotById(spotId);
    if (!spot || !refs.makerPanel) {
      return;
    }

    closeGlowPopup();

    const popup = document.createElement("div");
    popup.className = "glow-popup";
    popup.innerHTML = `
      <div class="glow-popup-inner">
        <div>
          <span class="popup-label">Color</span>
          <input class="popup-color-input" type="color" value="${spot.color}" />
        </div>
        <div>
          <span class="popup-label">Shape</span>
          <div class="popup-shape-row">
            <button class="popup-shape-btn${spot.shape === "circle" ? " is-active" : ""}" type="button" data-shape="circle">Circle</button>
            <button class="popup-shape-btn${spot.shape === "ellipse" ? " is-active" : ""}" type="button" data-shape="ellipse">Ellipse</button>
            <button class="popup-shape-btn${spot.shape === "soft-star" ? " is-active" : ""}" type="button" data-shape="soft-star">Soft Star</button>
            <button class="popup-shape-btn${spot.shape === "diamond" ? " is-active" : ""}" type="button" data-shape="diamond">Diamond</button>
          </div>
        </div>
        <div>
          <span class="popup-label">Position</span>
          <div class="mini-monitor">
            <canvas class="mini-monitor-canvas" width="260" height="146" aria-hidden="true"></canvas>
            <div class="mini-monitor-handles"></div>
          </div>
          <div class="mini-monitor-meta">
            <span class="mini-monitor-x"></span>
            <span class="mini-monitor-y"></span>
          </div>
        </div>
        <div class="popup-range-row">
          <span class="popup-label">Opacity</span>
          <div class="popup-range-head">
            <span>Opacity</span>
            <span class="popup-opacity-value">${spot.opacity}%</span>
          </div>
          <input class="effect-range" type="range" min="0" max="100" step="1" value="${spot.opacity}" />
        </div>
        <div class="popup-range-row">
          <span class="popup-label">Feather Radius</span>
          <div class="popup-range-head">
            <span>Feather Radius</span>
            <span class="popup-feather-value">${spot.feather}%</span>
          </div>
          <input class="effect-range" type="range" min="0" max="100" step="1" value="${spot.feather}" />
          <p class="popup-hint">Controls blur spread on canvas.</p>
        </div>
        <button class="btn" type="button">Done</button>
      </div>
    `;

    refs.makerPanel.appendChild(popup);

    const colorInput = popup.querySelector(".popup-color-input");
    const shapeButtons = Array.from(popup.querySelectorAll(".popup-shape-btn"));
    const monitor = popup.querySelector(".mini-monitor");
    const previewCanvas = popup.querySelector(".mini-monitor-canvas");
    const handlesLayer = popup.querySelector(".mini-monitor-handles");
    const xValue = popup.querySelector(".mini-monitor-x");
    const yValue = popup.querySelector(".mini-monitor-y");
    const opacityInput = popup.querySelectorAll(".effect-range")[0];
    const featherInput = popup.querySelectorAll(".effect-range")[1];
    const opacityValue = popup.querySelector(".popup-opacity-value");
    const featherValue = popup.querySelector(".popup-feather-value");
    const doneButton = popup.querySelector(".btn");

    const panelRect = refs.makerPanel.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const popupWidth = 300;
    const left = clamp(
      buttonRect.right - panelRect.left - popupWidth + buttonRect.width,
      12,
      Math.max(12, refs.makerPanel.clientWidth - popupWidth - 12)
    );
    const top = buttonRect.bottom - panelRect.top + 10;
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;

    const handleOutsideClick = (event) => {
      if (popup.contains(event.target) || event.target.closest("[data-glow-edit]")) {
        return;
      }
      closeGlowPopup();
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeGlowPopup();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    activeGlowPopup = {
      spotId,
      element: popup,
      previewCanvas,
      monitor,
      handlesLayer,
      colorInput,
      shapeButtons,
      xValue,
      yValue,
      opacityInput,
      featherInput,
      opacityValue,
      featherValue,
      cleanup: () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscape);
      }
    };

    const syncCurrentSpot = (mutator) => {
      const currentSpot = getGlowSpotById(spotId);
      if (!currentSpot) {
        closeGlowPopup();
        return;
      }

      mutator(currentSpot);
      state.effects.glow.enabled = true;
      updateGlowListRow(currentSpot);
      renderGlowPopupHandles();
      updateGlowPopupMeta();
      scheduleRender();
    };

    colorInput.addEventListener("input", () => {
      syncCurrentSpot((currentSpot) => {
        currentSpot.color = colorInput.value;
      });
    });

    shapeButtons.forEach((shapeButton) => {
      shapeButton.addEventListener("click", () => {
        syncCurrentSpot((currentSpot) => {
          currentSpot.shape = shapeButton.dataset.shape;
        });
      });
    });

    const startDragHandle = (event) => {
      const handle = event.target.closest(".mini-monitor-handle.is-active");
      if (!handle) {
        return;
      }

      event.preventDefault();
      updateGlowSpotPosition(spotId, event.clientX, event.clientY);

      const onMove = (moveEvent) => updateGlowSpotPosition(spotId, moveEvent.clientX, moveEvent.clientY);
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };

    monitor.addEventListener("click", (event) => {
      if (event.target.closest(".mini-monitor-handle")) {
        return;
      }
      updateGlowSpotPosition(spotId, event.clientX, event.clientY);
    });

    handlesLayer.addEventListener("pointerdown", startDragHandle);

    opacityInput.addEventListener("input", () => {
      syncCurrentSpot((currentSpot) => {
        currentSpot.opacity = clamp(Number(opacityInput.value) || 0, 0, 100);
      });
    });

    featherInput.addEventListener("input", () => {
      syncCurrentSpot((currentSpot) => {
        currentSpot.feather = clamp(Number(featherInput.value) || 0, 0, 100);
      });
    });

    doneButton.addEventListener("click", closeGlowPopup);

    requestAnimationFrame(() => {
      popup.classList.add("is-visible");
      renderGlowPopupPreview();
    });
  };

  const updateAngleUi = () => {
    const svg = refs.directionControls.querySelector(".angle-picker-svg");
    if (!svg) {
      return;
    }

    const line = svg.querySelector(".angle-picker-line");
    const handle = svg.querySelector(".angle-picker-handle");
    const input = refs.directionControls.querySelector("#angleInput");
    const angle = normalizeAngle(state.angle);
    const center = 52;
    const radius = 34;
    const radians = ((angle - 90) * Math.PI) / 180;
    const x = center + Math.cos(radians) * radius;
    const y = center + Math.sin(radians) * radius;

    line.setAttribute("x1", String(center));
    line.setAttribute("y1", String(center));
    line.setAttribute("x2", x.toFixed(2));
    line.setAttribute("y2", y.toFixed(2));
    handle.setAttribute("cx", x.toFixed(2));
    handle.setAttribute("cy", y.toFixed(2));

    if (input) {
      input.value = String(angle);
    }
  };

  const attachAnglePicker = () => {
    const svg = refs.directionControls.querySelector(".angle-picker-svg");
    const input = refs.directionControls.querySelector("#angleInput");
    if (!svg || !input) {
      return;
    }

    const updateFromPointer = (event) => {
      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      state.angle = normalizeAngle((Math.atan2(y, x) * 180) / Math.PI + 90);
      state.activePreset = "";
      updateAngleUi();
      scheduleRender();
    };

    svg.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      updateFromPointer(event);

      const handleMove = (moveEvent) => updateFromPointer(moveEvent);
      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
      dragCleanup = handleUp;
    });

    input.addEventListener("input", () => {
      state.angle = normalizeAngle(input.value || 0);
      state.activePreset = "";
      updateAngleUi();
      scheduleRender();
    });
  };

  const renderDirectionControls = () => {
    if (state.type === "linear" || state.type === "conic") {
      refs.directionPanel.hidden = false;
      refs.directionControls.innerHTML = `
        <div class="angle-controls">
          <div class="angle-picker">
            <svg class="angle-picker-svg" viewBox="0 0 104 104" aria-label="Angle picker">
              <circle cx="52" cy="52" r="42"></circle>
              <line class="angle-picker-line" x1="52" y1="52" x2="52" y2="18"></line>
              <circle cx="52" cy="52" r="4" fill="rgba(255, 255, 255, 0.2)" stroke="none"></circle>
              <circle class="angle-picker-handle" cx="52" cy="18" r="6"></circle>
            </svg>
          </div>
          <label class="maker-field">
            <span>Angle</span>
            <input class="maker-number-input" id="angleInput" type="number" min="0" max="360" value="${normalizeAngle(state.angle)}" />
          </label>
        </div>
      `;

      updateAngleUi();
      attachAnglePicker();
      return;
    }

    if (state.type === "radial") {
      refs.directionPanel.hidden = false;
      refs.directionControls.innerHTML = `
        <div class="maker-field-grid">
          <label class="maker-select-wrap">
            <span>Shape</span>
            <select class="maker-select" id="radialShapeSelect">
              ${radialShapes
                .map(
                  (shape) => `<option value="${shape.id}" ${state.shape === shape.id ? "selected" : ""}>${shape.label}</option>`
                )
                .join("")}
            </select>
          </label>
          <label class="maker-select-wrap">
            <span>Position</span>
            <select class="maker-select" id="radialPositionSelect">
              ${radialPositions
                .map(
                  (position) =>
                    `<option value="${position.id}" ${state.position === position.id ? "selected" : ""}>${position.label}</option>`
                )
                .join("")}
            </select>
          </label>
        </div>
        <div class="maker-field-grid" id="radialCustomFields" ${state.position === "custom" ? "" : "hidden"}>
          <label class="maker-field">
            <span>X %</span>
            <input id="radialCustomX" type="number" min="0" max="100" value="${clamp(state.customX, 0, 100)}" />
          </label>
          <label class="maker-field">
            <span>Y %</span>
            <input id="radialCustomY" type="number" min="0" max="100" value="${clamp(state.customY, 0, 100)}" />
          </label>
        </div>
      `;

      const shapeSelect = refs.directionControls.querySelector("#radialShapeSelect");
      const positionSelect = refs.directionControls.querySelector("#radialPositionSelect");
      const customFields = refs.directionControls.querySelector("#radialCustomFields");
      const customX = refs.directionControls.querySelector("#radialCustomX");
      const customY = refs.directionControls.querySelector("#radialCustomY");

      shapeSelect?.addEventListener("change", () => {
        state.shape = shapeSelect.value;
        state.activePreset = "";
        scheduleRender();
      });

      positionSelect?.addEventListener("change", () => {
        state.position = positionSelect.value;
        state.activePreset = "";
        if (customFields) {
          customFields.hidden = state.position !== "custom";
        }
        scheduleRender();
      });

      customX?.addEventListener("input", () => {
        state.customX = clamp(Number(customX.value) || 0, 0, 100);
        state.activePreset = "";
        scheduleRender();
      });

      customY?.addEventListener("input", () => {
        state.customY = clamp(Number(customY.value) || 0, 0, 100);
        state.activePreset = "";
        scheduleRender();
      });

      return;
    }

    refs.directionPanel.hidden = true;
    refs.directionControls.innerHTML = "";
  };

  const renderEffects = () => {
    const { grain, vignette } = state.effects;
    const createEffectCard = (key, title, note, enabled, controlsHtml) => `
      <div class="effect-card" data-effect-card="${key}">
        <div class="effect-head">
          <div class="effect-copy">
            <strong class="effect-title">${title}</strong>
            <span class="effect-note">${note}</span>
          </div>
          <button
            class="toggle-switch${enabled ? " is-on" : ""}"
            type="button"
            role="switch"
            aria-checked="${enabled ? "true" : "false"}"
            data-effect-toggle="${key}"
          ></button>
        </div>
        <div class="effect-controls" ${enabled ? "" : "hidden"}>
          ${controlsHtml}
        </div>
      </div>
    `;

    refs.effectsStack.innerHTML = [
      createEffectCard(
        "grain",
        "Grain / Noise",
        "Adds a light texture layer over the gradient.",
        grain.enabled,
        `
          <div class="effect-range-wrap">
            <div class="effect-range-label">
              <span>Intensity</span>
              <span>${grain.intensity}%</span>
            </div>
            <input class="effect-range" type="range" min="0" max="100" value="${grain.intensity}" data-effect-range="grain" />
          </div>
        `
      ),
      createEffectCard(
        "vignette",
        "Vignette",
        "Darkens the edges for extra depth.",
        vignette.enabled,
        `
          <div class="effect-range-wrap">
            <div class="effect-range-label">
              <span>Intensity</span>
              <span>${vignette.intensity}%</span>
            </div>
            <input class="effect-range" type="range" min="0" max="100" value="${vignette.intensity}" data-effect-range="vignette" />
          </div>
        `
      )
    ].join("");
  };

  const renderPresets = () => {
    refs.presetRow.innerHTML = gradientPresets
      .map(
        (preset, index) => `
          <button class="preset-card${state.activePreset === preset.name ? " is-active" : ""}" type="button" data-preset-index="${index}">
            <canvas width="120" height="80" aria-hidden="true"></canvas>
            <span class="preset-name">${preset.name}</span>
          </button>
        `
      )
      .join("");

    refs.presetRow.querySelectorAll(".preset-card").forEach((card, index) => {
      const previewCanvas = card.querySelector("canvas");
      const preset = gradientPresets[index];
      const previewConfig = {
        ...createDefaultState(),
        ...deepClone(preset),
        stops: preset.stops.map((stop) => ({ ...stop })),
        effects: {
          grain: { enabled: false, intensity: 0 },
          vignette: { enabled: false, intensity: 0 },
          glow: { enabled: false, spots: [createGlowSpot()] }
        }
      };

      renderCanvas(previewCanvas, previewConfig);
    });
  };

  const renderResolutionButtons = () => {
    refs.resolutionRow.innerHTML = resolutionOptions
      .map(
        (option) => `
          <button class="maker-pill${state.resolutionId === option.id ? " is-active" : ""}" type="button" data-resolution="${option.id}">
            ${option.label}
          </button>
        `
      )
      .join("");

    refs.customResolutionFields.hidden = state.resolutionId !== "custom";
    refs.customWidthInput.value = String(state.width);
    refs.customHeightInput.value = String(state.height);
  };

  const renderAllControls = () => {
    renderTypeButtons();
    renderColorStops();
    renderGlowList();
    renderDirectionControls();
    renderEffects();
    renderPresets();
    renderResolutionButtons();
    updateCanvasMeta();
    scheduleGlowPreviewSync();
  };

  const applyPreset = (preset) => {
    const currentResolutionId = state.resolutionId;
    const currentWidth = state.width;
    const currentHeight = state.height;
    const nextState = createDefaultState();

    nextState.type = preset.type;
    nextState.angle = preset.angle ?? nextState.angle;
    nextState.stops = preset.stops.map((stop) => createStop(stop.color, stop.pos));
    nextState.shape = preset.shape || nextState.shape;
    nextState.position = preset.position || nextState.position;
    nextState.customX = preset.customX ?? nextState.customX;
    nextState.customY = preset.customY ?? nextState.customY;
    nextState.effects.grain.enabled = false;
    nextState.effects.vignette.enabled = false;
    nextState.effects.glow.enabled = false;
    nextState.effects.glow.spots = [createGlowSpot("#ffffff", 50, 50, 30, 50, "circle")];
    nextState.resolutionId = currentResolutionId;
    nextState.width = currentWidth;
    nextState.height = currentHeight;
    nextState.activePreset = preset.name;

    state = nextState;
    renderAllControls();
    scheduleRender();
  };

  const randomizeGradient = () => {
    const type = gradientTypeOptions[randomInt(0, gradientTypeOptions.length - 1)].id;
    state.type = type;
    state.angle = randomInt(0, 359);
    state.stops = getRandomizedStops();
    state.shape = Math.random() > 0.5 ? "circle" : "ellipse";
    state.position = radialPositions[randomInt(0, radialPositions.length - 2)].id;
    state.customX = randomInt(18, 82);
    state.customY = randomInt(18, 82);
    state.effects.grain.enabled = false;
    state.effects.vignette.enabled = false;
    state.effects.glow.enabled = false;
    state.effects.glow.spots = [createGlowSpot("#ffffff", 50, 50, 30, 50, "circle")];
    state.activePreset = "";
    noiseCache = new Map();

    renderAllControls();
    scheduleRender();
  };

  const setResolution = (resolutionId) => {
    state.resolutionId = resolutionId;
    if (resolutionId !== "custom") {
      const option = getResolutionOption(resolutionId);
      state.width = option.width;
      state.height = option.height;
    } else {
      state.width = clamp(Number(refs.customWidthInput.value) || state.width, 320, MAX_CUSTOM_WIDTH);
      state.height = clamp(Number(refs.customHeightInput.value) || state.height, 320, MAX_CUSTOM_HEIGHT);
    }

    renderResolutionButtons();
    scheduleRender();
  };

  refs.typeRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gradient-type]");
    if (!button) {
      return;
    }

    state.type = button.dataset.gradientType;
    state.activePreset = "";
    renderTypeButtons();
    renderDirectionControls();
    scheduleRender();
  });

  refs.stopList.addEventListener("input", (event) => {
    const row = event.target.closest(".color-stop-row");
    if (!row) {
      return;
    }

    const stop = state.stops.find((item) => item.id === row.dataset.stopId);
    if (!stop) {
      return;
    }

    if (event.target.matches("[data-stop-color]")) {
      stop.color = event.target.value;
    }

    if (event.target.matches("[data-stop-pos]")) {
      stop.pos = clamp(Number(event.target.value) || 0, 0, 100);
      const label = row.querySelector(".stop-pos-value");
      if (label) {
        label.textContent = `${stop.pos}%`;
      }
    }

    state.activePreset = "";
    scheduleRender();
  });

  refs.stopList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stop-delete]");
    if (!button || state.stops.length <= 2) {
      return;
    }

    const row = button.closest(".color-stop-row");
    state.stops = state.stops.filter((item) => item.id !== row.dataset.stopId);
    state.activePreset = "";
    renderColorStops();
    scheduleRender();
  });

  refs.stopList.addEventListener("dragstart", (event) => {
    const row = event.target.closest(".color-stop-row");
    if (!row) {
      return;
    }

    draggedStopId = row.dataset.stopId || "";
    row.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedStopId);
  });

  refs.stopList.addEventListener("dragover", (event) => {
    const row = event.target.closest(".color-stop-row");
    if (!row || row.dataset.stopId === draggedStopId) {
      return;
    }

    event.preventDefault();
    cleanupStopDragIndicators();
    row.classList.add("is-drag-over");
  });

  refs.stopList.addEventListener("drop", (event) => {
    const row = event.target.closest(".color-stop-row");
    if (!row || row.dataset.stopId === draggedStopId) {
      cleanupStopDragIndicators();
      return;
    }

    event.preventDefault();
    const fromIndex = state.stops.findIndex((stop) => stop.id === draggedStopId);
    const toIndex = state.stops.findIndex((stop) => stop.id === row.dataset.stopId);
    if (fromIndex < 0 || toIndex < 0) {
      cleanupStopDragIndicators();
      return;
    }

    const [movedStop] = state.stops.splice(fromIndex, 1);
    state.stops.splice(toIndex, 0, movedStop);
    renderColorStops();
    cleanupStopDragIndicators();
    scheduleRender();
  });

  refs.stopList.addEventListener("dragend", () => {
    draggedStopId = "";
    cleanupStopDragIndicators();
  });

  refs.addStopBtn.addEventListener("click", () => {
    if (state.stops.length >= MAX_STOPS) {
      return;
    }

    const baseHue = randomInt(0, 359);
    state.stops.push(createStop(randomPleasingColor(baseHue), 50));
    state.activePreset = "";
    renderColorStops();
    scheduleRender();
  });

  refs.glowList.addEventListener("click", (event) => {
    const glowRow = event.target.closest("[data-glow-id]");
    if (!glowRow) {
      return;
    }

    const spotId = glowRow.dataset.glowId;
    const deleteButton = event.target.closest("[data-glow-delete]");
    if (deleteButton) {
      state.effects.glow.spots = state.effects.glow.spots.filter((spot) => spot.id !== spotId);
      if (!state.effects.glow.spots.length) {
        state.effects.glow.enabled = false;
      }
      if (activeGlowPopup?.spotId === spotId) {
        closeGlowPopup();
      }
      renderGlowList();
      scheduleRender();
      return;
    }

    const editButton = event.target.closest("[data-glow-edit]");
    if (editButton) {
      openGlowPopup(spotId, editButton);
    }
  });

  refs.addGlowBtn.addEventListener("click", () => {
    if (state.effects.glow.spots.length >= MAX_GLOW_SPOTS) {
      showMakerToast("Maximum of 10 glow spots reached.");
      return;
    }

    const spot = createGlowSpot(randomPleasingColor(), 50, 50, 30, 50, "circle");
    state.effects.glow.spots.push(spot);
    state.effects.glow.enabled = true;
    renderGlowList();
    scheduleRender();

    const editButton = refs.glowList.querySelector(`[data-glow-id="${spot.id}"] [data-glow-edit]`);
    if (editButton) {
      openGlowPopup(spot.id, editButton);
    }
  });

  refs.effectsStack.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-effect-toggle]");
    if (toggle) {
      const effectKey = toggle.dataset.effectToggle;
      const targetEffect = state.effects[effectKey];
      if (!targetEffect) {
        return;
      }

      targetEffect.enabled = !targetEffect.enabled;
      state.activePreset = "";
      renderEffects();
      scheduleRender();
    }
  });

  refs.effectsStack.addEventListener("input", (event) => {
    const effectRange = event.target.closest("[data-effect-range]");
    if (effectRange) {
      const key = effectRange.dataset.effectRange;
      state.effects[key].intensity = clamp(Number(effectRange.value) || 0, 0, 100);
      state.activePreset = "";
      const valueLabel = effectRange.closest(".effect-range-wrap")?.querySelector(".effect-range-label span:last-child");
      if (valueLabel) {
        valueLabel.textContent = `${state.effects[key].intensity}%`;
      }

      if (key === "grain") {
        noiseCache = new Map();
      }

      scheduleRender();
    }
  });

  refs.presetRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset-index]");
    if (!button) {
      return;
    }

    const preset = gradientPresets[Number(button.dataset.presetIndex)];
    if (preset) {
      applyPreset(preset);
    }
  });

  refs.randomizeBtn.addEventListener("click", randomizeGradient);

  refs.resolutionRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-resolution]");
    if (!button) {
      return;
    }

    setResolution(button.dataset.resolution);
  });

  const syncCustomResolution = () => {
    state.width = clamp(Number(refs.customWidthInput.value) || 1920, 320, MAX_CUSTOM_WIDTH);
    state.height = clamp(Number(refs.customHeightInput.value) || 1080, 320, MAX_CUSTOM_HEIGHT);
    refs.customWidthInput.value = String(state.width);
    refs.customHeightInput.value = String(state.height);
    scheduleRender();
  };

  refs.customWidthInput.addEventListener("input", () => {
    state.resolutionId = "custom";
    renderResolutionButtons();
    syncCustomResolution();
  });

  refs.customHeightInput.addEventListener("input", () => {
    state.resolutionId = "custom";
    renderResolutionButtons();
    syncCustomResolution();
  });

  refs.downloadBtn.addEventListener("click", () => {
    syncCanvasResolution();
    renderCanvas(refs.canvas, state);

    const finishDownload = (blob) => {
      if (!blob) {
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gradient-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      applyButtonFeedback(refs.downloadBtn, "Saved ✓");
    };

    if (state.type === "mesh") {
      requestAnimationFrame(() => {
        refs.canvas.toBlob(finishDownload, "image/png");
      });
      return;
    }

    refs.canvas.toBlob(finishDownload, "image/png");
  });

  refs.copyCssBtn.addEventListener("click", async () => {
    await copyText(buildGradientCss(state));
    applyButtonFeedback(refs.copyCssBtn, "Copied ✓");
  });

  renderAllControls();
  scheduleRender();

  return {
    destroy() {
      if (dragCleanup) {
        dragCleanup();
      }
    }
  };
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "gradient-maker") {
    return;
  }

  createGradientMakerApp();
});
