import { ShapeFlages } from '../shared/ShapeFlags'

export function createVNode(type, props?, childern?) {
  const vnode = {
    type,
    props,
    shapeFlag: getShapeFlag(type),
    childern,
    el: null,
  }
  // children
  if (typeof childern === 'string') {
    vnode.shapeFlag |= ShapeFlages.TEXT_CHILDREN
  } else if (Array.isArray(childern)) {
    vnode.shapeFlag |= ShapeFlages.ARRAY_CHILDREN
  }
  return vnode
}
function getShapeFlag(type: any) {
  return typeof type === 'string'
    ? ShapeFlages.ELEMENT
    : ShapeFlages.STATEFUAL_COMPONENT
}
