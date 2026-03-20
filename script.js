const allWallpaperFiles = [
  "6073083.jpg",
  "Autumn Veil.png",
  "Azure Nebula.png",
  "Black Monolith.png",
  "blue dubble wave.png",
  "blue folds.png",
  "Blue Giant.png",
  "blue pipes.png",
  "Blue Reflection.png",
  "blue wave.png",
  "bold fest.png",
  "bubble bond.jpg",
  "Clean Geometry.png",
  "Cosmic Snow.png",
  "Crimson Nebula.png",
  "Crimson Smoke.png",
  "Dark Forest.png",
  "Dark Interface.png",
  "dark windows.jpg",
  "Deep Void.png",
  "Dust Storm.png",
  "Dwarf Light.png",
  "Ethereal Fog.png",
  "Event Horizon.png",
  "Frozen Cliffs.png",
  "Galactic Blue.png",
  "inspire.jpg",
  "Luminous Woods (dim).png",
  "Luminous Woods.png",
  "moon snipe.jpg",
  "neon lines.jpg",
  "night city.jpg",
  "Night Peaks.png",
  "night-sky-surreal-3840x2160-12658.png",
  "pink and purple gradient.jpg",
  "Poppy Field.png",
  "purple neon fluid.png",
  "red and blue gradient.jpg",
  "Red Horizon.png",
  "Red Orbit.png",
  "Red Shards.png",
  "Scarlet Surges.png",
  "sea waves.jpg",
  "Shadow Vortex.png",
  "Silent Stars.png",
  "Snowbound.png",
  "Volcanic Shore.png",
  "White Dunes.png",
  "White Nebula.png",
  "White Silk.png",
  "Winter Silence.png"
];

const featuredWallpaperFiles = [
  "Azure Nebula.png",
  "Dark Interface.png",
  "Event Horizon.png",
  "Luminous Woods.png",
  "Frozen Cliffs.png",
  "Red Horizon.png",
  "Night Peaks.png",
  "Silent Stars.png",
  "Volcanic Shore.png"
];

const collections = [
  {
    id: "dark-minimal",
    label: "Dark & Minimal",
    description: "Clean setups with deep contrast and no noise.",
    cover: "Dark Interface.png",
    files: ["Black Monolith.png", "Dark Interface.png", "Deep Void.png", "Shadow Vortex.png", "Dark Forest.png", "Silent Stars.png"]
  },
  {
    id: "nature-escapes",
    label: "Nature Escapes",
    description: "Organic textures and landscapes for a calming desktop.",
    cover: "Luminous Woods.png",
    files: [
      "Luminous Woods.png",
      "Luminous Woods (dim).png",
      "Poppy Field.png",
      "Frozen Cliffs.png",
      "Volcanic Shore.png",
      "Snowbound.png",
      "Winter Silence.png",
      "Dark Forest.png",
      "Autumn Veil.png"
    ]
  },
  {
    id: "neon-cyber",
    label: "Neon & Cyber",
    description: "Electric tones and glowing geometries for bold setups.",
    cover: "purple neon fluid.png",
    files: ["purple neon fluid.png", "neon lines.jpg", "Blue Giant.png", "blue pipes.png", "Galactic Blue.png", "bold fest.png"]
  },
  {
    id: "space-deep",
    label: "Deep Space",
    description: "Nebulae, voids, and cosmic light for the explorer.",
    cover: "Azure Nebula.png",
    files: ["Azure Nebula.png", "Cosmic Snow.png", "Crimson Nebula.png", "Deep Void.png", "Dwarf Light.png", "Event Horizon.png", "Galactic Blue.png", "Silent Stars.png", "White Nebula.png"]
  },
  {
    id: "warm-tones",
    label: "Warm Tones",
    description: "Red, amber, and earthy palettes for a grounded feel.",
    cover: "Red Horizon.png",
    files: ["Red Horizon.png", "Red Orbit.png", "Red Shards.png", "Scarlet Surges.png", "Crimson Smoke.png", "Dust Storm.png", "Poppy Field.png"]
  },
  {
    id: "clean-light",
    label: "Clean & Light",
    description: "Minimal whites and soft textures for distraction-free work.",
    cover: "White Silk.png",
    files: ["White Silk.png", "White Dunes.png", "White Nebula.png", "Snowbound.png", "Ethereal Fog.png"]
  }
];

const setupMap = {
  dark: ["Black Monolith.png", "Dark Interface.png", "Deep Void.png", "Shadow Vortex.png", "Event Horizon.png", "Silent Stars.png", "Night Peaks.png"],
  colorful: ["purple neon fluid.png", "neon lines.jpg", "Blue Giant.png", "Galactic Blue.png", "bold fest.png", "Azure Nebula.png", "Crimson Nebula.png"],
  calm: ["Luminous Woods.png", "Poppy Field.png", "Frozen Cliffs.png", "Snowbound.png", "Winter Silence.png", "Ethereal Fog.png", "White Dunes.png"],
  minimal: ["White Silk.png", "White Nebula.png", "Clean Geometry.png", "Dust Storm.png", "White Dunes.png", "Snowbound.png"]
};

const setupVibes = [
  {
    id: "dark",
    label: "Dark & Focused",
    description: "Low-noise scenes and deep contrast for locked-in sessions.",
    cover: "Dark Interface.png"
  },
  {
    id: "colorful",
    label: "Colorful & Bold",
    description: "Electric tones and high-energy forms that keep the setup alive.",
    cover: "purple neon fluid.png"
  },
  {
    id: "calm",
    label: "Calm & Natural",
    description: "Landscapes and organic textures that keep the desktop quiet.",
    cover: "Luminous Woods.png"
  },
  {
    id: "minimal",
    label: "Minimal & Clean",
    description: "Soft light, simple geometry, and distraction-free surfaces.",
    cover: "White Silk.png"
  }
];

const setupMonitorOptions = [
  { id: "standard", label: "16:9 Standard" },
  { id: "ultrawide", label: "21:9 Ultrawide" },
  { id: "dual", label: "Dual Monitor" },
  { id: "portrait", label: "Portrait / Mobile" }
];

const categoryRules = [
  { match: /nebula|stars|void|horizon|galactic|orbit|cosmic|dwarf|event|sky/i, label: "Space" },
  { match: /forest|woods|shore|snow|cliffs|dunes|waves|autumn|winter|poppy|sea/i, label: "Nature" },
  { match: /city|windows|interface|geometry/i, label: "Urban" },
  { match: /red|scarlet|crimson/i, label: "Cinematic" },
  { match: /blue|neon|vortex|smoke|silk|shards|reflection|giant|folds|pipes|bond|veil/i, label: "Abstract" }
];

const FAVORITES_KEY = "all-wallpapers-favorites";
const RECENT_SEARCHES_KEY = "all-wallpapers-recent-searches";
const FILTER_TRANSITION_MS = 220;
const HERO_ROTATE_MS = 4000;
const MAX_RECENT_SEARCHES = 5;
const SORT_MENU_ANIM_MS = 280;

