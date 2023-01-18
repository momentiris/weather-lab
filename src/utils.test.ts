import { describe, expect, it } from 'vitest';

import { getAveragePrimitiveArray, getMedianPrimitiveArray } from './utils';

describe('utils', () => {
  it('getMedianPrimitiveArray', () => {
    const input = [1, 2, 3];
    const result = getMedianPrimitiveArray(input);
    expect(result).toEqual(2);
  });

  it('getAveragePrimitiveArray', () => {
    const input = [1, 2, 3];
    const result = getAveragePrimitiveArray(input);
    expect(result).toEqual(2);
  });
});
