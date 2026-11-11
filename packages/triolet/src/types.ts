import type { IconModel } from '../../core/src/model.ts';

/** One icon as shipped: its model and the CSS of its gesture. */
export interface IconData {
  model: IconModel;
  css: string;
}
