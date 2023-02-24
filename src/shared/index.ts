export let extend = Object.assign
export const isObject = function (obj) {
  return obj !== null && typeof obj === 'object'
}
export const hasChange = function (val, newValue) {
  return !Object.is(val, newValue)
}
export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}
