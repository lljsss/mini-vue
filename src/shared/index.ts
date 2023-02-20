export let extend = Object.assign
export const isObject = function (obj) {
  return obj !== null && typeof obj === 'object'
}
export const hasChange = function (val, newValue) {
  return !Object.is(val, newValue)
}
