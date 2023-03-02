import { ShapeFlages } from '../shared/ShapeFlags'

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    shapeFlag: getShapeFlag(type),
    children,
    el: null,
  }
  // children
  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlages.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlages.ARRAY_CHILDREN
  }
  if (vnode.shapeFlag & ShapeFlages.STATEFUAL_COMPONENT) {
    if (typeof children === 'object') {
      vnode.shapeFlag |= ShapeFlages.SLOT_CHILDREN
    }
  }
  return vnode
}
function getShapeFlag(type: any) {
  return typeof type === 'string'
    ? ShapeFlages.ELEMENT
    : ShapeFlages.STATEFUAL_COMPONENT
}
