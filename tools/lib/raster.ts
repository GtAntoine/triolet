/** Rasterises SVG markup with resvg (no browser): straight RGBA pixels. */
import { Resvg } from '@resvg/resvg-js';

export interface Raster {
  width: number;
  height: number;
  /** RGBA, 8 bits per channel, not premultiplied. */
  pixels: Uint8Array;
}

function render(svg: string, size: number, background?: string) {
  // Icons hold no text: without the scan of system fonts the comparison of five icons takes 0.3 s, not 8.
  return new Resvg(svg, { fitTo: { mode: 'width', value: size }, font: { loadSystemFonts: false }, ...(background ? { background } : {}) }).render();
}

export function rasterize(svg: string, size: number, background?: string): Raster {
  const image = render(svg, size, background);
  return { width: image.width, height: image.height, pixels: new Uint8Array(image.pixels) };
}

export function png(svg: string, size: number, background?: string): Buffer {
  return render(svg, size, background).asPng();
}

export interface Difference {
  /** Pixels whose colour differs at all. */
  differing: number;
  /** Largest gap on one channel, 0 to 255. */
  worst: number;
  total: number;
}

export function compare(a: Raster, b: Raster): Difference {
  if (a.width !== b.width || a.height !== b.height) throw new Error('Rasters differ in size');
  let differing = 0;
  let worst = 0;
  for (let i = 0; i < a.pixels.length; i += 4) {
    let gap = 0;
    for (let c = 0; c < 4; c++) gap = Math.max(gap, Math.abs(a.pixels[i + c]! - b.pixels[i + c]!));
    if (gap > 0) differing++;
    if (gap > worst) worst = gap;
  }
  return { differing, worst, total: a.pixels.length / 4 };
}
