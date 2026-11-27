import assert from 'node:assert/strict';

import test from 'node:test';
import { visibleFloor, polygonArea, rooms } from './app.mjs';
test('empty rooms have full visibility and a closed partition divides the room', () => {
  assert.ok(Math.abs(polygonArea(visibleFloor(3, 4, [])) - 100) < 1e-6);
  assert.ok(Math.abs(polygonArea(visibleFloor(3, 4, [[5, 0, 5, 10]])) - 50) < 1e-6);
});
test('moving between viewpoints changes visibility and wall positions are rejected', () => {
  const samples = [polygonArea(visibleFloor(3, 2, rooms.gallery)), polygonArea(visibleFloor(8, 8, rooms.gallery))];
  assert.ok(samples.every(area => area > 0 && area < 100));
  assert.notEqual(...samples);
  assert.throws(() => visibleFloor(5, 4, [[5, 0, 5, 10]]), /partition/);
});