let favorites = new Set();
let activeFilter = "All";
let activeSearchQuery = "";
let activeSort = "default";
let lightboxRefs = null;
let sortDropdownApi = null;
let contextMenuRef = null;
let recentSearches = [];
let lastVisibleCount = 0;
let wallpaperBrowseFiles = allWallpaperFiles.slice();
let wallpaperBrowseContext = null;
let lightboxState = {
  sourceGrid: null,
  file: ""
};

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const toTitle = (file) => {
  const withoutExtension = file.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExtension.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return withSpaces
    .split(" ")
    .map((word) => (word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
};

const inferCategory = (file) => {
  const found = categoryRules.find((rule) => rule.match.test(file));
  return found ? found.label : "Curated";
};

const encodeFilePath = (file) => `wallpapers/${encodeURIComponent(file).replace(/%2F/g, "/")}`;

const normalizeFileList = (files) => {
  const seen = new Set();
  return files.filter((file) => {
    if (!allWallpaperFiles.includes(file) || seen.has(file)) {
      return false;
    }

    seen.add(file);
    return true;
  });
};

const shuffleArray = (items) => {
  const clone = items.slice();
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
};

const getFileExtension = (file) => {
  const match = file.match(/\.([^.]+)$/);
  return match ? match[1].toUpperCase() : "PNG";
};

const getWallpaperBrowseState = () => {
  const params = new URLSearchParams(window.location.search);
  const collectionFilesParam = params.get("collection-files");

  if (collectionFilesParam !== null) {
    const files = normalizeFileList(
      collectionFilesParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );

    return {
      files,
      context: {
        type: "setup",
        label: "Your Setup Picks",
        description: "A focused wallpaper set based on the vibe and monitor profile you chose.",
        backLabel: "← Back to Setup",
        backHref: "setup.html"
      }
    };
  }

  const collectionId = params.get("collection");
  if (collectionId) {
    const collection = collections.find((item) => item.id === collectionId);
    if (collection) {
      return {
        files: normalizeFileList(collection.files),
        context: {
          type: "collection",
          label: collection.label,
          description: collection.description,
          backLabel: "← All Collections",
          backHref: "collections.html"
        }
      };
    }
  }

  return {
    files: allWallpaperFiles.slice(),
    context: null
  };
};

const getRelatedWallpaperFiles = (file, count = 4) => {
  const category = inferCategory(file);
  const sameCategory = allWallpaperFiles.filter((item) => item !== file && inferCategory(item) === category);
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  const fallbackPool = shuffleArray(
    allWallpaperFiles.filter((item) => item !== file && inferCategory(item) !== category && !sameCategory.includes(item))
  );

  return [...sameCategory, ...fallbackPool].slice(0, count);
};

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
};

const saveFavorites = () => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  } catch {
    // Ignore write failures in storage-restricted contexts.
  }
};

const loadRecentSearches = () => {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => typeof item === "string" && item.trim().length >= 2).slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
};

const saveRecentSearches = () => {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  } catch {
    // Ignore write failures in storage-restricted contexts.
  }
};

const updateUrlState = () => {
  if (document.body.dataset.page !== "wallpapers") {
    return;
  }

  const url = new URL(window.location.href);
  if (activeFilter && activeFilter !== "All") {
    url.searchParams.set("category", activeFilter);
  } else {
    url.searchParams.delete("category");
  }

  if (activeSearchQuery) {
    url.searchParams.set("search", activeSearchQuery);
  } else {
    url.searchParams.delete("search");
  }

  history.replaceState({}, "", url.toString());
};

const getUrlState = () => {
  const params = new URLSearchParams(window.location.search);
  const rawCategory = params.get("category") || "All";
  const category = rawCategory.trim() || "All";
  const search = (params.get("search") || "").trim();
  return { category, search };
};

const isTextInputFocused = () => {
  const active = document.activeElement;
  if (!active) {
    return false;
  }

  const tagName = active.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || active.isContentEditable;
};

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const createWallpaperCard = (file, index) => {
  const title = toTitle(file);
  const category = inferCategory(file);
  const path = encodeFilePath(file);
  const detailLink = `detail.html?file=${encodeURIComponent(file)}`;
  const isFavorited = favorites.has(file);
  const sourceIndex = allWallpaperFiles.indexOf(file);
  const isNew = sourceIndex >= allWallpaperFiles.length - 6;

  const card = document.createElement("article");
  const delayClass = index % 3 === 1 ? " delay-1" : index % 3 === 2 ? " delay-2" : "";
  card.className = `wallpaper-card reveal${delayClass}`;
  card.dataset.file = file;
  card.dataset.category = category;

  card.innerHTML = `
    <div class="card-media">
      <div class="media-skeleton" aria-hidden="true"></div>
      <img src="${path}" alt="${escapeHtml(title)}" loading="lazy" decoding="async" />
      ${isNew ? '<span class="badge-new">New</span>' : ""}
      <button class="fav-btn js-favorite${isFavorited ? " is-favorited" : ""}" type="button" aria-label="Toggle favorite" aria-pressed="${isFavorited ? "true" : "false"}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
    <div class="card-content">
      <div class="card-top">
        <h3 class="card-title">
          <a class="card-title-link" href="${detailLink}">${escapeHtml(title)}</a>
        </h3>
        <span class="card-meta" data-category="${escapeHtml(category)}">${escapeHtml(category)}</span>
      </div>
      <div class="card-extra">
        <p class="card-note">Checking file availability...</p>
        <div class="card-actions" hidden>
          <button class="card-btn js-preview" type="button" data-path="${path}" data-title="${escapeHtml(title)}" data-category="${escapeHtml(category)}" data-file="${escapeHtml(file)}">Preview</button>
          <a class="card-btn" href="${path}" download data-download data-file="${escapeHtml(file)}">Download</a>
        </div>
      </div>
    </div>
  `;

  const media = card.querySelector(".card-media");
  const skeleton = card.querySelector(".media-skeleton");
  const image = card.querySelector("img");
  const note = card.querySelector(".card-note");
  const actions = card.querySelector(".card-actions");

  const clearSkeleton = () => {
    skeleton.classList.add("is-hidden");
    setTimeout(() => {
      if (skeleton.parentNode) {
        skeleton.remove();
      }
    }, 250);
  };

  const markAvailable = () => {
    card.dataset.available = "true";
    note.textContent = "Open in the lightbox or download directly.";
    actions.hidden = false;
    image.classList.add("is-ready");
    clearSkeleton();
  };

  const markUnavailable = () => {
    card.dataset.available = "false";
    note.textContent = "This file is currently unavailable for preview or download.";
    actions.hidden = true;
    clearSkeleton();
    image.remove();

    const fallback = document.createElement("div");
    fallback.className = "media-fallback";
    fallback.textContent = "File unavailable";
    media.appendChild(fallback);
  };

  image.addEventListener("load", markAvailable, { once: true });
  image.addEventListener("error", markUnavailable, { once: true });

  if (image.complete) {
    if (image.naturalWidth > 0) {
      markAvailable();
    } else {
      markUnavailable();
    }
  }

  return card;
};

