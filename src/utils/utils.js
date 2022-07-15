export function getWindowLocationHashParam(name) {
  const {hash} = window.location
  if (hash) {
    const params = new URLSearchParams(hash.slice(1))
    return params?.get(name)
  }
}

export const countItemsWhere = (obj, prop, val) => {
  const counts = Object.values(obj).filter((x) => x[prop] === val)
  return counts.length
}
