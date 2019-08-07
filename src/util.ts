export function secureRandom(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0]/2**32;
}

export function choice<T>(a: T[]): T {
  return a[Math.floor(secureRandom() * a.length)];
}

/**
 * Shuffles array in place. ES6 version
 * @param {any[]} a items An array containing the items.
 */
export function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(secureRandom() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randRange(n: number) {
  return Math.floor(secureRandom() * n);
}

export function clone<T>(a: T): T {
  return JSON.parse(JSON.stringify(a));
}