const createCollectionCard = (collection, index) => {
  const delayClass = index % 3 === 1 ? " delay-1" : index % 3 === 2 ? " delay-2" : "";
  const card = document.createElement("a");
  card.className = `collection-card reveal${delayClass}`;
  card.href = `wallpapers.html?collection=${encodeURIComponent(collection.id)}`;

  card.innerHTML = `
    <img src="${encodeFilePath(collection.cover)}" alt="${escapeHtml(collection.label)}" loading="lazy" decoding="async" />
    <span class="collection-count">${collection.files.length}</span>
    <div class="collection-overlay">
      <h3>${escapeHtml(collection.label)}</h3>
      <p>${escapeHtml(collection.description)}</p>
    </div>
  `;

  return card;
};

const renderWallpaperGrid = (container, files) => {
  files.forEach((file, index) => {
    container.appendChild(createWallpaperCard(file, index));
  });
};

const setupHeroPreviewStack = () => {
  const stack = document.getElementById("heroPreviewStack");
  const meta = document.getElementById("heroPreviewMeta");
  if (!stack) {
    return;
  }

  const pool = featuredWallpaperFiles.slice();
  if (!pool.length) {
    return;
  }

  let startIndex = 0;
  let paused = false;

  const getLayerIndex = (card) => {
    const match = card.className.match(/layer-(\d+)/);
    return match ? match[1] : "0";
  };

  const clearHover = () => {
    paused = false;
    stack.classList.remove("is-hovering");
    stack.removeAttribute("data-hover-index");
  };

  const setHover = (card) => {
    if (!card) {
      return;
    }

    paused = true;
    stack.classList.add("is-hovering");
    stack.dataset.hoverIndex = getLayerIndex(card);
  };

  const bindHover = () => {
    stack.querySelectorAll(".hero-stack-card").forEach((card) => {
      card.addEventListener("mouseenter", () => setHover(card));
      card.addEventListener("focusin", () => setHover(card));
    });
  };

  const syncMeta = (file) => {
    if (!meta) {
      return;
    }

    meta.textContent = toTitle(file);
    meta.style.opacity = "1";
  };

  const renderStack = (animated = false) => {
    const visibleItems = Math.min(3, pool.length);
    const currentFiles = [];

    for (let offset = 0; offset < visibleItems; offset += 1) {
      currentFiles.push(pool[(startIndex + offset) % pool.length]);
    }

    stack.innerHTML = currentFiles
      .map((file, index) => {
        const title = toTitle(file);
        const path = encodeFilePath(file);
        return `
          <figure class="hero-stack-card layer-${index}" tabindex="0">
            <img src="${path}" alt="${escapeHtml(title)}" loading="lazy" decoding="async" />
            <figcaption class="hero-stack-label">${escapeHtml(title)}</figcaption>
          </figure>
        `;
      })
      .join("");

    bindHover();

    if (animated) {
      stack.classList.add("is-transitioning");
      setTimeout(() => stack.classList.remove("is-transitioning"), 380);
    }
  };

  stack.addEventListener("mouseleave", clearHover);
  stack.addEventListener("focusout", (event) => {
    if (!stack.contains(event.relatedTarget)) {
      clearHover();
    }
  });

  renderStack();
  syncMeta(pool[startIndex]);

  setInterval(() => {
    if (paused) {
      return;
    }

    if (meta) {
      meta.style.opacity = "0";
    }

    setTimeout(() => {
      if (paused) {
        if (meta) {
          meta.style.opacity = "1";
        }
        return;
      }

      startIndex = (startIndex + 1) % pool.length;
      renderStack(true);
      syncMeta(pool[startIndex]);
    }, 150);
  }, HERO_ROTATE_MS);
};

