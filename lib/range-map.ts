export default function rangeMap(n: number, fn: (i: number) => []) {
  const arr = [];
  while (n > arr.length) {
    arr.push(fn(arr.length));
  }
  return arr;
}
