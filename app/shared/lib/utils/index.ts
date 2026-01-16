export function createMapGetter<T extends string, V>(
  map: Record<T, V>,
  fallbackKey: T,
) {
  return (key: string | null | undefined): V =>
    key && Object.hasOwn(map, key) ? map[key as T] : map[fallbackKey];
}
