export function deepCopy(obj) {
  const _map = new WeakMap()
  function clone(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (_map.has(obj)) return obj
      _map.set(obj, obj)
      const ret = Array.isArray(obj) ? [] : {}
      for (const key in obj) {
        ret[key] = typeof obj[key] === 'object' ? clone(obj[key]) : obj[key]
      }
      return ret
    }
    return obj
  }
  return clone(obj)
}