const createLightbox = () => {
  if (lightboxRefs) {
    return lightboxRefs;
  }

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" type="button" aria-label="Close preview">×</button>
      <button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous wallpaper" hidden>‹</button>
      <button class="lightbox-nav lightbox-next" type="button" aria-label="Next wallpaper" hidden>›</button>
      <img class="lightbox-image" alt="Wallpaper preview" />
      <div class="lightbox-meta">
        <div class="lightbox-title"></div>
        <div class="lightbox-category"></div>
      </div>
      <a class="card-btn lightbox-download" href="#" download data-download>Download</a>
    </div>
  `;

  const refs = {
    overlay,
    inner: overlay.querySelector(".lightbox-inner"),
    close: overlay.querySelector(".lightbox-close"),
    prev: overlay.querySelector(".lightbox-prev"),
    next: overlay.querySelector(".lightbox-next"),
    image: overlay.querySelector(".lightbox-image"),
    title: overlay.querySelector(".lightbox-title"),
    category: overlay.querySelector(".lightbox-category"),
    download: overlay.querySelector(".lightbox-download")
  };

  const closeLightbox = () => {
    refs.overlay.classList.remove("is-open");
    setTimeout(() => {
      refs.image.removeAttribute("src");
      refs.inner.classList.remove("is-loading");
    }, 180);
  };

  refs.close.addEventListener("click", closeLightbox);
  refs.prev.addEventListener("click", () => navigateLightbox(-1));
  refs.next.addEventListener("click", () => navigateLightbox(1));

  refs.overlay.addEventListener("click", (event) => {
    if (event.target === refs.overlay) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!refs.overlay.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowRight") {
      navigateLightbox(1);
      return;
    }

    if (event.key === "ArrowLeft") {
      navigateLightbox(-1);
    }
  });

  document.body.appendChild(overlay);
  lightboxRefs = { ...refs, closeLightbox };
  return lightboxRefs;
};

const getVisibleAvailableCards = (grid) => {
  if (!grid) {
    return [];
  }

  return Array.from(grid.querySelectorAll(".wallpaper-card[data-available='true']")).filter(
    (card) => !card.classList.contains("is-filter-hidden") && !card.classList.contains("is-filtering-out")
  );
};

const syncLightboxNavigation = (lightbox, sourceGrid, file) => {
  const cards = getVisibleAvailableCards(sourceGrid);
  const hasCurrentFile = cards.some((card) => card.dataset.file === file);
  const showNavigation = Boolean(sourceGrid) && hasCurrentFile && cards.length > 1;
  lightbox.prev.hidden = !showNavigation;
  lightbox.next.hidden = !showNavigation;
};

const navigateLightbox = (direction) => {
  if (!lightboxState.sourceGrid) {
    return;
  }

  const cards = getVisibleAvailableCards(lightboxState.sourceGrid);
  if (!cards.length) {
    return;
  }

  const currentIndex = cards.findIndex((card) => card.dataset.file === lightboxState.file);
  const startIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextIndex = (startIndex + direction + cards.length) % cards.length;
  const nextCard = cards[nextIndex];
  const previewButton = nextCard.querySelector(".js-preview");

  if (!previewButton) {
    return;
  }

  openLightbox({
    path: previewButton.dataset.path,
    title: previewButton.dataset.title,
    category: previewButton.dataset.category,
    file: previewButton.dataset.file,
    sourceGrid: lightboxState.sourceGrid
  });
};

const openLightbox = ({ path, title, category, file, sourceGrid = null }) => {
  const lightbox = createLightbox();
  lightboxState = {
    sourceGrid,
    file
  };

  syncLightboxNavigation(lightbox, sourceGrid, file);

  const handleLoadDone = () => {
    lightbox.inner.classList.remove("is-loading");
  };

  lightbox.image.onload = handleLoadDone;
  lightbox.image.onerror = handleLoadDone;
  lightbox.inner.classList.add("is-loading");
  lightbox.image.removeAttribute("src");
  lightbox.image.src = path;
  lightbox.image.alt = title;
  lightbox.title.textContent = title;
  lightbox.category.textContent = category;
  lightbox.download.href = path;
  lightbox.download.setAttribute("download", "");
  lightbox.download.dataset.file = file;
  lightbox.overlay.classList.add("is-open");
  if (lightbox.image.complete && lightbox.image.naturalWidth > 0) {
    handleLoadDone();
  }
};

const closeLightboxIfOpen = () => {
  if (!lightboxRefs?.overlay?.classList.contains("is-open")) {
    return false;
  }

  lightboxRefs.closeLightbox();
  return true;
};

const applyDownloadFeedback = (button) => {
  if (!button) {
    return;
  }

  if (!button.dataset.originalLabel) {
    button.dataset.originalLabel = button.textContent.trim();
  }

  button.classList.add("is-saved");
  button.textContent = "Saved ✓";

  if (button._downloadFeedbackTimer) {
    clearTimeout(button._downloadFeedbackTimer);
  }

  button._downloadFeedbackTimer = setTimeout(() => {
    button.classList.remove("is-saved");
    button.textContent = button.dataset.originalLabel;
  }, 2000);
};

const setCardVisibility = (card, shouldShow) => {
  if (shouldShow) {
    if (card.classList.contains("is-filter-hidden") || card.classList.contains("is-filtering-out")) {
      card.classList.remove("is-filter-hidden", "is-filtering-out");
      void card.offsetWidth;
      card.classList.add("is-filtering-in");
      setTimeout(() => card.classList.remove("is-filtering-in"), FILTER_TRANSITION_MS + 80);
    }
    return;
  }

  if (card.classList.contains("is-filter-hidden") || card.classList.contains("is-filtering-out")) {
    return;
  }

  card.classList.add("is-filtering-out");
  setTimeout(() => {
    if (card.classList.contains("is-filtering-out")) {
      card.classList.add("is-filter-hidden");
      card.classList.remove("is-filtering-out");
    }
  }, FILTER_TRANSITION_MS);
};

const setVisibleCountLabel = (count) => {
  const label = document.getElementById("visibleCount");
  if (!label) {
    return;
  }

  const previous = label.dataset.lastCount;
  const total = wallpaperBrowseFiles.length;
  label.innerHTML = `Showing <span class="count-number">${count}</span> of ${total} wallpapers`;
  label.dataset.lastCount = String(count);

  if (previous !== undefined && previous !== String(count)) {
    label.classList.remove("is-updating");
    void label.offsetWidth;
    label.classList.add("is-updating");
    setTimeout(() => label.classList.remove("is-updating"), 300);
  }
};

const countFavoritesInGrid = (grid) => {
  if (!grid) {
    return 0;
  }

  const files = new Set(Array.from(grid.querySelectorAll(".wallpaper-card")).map((card) => card.dataset.file));
  let count = 0;
  favorites.forEach((file) => {
    if (files.has(file)) {
      count += 1;
    }
  });
  return count;
};

const updateFilterButtonCounts = () => {
  const grid = document.getElementById("allGrid");
  const bar = document.getElementById("categoryFilters");
  if (!grid || !bar) {
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".wallpaper-card"));
  const categoryCounts = {
    All: cards.length,
    Space: 0,
    Nature: 0,
    Urban: 0,
    Cinematic: 0,
    Abstract: 0,
    Curated: 0,
    Favorites: countFavoritesInGrid(grid)
  };

  cards.forEach((card) => {
    const category = card.dataset.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  bar.querySelectorAll(".filter-btn").forEach((button) => {
    if (!button.dataset.label) {
      button.dataset.label = button.textContent.trim();
    }

    const key = button.dataset.filter || "All";
    const count = categoryCounts[key] ?? 0;
    button.textContent = `${button.dataset.label} `;

    const badge = document.createElement("span");
    badge.className = "filter-count";
    badge.textContent = String(count);
    button.appendChild(badge);
  });
};

const clearNoResultsState = (grid) => {
  if (!grid) {
    return;
  }

  const existing = grid.querySelector(".no-results");
  if (existing) {
    existing.remove();
  }
};

const createNoResultsState = (grid) => {
  if (!grid) {
    return;
  }

  clearNoResultsState(grid);

  const cards = Array.from(grid.querySelectorAll(".wallpaper-card"));
  const categoryMatches = new Set();

  cards.forEach((card) => {
    const title = card.querySelector(".card-title")?.textContent?.toLowerCase() || "";
    const category = card.dataset.category;
    const matchesSearch = !activeSearchQuery || title.includes(activeSearchQuery);
    if (matchesSearch && category && category !== activeFilter) {
      categoryMatches.add(category);
    }
  });

  const orderedSuggestions = ["Space", "Nature", "Urban", "Cinematic", "Abstract", "Curated", "Favorites"].filter((label) =>
    categoryMatches.has(label)
  );

  const state = document.createElement("div");
  state.className = "no-results";

  const icon = document.createElement("div");
  icon.className = "no-results-icon";
  icon.textContent = "✕";

  const heading = document.createElement("h3");
  heading.textContent = "No wallpapers found";

  const subtext = document.createElement("p");
  subtext.textContent = "Try clearing the search or switching to a different category.";

  const actions = document.createElement("div");
  actions.className = "no-results-actions";
  actions.innerHTML = `
    <button class="btn-ghost js-clear-search" type="button">Clear search</button>
    <button class="btn-ghost js-show-all" type="button">Show all</button>
  `;

  state.appendChild(icon);
  state.appendChild(heading);
  state.appendChild(subtext);
  state.appendChild(actions);

  if (activeFilter !== "All" && orderedSuggestions.length) {
    const suggestions = document.createElement("div");
    suggestions.className = "no-results-suggestions";

    const label = document.createElement("span");
    label.textContent = "There are results in:";
    suggestions.appendChild(label);

    orderedSuggestions.forEach((category, index) => {
      const button = document.createElement("button");
      button.className = "category-suggest";
      button.type = "button";
      button.dataset.suggestFilter = category;
      button.textContent = category;
      suggestions.appendChild(button);

      if (index < orderedSuggestions.length - 1) {
        const separator = document.createElement("span");
        separator.textContent = "·";
        suggestions.appendChild(separator);
      }
    });

    state.appendChild(suggestions);
  }

  grid.appendChild(state);
};

const sortCardsInGrid = (grid) => {
  if (!grid) {
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".wallpaper-card"));
  if (!cards.length) {
    return;
  }

  const defaultIndex = new Map(wallpaperBrowseFiles.map((file, index) => [file, index]));

  const sorted = cards.sort((a, b) => {
    const aFile = a.dataset.file || "";
    const bFile = b.dataset.file || "";
    const aTitle = a.querySelector(".card-title")?.textContent?.trim() || "";
    const bTitle = b.querySelector(".card-title")?.textContent?.trim() || "";
    const aCategory = a.dataset.category || "";
    const bCategory = b.dataset.category || "";

    if (activeSort === "az") {
      return aTitle.localeCompare(bTitle, undefined, { sensitivity: "base" });
    }

    if (activeSort === "za") {
      return bTitle.localeCompare(aTitle, undefined, { sensitivity: "base" });
    }

    if (activeSort === "category") {
      const categoryCompare = aCategory.localeCompare(bCategory, undefined, { sensitivity: "base" });
      if (categoryCompare !== 0) {
        return categoryCompare;
      }
      return aTitle.localeCompare(bTitle, undefined, { sensitivity: "base" });
    }

    return (defaultIndex.get(aFile) ?? 0) - (defaultIndex.get(bFile) ?? 0);
  });

  sorted.forEach((card) => grid.appendChild(card));
};

const scrollControlsIntoView = () => {
  const grid = document.getElementById("allGrid");
  const controlsSticky = document.getElementById("controlsSticky");
  if (!grid || !controlsSticky) {
    return;
  }

  const navHeight = document.getElementById("siteNav")?.offsetHeight || 72;
  const rect = grid.getBoundingClientRect();
  const fullyVisible = rect.top >= navHeight && rect.bottom <= window.innerHeight;
  if (fullyVisible) {
    return;
  }

  const top = controlsSticky.getBoundingClientRect().top + window.scrollY - navHeight - 12;
  window.scrollTo({ top, behavior: "smooth" });
};

const applyActiveFilter = ({ shouldScroll = false, updateHistory = true } = {}) => {
  const grid = document.getElementById("allGrid");
  if (!grid) {
    return 0;
  }

  const cards = grid.querySelectorAll(".wallpaper-card");
  let visibleCount = 0;
  cards.forEach((card) => {
    const file = card.dataset.file;
    const category = card.dataset.category;
    const title = card.querySelector(".card-title")?.textContent?.toLowerCase() || "";

    const matchesCategory =
      activeFilter === "All" ||
      (activeFilter === "Favorites" && favorites.has(file)) ||
      (activeFilter !== "Favorites" && category === activeFilter);

    const matchesSearch = !activeSearchQuery || title.includes(activeSearchQuery);
    const matches = matchesCategory && matchesSearch;

    if (matches) {
      visibleCount += 1;
    }

    setCardVisibility(card, matches);
  });

  setVisibleCountLabel(visibleCount);
  updateFilterButtonCounts();

  lastVisibleCount = visibleCount;

  if (visibleCount === 0) {
    createNoResultsState(grid);
  } else {
    clearNoResultsState(grid);
  }

  if (updateHistory) {
    updateUrlState();
  }

  if (shouldScroll) {
    scrollControlsIntoView();
  }

  return visibleCount;
};

const setActiveFilterByName = (filterName, options = {}) => {
  const bar = document.getElementById("categoryFilters");
  if (!bar) {
    activeFilter = filterName || "All";
    return applyActiveFilter(options);
  }

  const normalized = (filterName || "All").toLowerCase();
  const target =
    Array.from(bar.querySelectorAll(".filter-btn")).find(
      (button) => (button.dataset.filter || "").toLowerCase() === normalized
    ) || bar.querySelector(".filter-btn[data-filter='All']");
  if (!target) {
    return applyActiveFilter(options);
  }

  activeFilter = target.dataset.filter || "All";
  bar.querySelectorAll(".filter-btn").forEach((button) => button.classList.remove("active"));
  target.classList.add("active");
  return applyActiveFilter(options);
};

const applyInitialUrlState = () => {
  if (document.body.dataset.page !== "wallpapers") {
    return;
  }

  const { category, search } = getUrlState();
  activeSearchQuery = search.toLowerCase();

  const searchInput = document.getElementById("wallpaperSearch");
  if (searchInput) {
    searchInput.value = search;
    const clearButton = document.querySelector(".search-clear");
    clearButton?.classList.toggle("is-visible", search.length > 0);
  }

  const bar = document.getElementById("categoryFilters");
  const targetButton = Array.from(bar?.querySelectorAll(".filter-btn") || []).find(
    (button) => (button.dataset.filter || "").toLowerCase() === category.toLowerCase()
  );
  const targetCategory = targetButton?.dataset.filter || "All";
  setActiveFilterByName(targetCategory, { updateHistory: false });
};

const setupCategoryFilters = () => {
  const bar = document.getElementById("categoryFilters");
  if (!bar) {
    return;
  }

  bar.querySelectorAll(".filter-btn").forEach((button) => {
    button.dataset.category = button.dataset.filter || "All";
  });

  bar.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) {
      return;
    }

    setActiveFilterByName(button.dataset.filter || "All", { shouldScroll: true });
  });
};

const setupSearchInput = () => {
  const searchInput = document.getElementById("wallpaperSearch");
  const searchWrap = document.querySelector(".search-wrap");
  if (!searchInput || !searchWrap) {
    return;
  }

  recentSearches = loadRecentSearches();

  const clearButton = document.createElement("button");
  clearButton.className = "search-clear";
  clearButton.type = "button";
  clearButton.setAttribute("aria-label", "Clear search");
  clearButton.innerHTML = "×";
  searchWrap.appendChild(clearButton);

  const recentPanel = document.createElement("div");
  recentPanel.className = "recent-searches";
  recentPanel.hidden = true;
  searchWrap.appendChild(recentPanel);

  const saveRecentSearch = (query) => {
    const normalized = query.trim();
    if (normalized.length < 2) {
      return;
    }

    recentSearches = [normalized, ...recentSearches.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(
      0,
      MAX_RECENT_SEARCHES
    );
    saveRecentSearches();
  };

  const removeRecentSearch = (query) => {
    recentSearches = recentSearches.filter((item) => item.toLowerCase() !== query.toLowerCase());
    saveRecentSearches();
  };

  const renderRecentPanel = () => {
    recentPanel.innerHTML = "";
    recentSearches.forEach((query) => {
      const chip = document.createElement("button");
      chip.className = "recent-chip";
      chip.type = "button";
      chip.dataset.query = query;
      chip.innerHTML = `<span>${escapeHtml(query)}</span><span class="chip-remove" data-remove="true" aria-hidden="true">×</span>`;
      recentPanel.appendChild(chip);
    });
  };

  const showRecentPanel = () => {
    if (!recentSearches.length || document.activeElement !== searchInput) {
      recentPanel.hidden = true;
      return;
    }

    renderRecentPanel();
    recentPanel.hidden = false;
  };

  const hideRecentPanel = () => {
    recentPanel.hidden = true;
  };

  const syncSearchState = () => {
    clearButton.classList.toggle("is-visible", searchInput.value.trim().length > 0);
  };

  const handleSearch = debounce((value) => {
    activeSearchQuery = value.trim().toLowerCase();
    applyActiveFilter();
  }, 120);

  const handleRecentSearchSave = debounce((value) => {
    const query = value.trim();
    if (query.length < 2 || lastVisibleCount < 1) {
      return;
    }

    saveRecentSearch(query);
  }, 600);

  searchInput.addEventListener("input", (event) => {
    syncSearchState();
    const value = event.target.value;
    handleSearch(value);
    handleRecentSearchSave(value);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    syncSearchState();
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    hideRecentPanel();
    searchInput.focus();
  });

  searchInput.addEventListener("focus", () => {
    showRecentPanel();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveRecentSearch(searchInput.value);
      hideRecentPanel();
      return;
    }

    if (event.key === "Escape") {
      hideRecentPanel();
    }
  });

  recentPanel.addEventListener("click", (event) => {
    const chip = event.target.closest(".recent-chip");
    if (!chip) {
      return;
    }

    const query = chip.dataset.query || "";
    if (!query) {
      return;
    }

    if (event.target.closest("[data-remove='true']")) {
      removeRecentSearch(query);
      showRecentPanel();
      return;
    }

    searchInput.value = query;
    syncSearchState();
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    hideRecentPanel();
    searchInput.focus();
  });

  document.addEventListener("click", (event) => {
    if (!searchWrap.contains(event.target)) {
      hideRecentPanel();
    }
  });

  syncSearchState();
};

const setupCustomSortDropdown = () => {
  const grid = document.getElementById("allGrid");
  const wrap = document.getElementById("sortWrap");
  const trigger = document.getElementById("sortTrigger");
  const label = document.getElementById("sortTriggerLabel");
  const menu = document.getElementById("sortMenu");
  if (!grid || !wrap || !trigger || !label || !menu) {
    return;
  }

  const options = Array.from(menu.querySelectorAll(".sort-option"));
  let focusedIndex = options.findIndex((option) => option.classList.contains("is-selected"));
  let closeTimer = null;
  if (focusedIndex < 0) {
    focusedIndex = 0;
  }

  const isMenuOpen = () => wrap.classList.contains("is-open");

  const syncMenuState = (open) => {
    wrap.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const closeMenu = (focusTrigger = false) => {
    if (!isMenuOpen() && menu.hidden) {
      if (focusTrigger) {
        trigger.focus();
      }
      return;
    }

    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    syncMenuState(false);
    closeTimer = setTimeout(() => {
      menu.hidden = true;
      closeTimer = null;
    }, SORT_MENU_ANIM_MS);

    if (focusTrigger) {
      trigger.focus();
    }
  };

  const focusOption = (index) => {
    if (!options.length) {
      return;
    }

    focusedIndex = (index + options.length) % options.length;
    options[focusedIndex]?.focus();
  };

  const openMenu = () => {
    if (isMenuOpen()) {
      return;
    }

    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    menu.hidden = false;
    requestAnimationFrame(() => {
      syncMenuState(true);
    });
    focusOption(focusedIndex);
  };

  const applySortSelection = (value) => {
    activeSort = value;

    options.forEach((option, index) => {
      const selected = option.dataset.value === value;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-selected", selected ? "true" : "false");
      if (selected) {
        focusedIndex = index;
        label.textContent = option.textContent;
      }
    });

    sortCardsInGrid(grid);
    applyActiveFilter({ shouldScroll: true });
    closeMenu();
  };

  trigger.addEventListener("click", () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isMenuOpen()) {
        openMenu();
      } else {
        focusOption(focusedIndex + 1);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isMenuOpen()) {
        openMenu();
      } else {
        focusOption(focusedIndex - 1);
      }
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isMenuOpen()) {
        const selected = options[focusedIndex];
        if (selected) {
          applySortSelection(selected.dataset.value || "default");
        } else {
          closeMenu();
        }
      } else {
        openMenu();
      }
      return;
    }

    if (event.key === "Tab" && isMenuOpen()) {
      event.preventDefault();
      focusOption(event.shiftKey ? focusedIndex - 1 : focusedIndex + 1);
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      applySortSelection(option.dataset.value || "default");
    });
  });

  menu.addEventListener("keydown", (event) => {
    if (!isMenuOpen()) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(focusedIndex + 1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(focusedIndex - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const selected = document.activeElement?.closest(".sort-option");
      if (selected) {
        applySortSelection(selected.dataset.value || "default");
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      focusOption(event.shiftKey ? focusedIndex - 1 : focusedIndex + 1);
    }
  });

  document.addEventListener("click", (event) => {
    if (!wrap.contains(event.target)) {
      closeMenu();
    }
  });

  sortDropdownApi = {
    isOpen: isMenuOpen,
    close: (focusTrigger = false) => closeMenu(focusTrigger)
  };

  syncMenuState(false);
  menu.hidden = true;
};

const setupStickyControlsObserver = () => {
  const sticky = document.getElementById("controlsSticky");
  if (!sticky) {
    return;
  }

  sticky.classList.remove("is-stuck");
};

const toggleFavoriteForCard = (card) => {
  if (!card) {
    return false;
  }

  const favoriteButton = card.querySelector(".js-favorite");
  if (!favoriteButton) {
    return false;
  }

  const file = card.dataset.file;
  const isFavorited = favorites.has(file);

  if (isFavorited) {
    favorites.delete(file);
    favoriteButton.classList.remove("is-favorited");
    favoriteButton.setAttribute("aria-pressed", "false");
  } else {
    favorites.add(file);
    favoriteButton.classList.add("is-favorited");
    favoriteButton.setAttribute("aria-pressed", "true");
  }

  saveFavorites();
  applyActiveFilter({ updateHistory: false });
  return !isFavorited;
};

const closeContextMenu = () => {
  if (!contextMenuRef) {
    return;
  }

  const { menu, onOutsideClick, onWindowScroll, onEscape } = contextMenuRef;
  menu.remove();
  document.removeEventListener("click", onOutsideClick, true);
  window.removeEventListener("scroll", onWindowScroll, true);
  document.removeEventListener("keydown", onEscape, true);
  contextMenuRef = null;
};

const openCardContextMenu = (card, x, y) => {
  if (!card) {
    return;
  }

  closeContextMenu();

  const previewButton = card.querySelector(".js-preview");
  const isAvailable = card.dataset.available === "true" && !!previewButton;
  const menu = document.createElement("div");
  menu.className = "ctx-menu";

  const favoriteLabel = favorites.has(card.dataset.file) ? "Unfavorite" : "Favorite";
  menu.innerHTML = `
    <button class="ctx-item js-ctx-preview" type="button" ${isAvailable ? "" : "disabled"}>Preview</button>
    <button class="ctx-item js-ctx-favorite" type="button">${favoriteLabel}</button>
    <button class="ctx-item js-ctx-copy" type="button">Copy download link</button>
  `;

  menu.querySelector(".js-ctx-preview")?.addEventListener("click", () => {
    if (!isAvailable || !previewButton) {
      return;
    }

    openLightbox({
      path: previewButton.dataset.path,
      title: previewButton.dataset.title,
      category: previewButton.dataset.category,
      file: previewButton.dataset.file,
      sourceGrid: card.closest(".wallpaper-grid")
    });
    closeContextMenu();
  });

  menu.querySelector(".js-ctx-favorite")?.addEventListener("click", () => {
    toggleFavoriteForCard(card);
    closeContextMenu();
  });

  menu.querySelector(".js-ctx-copy")?.addEventListener("click", async (event) => {
    const copyButton = event.currentTarget;
    const path = previewButton?.dataset.path || encodeFilePath(card.dataset.file || "");
    const fullUrl = new URL(path, window.location.href).href;

    try {
      await navigator.clipboard.writeText(fullUrl);
      copyButton.textContent = "Copied ✓";
      setTimeout(() => {
        copyButton.textContent = "Copy download link";
      }, 1200);
    } catch {
      copyButton.textContent = "Copy failed";
      setTimeout(() => {
        copyButton.textContent = "Copy download link";
      }, 1200);
    }
  });

  document.body.appendChild(menu);

  const rect = menu.getBoundingClientRect();
  const clampedLeft = Math.min(x, window.innerWidth - rect.width - 8);
  const clampedTop = Math.min(y, window.innerHeight - rect.height - 8);
  menu.style.left = `${Math.max(8, clampedLeft)}px`;
  menu.style.top = `${Math.max(8, clampedTop)}px`;

  const onOutsideClick = (event) => {
    if (!menu.contains(event.target)) {
      closeContextMenu();
    }
  };

  const onWindowScroll = () => {
    closeContextMenu();
  };

  const onEscape = (event) => {
    if (event.key === "Escape") {
      closeContextMenu();
    }
  };

  document.addEventListener("click", onOutsideClick, true);
  window.addEventListener("scroll", onWindowScroll, true);
  document.addEventListener("keydown", onEscape, true);

  contextMenuRef = {
    menu,
    onOutsideClick,
    onWindowScroll,
    onEscape
  };
};

const setupRandomButton = () => {
  const randomButton = document.getElementById("randomWallpaperBtn");
  const grid = document.getElementById("allGrid");
  if (!randomButton || !grid) {
    return;
  }

  randomButton.addEventListener("click", () => {
    const availableCards = getVisibleAvailableCards(grid);
    if (!availableCards.length) {
      return;
    }

    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    const previewButton = randomCard.querySelector(".js-preview");
    if (!previewButton) {
      return;
    }

    openLightbox({
      path: previewButton.dataset.path,
      title: previewButton.dataset.title,
      category: previewButton.dataset.category,
      file: previewButton.dataset.file,
      sourceGrid: grid
    });
  });
};

const setupGlobalInteractions = () => {
  document.addEventListener("click", (event) => {
    const clearSearchAction = event.target.closest(".js-clear-search");
    if (clearSearchAction) {
      const searchInput = document.getElementById("wallpaperSearch");
      if (searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
        searchInput.focus();
      }
      return;
    }

    const showAllAction = event.target.closest(".js-show-all");
    if (showAllAction) {
      const searchInput = document.getElementById("wallpaperSearch");
      if (searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
      setActiveFilterByName("All", { shouldScroll: true });
      return;
    }

    const suggestedFilter = event.target.closest("[data-suggest-filter]");
    if (suggestedFilter) {
      setActiveFilterByName(suggestedFilter.dataset.suggestFilter || "All", { shouldScroll: true });
      return;
    }

    const favoriteButton = event.target.closest(".js-favorite");
    if (favoriteButton) {
      const card = favoriteButton.closest(".wallpaper-card");
      toggleFavoriteForCard(card);
      return;
    }

    const previewButton = event.target.closest(".js-preview");
    if (previewButton) {
      const card = previewButton.closest(".wallpaper-card");
      if (!card || card.dataset.available !== "true") {
        return;
      }

      const cardMedia = card.querySelector(".card-media");
      if (cardMedia) {
        cardMedia.classList.add("is-opening");
        setTimeout(() => cardMedia.classList.remove("is-opening"), 400);
      }

      openLightbox({
        path: previewButton.dataset.path,
        title: previewButton.dataset.title,
        category: previewButton.dataset.category,
        file: previewButton.dataset.file,
        sourceGrid: card.closest(".wallpaper-grid")
      });
      return;
    }

    const downloadButton = event.target.closest("[data-download]");
    if (downloadButton) {
      applyDownloadFeedback(downloadButton);
    }
  });

  document.addEventListener("contextmenu", (event) => {
    const card = event.target.closest(".wallpaper-card");
    if (!card) {
      closeContextMenu();
      return;
    }

    event.preventDefault();
    openCardContextMenu(card, event.clientX, event.clientY);
  });
};

const setupKeyboardShortcuts = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "/") {
      if (isTextInputFocused() || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const searchInput = document.getElementById("wallpaperSearch");
      if (!searchInput) {
        return;
      }

      event.preventDefault();
      searchInput.focus();
      return;
    }

    if (event.key === "Escape") {
      if (closeLightboxIfOpen()) {
        return;
      }

      if (sortDropdownApi?.isOpen?.()) {
        sortDropdownApi.close(true);
        return;
      }

      if (contextMenuRef) {
        closeContextMenu();
        return;
      }

      const recentPanel = document.querySelector(".recent-searches");
      if (recentPanel && !recentPanel.hidden) {
        recentPanel.hidden = true;
      }
    }
  });
};

const setupNavState = () => {
  const page = document.body.dataset.page;
  if (!page) {
    return;
  }

  const currentLink = document.querySelector(`.nav-link[data-nav='${page}']`);
  if (currentLink) {
    currentLink.classList.add("active");
  }
};

const setupStickyNav = () => {
  const nav = document.getElementById("siteNav");
  if (!nav) {
    return;
  }

  const update = () => {
    nav.classList.toggle("scrolled", window.scrollY > 18);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
};

const setupRevealAnimations = () => {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const setYear = () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
};

const updateWallpaperHeroContent = () => {
  const hero = document.querySelector(".page-hero");
  if (!hero || !wallpaperBrowseContext) {
    return;
  }

  const eyebrow = hero.querySelector(".eyebrow");
  const heading = hero.querySelector("h1");
  const copy = hero.querySelector("p");

  if (eyebrow) {
    eyebrow.textContent = wallpaperBrowseContext.type === "setup" ? "Personalized Match" : "Curated Collection";
  }

  if (heading) {
    heading.textContent = wallpaperBrowseContext.label;
  }

  if (copy) {
    copy.textContent = wallpaperBrowseContext.description;
  }
};

const renderWallpaperContextLink = () => {
  const sticky = document.getElementById("controlsSticky");
  const bar = document.getElementById("categoryFilters");
  if (!sticky || !bar) {
    return;
  }

  const existing = sticky.querySelector(".wallpaper-context-link");
  if (!wallpaperBrowseContext) {
    existing?.remove();
    return;
  }

  const link = existing || document.createElement("a");
  link.className = "wallpaper-context-link";
  link.href = wallpaperBrowseContext.backHref;
  link.textContent = wallpaperBrowseContext.backLabel;

  if (!existing) {
    sticky.insertBefore(link, bar);
  }
};

const renderCollectionsPage = () => {
  const grid = document.getElementById("collectionsGrid");
  if (!grid) {
    return;
  }

  collections.forEach((collection, index) => {
    grid.appendChild(createCollectionCard(collection, index));
  });
};

const renderDetailErrorState = (mount) => {
  mount.innerHTML = `
    <section class="section detail-error-wrap">
      <div class="detail-error reveal in-view">
        <p class="eyebrow">Detail View</p>
        <h1>Wallpaper not found.</h1>
        <p>The wallpaper you requested could not be loaded from the current collection.</p>
        <a class="btn" href="wallpapers.html">Back to Collection</a>
      </div>
    </section>
  `;
};

const setupDetailPage = () => {
  const mount = document.getElementById("detailMount");
  if (!mount) {
    return;
  }

  const file = new URLSearchParams(window.location.search).get("file");
  if (!file || !allWallpaperFiles.includes(file)) {
    renderDetailErrorState(mount);
    return;
  }

  const title = toTitle(file);
  const category = inferCategory(file);
  const path = encodeFilePath(file);
  const relatedFiles = getRelatedWallpaperFiles(file);

  mount.innerHTML = `
    <section class="detail-hero reveal">
      <div class="detail-hero-media">
        <img class="detail-hero-image" src="${path}" alt="${escapeHtml(title)}" loading="eager" decoding="async" />
      </div>
    </section>

    <section class="section detail-content">
      <div class="detail-header reveal">
        <div class="detail-copy">
          <h1 class="detail-title">${escapeHtml(title)}</h1>
          <span class="detail-badge" data-category="${escapeHtml(category)}">${escapeHtml(category)}</span>
        </div>
        <div class="detail-actions">
          <a class="btn" href="${path}" download data-download data-file="${escapeHtml(file)}">Download</a>
          <button class="btn-ghost js-detail-fullscreen" type="button">Open Fullscreen</button>
        </div>
      </div>

      <div class="detail-meta-row reveal delay-1">
        <div class="detail-meta-item">
          <span class="detail-meta-label">Filename</span>
          <strong class="detail-meta-value">${escapeHtml(file)}</strong>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">Category</span>
          <strong class="detail-meta-value">${escapeHtml(category)}</strong>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">Resolution</span>
          <strong class="detail-meta-value">4K Ready</strong>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">Format</span>
          <strong class="detail-meta-value">${escapeHtml(getFileExtension(file))}</strong>
        </div>
      </div>
    </section>

    <section class="section detail-related">
      <div class="section-head reveal">
        <div>
          <span class="eyebrow">Related Wallpapers</span>
          <h2>More from this category</h2>
        </div>
        <p>Explore a few adjacent picks without leaving the same visual lane.</p>
      </div>
      <div class="wallpaper-grid related-grid" id="relatedGrid"></div>
    </section>
  `;

  const image = mount.querySelector(".detail-hero-image");
  const fullscreenButton = mount.querySelector(".js-detail-fullscreen");
  const relatedGrid = mount.querySelector("#relatedGrid");

  fullscreenButton?.addEventListener("click", () => {
    openLightbox({
      path,
      title,
      category,
      file
    });
  });

  if (relatedGrid) {
    renderWallpaperGrid(relatedGrid, relatedFiles);
  }

  const handleImageError = () => {
    renderDetailErrorState(mount);
  };

  image?.addEventListener("error", handleImageError, { once: true });

  if (image?.complete && image.naturalWidth === 0) {
    handleImageError();
  }
};

const setupSetupPage = () => {
  const vibeGrid = document.getElementById("setupVibeGrid");
  const monitorRow = document.getElementById("setupMonitorRow");
  const submitButton = document.getElementById("setupSubmitBtn");
  if (!vibeGrid || !monitorRow || !submitButton) {
    return;
  }

  let selectedVibe = "";
  let selectedMonitor = "";

  const syncButtonState = () => {
    submitButton.disabled = !selectedVibe || !selectedMonitor;
  };

  setupVibes.forEach((vibe, index) => {
    const delayClass = index % 2 === 1 ? " delay-1" : "";
    const card = document.createElement("button");
    card.type = "button";
    card.className = `setup-card reveal${delayClass}`;
    card.dataset.vibe = vibe.id;
    card.setAttribute("aria-pressed", "false");
    card.style.setProperty("--setup-image", `url("${encodeFilePath(vibe.cover)}")`);
    card.innerHTML = `
      <span class="setup-check" aria-hidden="true">✓</span>
      <span class="setup-label">${escapeHtml(vibe.label)}</span>
      <p>${escapeHtml(vibe.description)}</p>
    `;
    vibeGrid.appendChild(card);
  });

  setupMonitorOptions.forEach((monitor, index) => {
    const delayClass = index > 0 ? " delay-1" : "";
    const button = document.createElement("button");
    button.type = "button";
    button.className = `setup-monitor-btn reveal${delayClass}`;
    button.dataset.monitor = monitor.id;
    button.textContent = monitor.label;
    monitorRow.appendChild(button);
  });

  vibeGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".setup-card");
    if (!card) {
      return;
    }

    selectedVibe = card.dataset.vibe || "";
    vibeGrid.querySelectorAll(".setup-card").forEach((item) => {
      const isSelected = item === card;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    syncButtonState();
  });

  monitorRow.addEventListener("click", (event) => {
    const button = event.target.closest(".setup-monitor-btn");
    if (!button) {
      return;
    }

    selectedMonitor = button.dataset.monitor || "";
    monitorRow.querySelectorAll(".setup-monitor-btn").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    syncButtonState();
  });

  submitButton.addEventListener("click", () => {
    if (!selectedVibe || !selectedMonitor) {
      return;
    }

    const files = normalizeFileList(setupMap[selectedVibe] || []);
    const query = files.map((file) => encodeURIComponent(file)).join(",");
    window.location.href = `wallpapers.html?collection-files=${query}`;
  });

  syncButtonState();
};

const setupWallpapersPage = () => {
  const allGrid = document.getElementById("allGrid");
  if (!allGrid) {
    return;
  }

  const browseState = getWallpaperBrowseState();
  wallpaperBrowseFiles = browseState.files;
  wallpaperBrowseContext = browseState.context;

  renderWallpaperGrid(allGrid, wallpaperBrowseFiles);
  updateWallpaperHeroContent();
  renderWallpaperContextLink();
  setupCategoryFilters();
  setupSearchInput();
  setupCustomSortDropdown();
  setupRandomButton();
  setupStickyControlsObserver();
  sortCardsInGrid(allGrid);
  applyInitialUrlState();
};

const init = () => {
  favorites = loadFavorites();

  const page = document.body.dataset.page;
  if (page === "home") {
    const featuredGrid = document.getElementById("featuredGrid");
    if (featuredGrid) {
      renderWallpaperGrid(featuredGrid, featuredWallpaperFiles);
    }
    setupHeroPreviewStack();
  }

  if (page === "wallpapers") {
    setupWallpapersPage();
  }

  if (page === "collections") {
    renderCollectionsPage();
  }

  if (page === "setup") {
    setupSetupPage();
  }

  if (page === "detail") {
    setupDetailPage();
  }

  setupGlobalInteractions();
  setupKeyboardShortcuts();
  setupNavState();
  setupStickyNav();
  setupRevealAnimations();
  setYear();
};

document.addEventListener("DOMContentLoaded", init);
