export const createTheme = (theme) => {
  const { palette, ...restTheme } = theme;
  return {
    palette: {
      ...calculKeys(calculateVariants(theme.palette.primary), "primary"),
      ...calculKeys(calculateVariants(theme.palette.grey), "grey"),
      primary: "#5c7d0e",
      dark: "#1d2b3a",
      dark800: "#3b4a5a",
      secondary: "white",
      darkBlue: "#0f1e2e",
      light: "#f6f8f3",
      grey: "5a6b7b",
      backdrop: "rgba(0, 0, 0, 0.5)",
      borderLight: "#dde3e9",
      border: "#7d8b99",
      borderFocus: "#5c7d0e",
      ...palette,
    },
    radius: "8px",
    ...restTheme,
  };
};

const calculKeys = (palette, key) => {
  const finalPalette = {};
  Object.entries(palette).map(([k, v]) => {
    finalPalette[`${key}${k}`] = v;
  });

  return finalPalette;
};

// --- Génération de palette en OKLCH -----------------------------------------
// OKLCH est un espace perceptuel : à luminosité (L) égale, deux teintes
// paraissent aussi claires l'une que l'autre, ce qui n'est pas le cas en HSL
// (un jaune et un bleu à L=50 % n'ont ni la même clarté ni le même contraste).
// On garde donc la teinte (H) de la couleur donnée et on fait varier L et C.

// Luminosité perceptuelle de chaque palier. Le 700 (L≈0.52) donne ≥ 4.5:1 avec
// --- Génération de palette ---------------------------------------------------
// Chaque palier est défini par un ratio de contraste WCAG avec le blanc, pas par
// une luminosité choisie à la main. La teinte et la chroma de la couleur donnée
// sont conservées (principe des palettes tonales de Material 3) : seule la
// luminosité est cherchée pour atteindre le ratio visé. Le contraste d'un palier
// est donc identique pour toutes les teintes.
//
// Ratios, du plus clair au plus sombre :
//  - 500 → 3:1   minimum WCAG 1.4.11 (bordures, icônes, composants d'interface)
//  - 600 → 4.5:1 WCAG AA texte normal (boutons, liens sur fond blanc)
//  - 700 → 7:1   WCAG AAA texte normal
//  - 100-400 : progression géométrique de 1:1 (blanc) à 3:1, des fonds très
//    légers aux décors
//  - 800-900 : on poursuit la progression 600 → 700 (×1.55) vers le texte sombre
const CONTRAST = {
  100: 3 ** (1 / 5),
  200: 3 ** (2 / 5),
  300: 3 ** (3 / 5),
  400: 3 ** (4 / 5),
  500: 3,
  600: 4.5,
  700: 7,
  800: 7 * (7 / 4.5),
  900: 7 * (7 / 4.5) ** 2,
};

const srgbToLinear = (v) =>
  v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
const linearToSrgb = (v) =>
  v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;

const hexToOklch = (hex) => {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) =>
    srgbToLinear(parseInt(h.slice(i, i + 2), 16) / 255),
  );

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  return [L, Math.hypot(a, bb), (Math.atan2(bb, a) * 180) / Math.PI];
};

// Composantes sRGB linéaires, éventuellement hors de [0, 1]
const oklchToLinear = (L, C, H) => {
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);

  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
};

const inGamut = (rgb) => rgb.every((v) => v >= -0.0001 && v <= 1.0001);

// Réduit la chroma (pas la luminosité) jusqu'à tenir dans le gamut sRGB, pour
// ne pas fausser le contraste visé.
const toGamut = (L, C, H) => {
  if (inGamut(oklchToLinear(L, C, H))) return oklchToLinear(L, C, H);
  let lo = 0;
  let hi = C;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToLinear(L, mid, H))) lo = mid;
    else hi = mid;
  }
  return oklchToLinear(L, lo, H);
};

// Luminance relative WCAG (composantes linéaires déjà arrondies au 8 bits)
const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const contrastWithWhite = (rgb) => 1.05 / (luminance(rgb) + 0.05);

const quantize = (rgb) =>
  rgb.map((v) =>
    srgbToLinear(
      Math.round(Math.min(1, Math.max(0, linearToSrgb(v))) * 255) / 255,
    ),
  );

const toHex = (rgb) =>
  "#" +
  rgb
    .map((v) =>
      Math.round(Math.min(1, Math.max(0, linearToSrgb(v))) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");

// Cherche par dichotomie la luminosité OKLCH qui donne le ratio demandé.
// `chromaAt(L)` donne la chroma à utiliser pour cette luminosité.
const colorForContrast = (target, H, chromaAt) => {
  let lo = 0; // sombre → contraste élevé
  let hi = 1; // clair → contraste faible
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (contrastWithWhite(quantize(toGamut(mid, chromaAt(mid), H))) > target)
      lo = mid;
    else hi = mid;
  }
  return { L: lo, hex: toHex(toGamut(lo, chromaAt(lo), H)) };
};

// Palette 100 → 900 à partir d'une couleur.
// La chroma de la couleur donnée est pleine entre les paliers 500 et 700, puis
// décroît linéairement jusqu'à 0 vers le blanc et vers le noir (qui n'ont pas de
// teinte) : sans cela, les fonds clairs seraient des néons et les paliers
// sombres des couleurs saturées.
export const calculateVariants = (color) => {
  const [, C, H] = hexToOklch(color);

  const L500 = colorForContrast(CONTRAST[500], H, () => C).L;
  const L700 = colorForContrast(CONTRAST[700], H, () => C).L;
  const chromaAt = (L) => {
    if (L > L500) return (C * (1 - L)) / (1 - L500);
    if (L < L700) return (C * L) / L700;
    return C;
  };

  return Object.fromEntries(
    Object.entries(CONTRAST).map(([step, ratio]) => [
      step,
      colorForContrast(ratio, H, chromaAt).hex,
    ]),
  );
};
