import { convertBuffer } from '../src/sendDeviceCommand';
import * as assert from 'assert';

describe('convertBuffer', function() {
  it('should be deterministic', function() {
    // const data = [1, 10, 5, 10, 7, 8, 206, 14, 16, 4, 24, 20, 10, 6, 8, 18, 16, 6, 24, 1, 10, 6, 8, 23, 16, 6, 24, 2, 10, 6, 8, 16, 16, 6, 24, 3, 10, 6, 8, 25, 16, 6, 24, 4, 10, 6, 8, 8, 16, 3, 24, 5, 10, 6, 8, 8, 16, 3, 24, 6, 10, 6, 8, 5, 16, 2, 24, 7]
    // const expected = [0, 5, 10, 7, 8, 206, 14, 16, 4, 24, 0, 10, 6, 8, 18, 16, 6, 24, 1, 10, 6, 8, 23, 16, 6, 24, 2, 10, 6, 8, 0, 16, 6, 24, 3, 10, 6, 8, 25, 16, 6, 24, 4, 10, 6, 8, 0, 16, 3, 24, 5, 10, 6, 8, 0, 16, 3, 24, 6, 10, 6, 8, 0, 16, 2, 24, 7]
    // assert.deepStrictEqual(convertBuffer(data), expected);
  });
})