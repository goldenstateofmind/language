export function getWindowLocationHashParam(name) {
  const {hash} = window.location
  if (hash) {
    const params = new URLSearchParams(hash.slice(1))
    return params?.get(name)
  }
}
